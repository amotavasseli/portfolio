import React from 'react';
import Highlight from 'react-highlight';


class Hub extends React.Component {

    render() {

        return (
            <Highlight>
                {
                    `
                    using Microsoft.AspNet.SignalR;
                    using System;
                    using System.Collections.Generic;
                    using System.Linq;
                    using System.Text;
                    using System.Threading.Tasks;
                    using StrokeWars.Web;
                    using Microsoft.AspNet.SignalR.Hubs;
                    using System.Diagnostics;
                    using System.Threading;
                    using StrokeWars.Services.Security;
                    using StrokeWars.Services;
                    using StrokeWars.Models.Domain;
                    using System.Threading.Tasks.Dataflow;
                    using StrokeWars.Services.Interfaces;
                    using Newtonsoft.Json.Linq;
                    using System.Net;
                    using System.Web.Script.Serialization;
                    
                    namespace StrokeWars.Web
                    {
                        public class MatchHub : Hub
                        {
                            readonly IMatchInvitationsService matchService;
                            readonly TimeSpan ROUND_TIMEOUT = TimeSpan.FromSeconds(20);
                            readonly Func<int?[], BuiltInDictionaryFeed> dictionaryFeed;
                            readonly IMatchHubCalculation matchHubCalculation;
                            readonly Func<int, CustomDictionaryFeed> customDictionaryFeed;
                            static ICaptureMatchHubData captureMatchHubData;
                            readonly Func<IMatchHubDataCollector> matchHubDataCollector;
                    
                            public MatchHub(IMatchInvitationsService matchService, Func<int?[], BuiltInDictionaryFeed> dictionaryFeed, IMatchHubCalculation matchHubCalculation, Func<int, CustomDictionaryFeed> customDictionaryFeed, Func<IMatchHubDataCollector> matchHubDataCollector, ICaptureMatchHubData captureMatchHubData)
                            {
                                this.matchService = matchService;
                                this.dictionaryFeed = dictionaryFeed;
                                this.matchHubCalculation = matchHubCalculation;
                                this.customDictionaryFeed = customDictionaryFeed;
                                this.matchHubDataCollector = matchHubDataCollector;
                                lock (syncLock)
                                {
                                    if (MatchHub.captureMatchHubData == null)
                                    {
                                        MatchHub.captureMatchHubData = captureMatchHubData;
                                        Task.Run(async () =>
                                        {
                                            while (true)
                                            {
                                                await Task.Delay(10000);
                                                GetActiveMatches();
                                                int users = 0;
                                                int matchNum = 0;
                                                foreach (var pairs in matchesByMatchId)
                                                {
                                                    if (pairs.Value.IsStarted)
                                                    {
                                                        matchNum++;
                                                        foreach (var newPairs in pairs.Value.ConnectionIdsByUser)
                                                        {
                                                            if (pairs.Value.ConnectionIdsByUser[newPairs.Key] != null)
                                                                users++;
                                                        }
                                                    }
                                                    matchData.UsersPlaying = users;
                                                    matchData.ActiveMatches = matchNum;
                                                }
                                                captureMatchHubData.SendData(matchData);
                                            }
                                        });
                                    }
                                }
                            }
                    
                    
                            static readonly object syncLock = new object();
                            static readonly Dictionary<Guid, object> matchDataByMatchId = new Dictionary<Guid, object>();
                            //all read and read/write access to these (including their contained StrokeWarMatch)
                            //instances must be covered by lock(syncLock)
                            static readonly Dictionary<Guid, StrokeWarMatch> matchesByMatchId = new Dictionary<Guid, StrokeWarMatch>();
                    
                            static readonly Dictionary<string, StrokeWarMatch> matchesByConnection = new Dictionary<string, StrokeWarMatch>();
                    
                            static MatchData matchData = new MatchData();
                    
                            public void GetActiveMatches()
                            {
                                lock (syncLock)
                                {
                                    string conId = Context.ConnectionId;
                                    List<int> users = new List<int>();
                                    int matchNum = 0;
                                    foreach (var pairs in matchesByMatchId)
                                    {
                                        if (pairs.Value.IsStarted)
                                        {
                                            matchNum++;
                                            Guid matchId = pairs.Value.MatchId;
                                            foreach (var newPairs in pairs.Value.ConnectionIdsByUser)
                                            {
                                                if (pairs.Value.ConnectionIdsByUser[newPairs.Key] != null)
                                                    users.Add(newPairs.Key);
                                            }
                                            string match = new JavaScriptSerializer().Serialize(new { id = matchId, users = users, difflevels = pairs.Value.DiffLevels, customVocabId = pairs.Value.CustomVocabId });
                                            Clients.Client(conId).activeMatches(match);
                                            users = new List<int>();
                                        }
                                        matchData.UsersPlaying = users.Count;
                                        matchData.ActiveMatches = matchNum;
                                    }
                                }
                            }
                    
                            public void JoinMatch(Guid matchGuidId)
                            {
                                string connectionId = Context.ConnectionId;
                                int userId = Context.User.Identity.GetId().Value;
                                MatchInvitation matchInvite = matchService.GetByGuid(matchGuidId);
                                ////////// Only if opponent is USER ID#1, Game is OPEN MATCH. \\\\\\\\\\\\\\\
                                lock (syncLock)
                                {
                                    if (matchInvite.Opponents[0] == 1)
                                    {
                                        if (!matchesByMatchId.ContainsKey(matchGuidId))
                                        {
                                            StrokeWarMatch match = new StrokeWarMatch();
                                            match.MatchHubDataCollector = matchHubDataCollector();
                                            matchesByMatchId.Add(matchGuidId, match);
                                            matchesByConnection.Add(connectionId, match);
                                            match.MatchId = matchGuidId;
                                            match.MatchHubDataCollector.SetMatchId(matchGuidId);
                                            match.ConnectionIdsByUser.Add(userId, connectionId);
                                            SendPresence(match, "Open Match");
                                        }
                                        else
                                        {
                                            StrokeWarMatch value;
                                            if (matchesByMatchId.TryGetValue(matchGuidId, out value))
                                            {
                                                if (value.IsStarted)
                                                    Clients.Client(connectionId).inProgress();
                    
                                                string existingConnection;
                                                if (value.ConnectionIdsByUser.TryGetValue(userId, out existingConnection))
                                                {
                                                    if (existingConnection != null)
                                                    {
                                                        matchesByConnection.Remove(existingConnection);
                                                        Clients.Client(existingConnection).timeOut();
                                                    }
                                                }
                                                matchesByConnection.Add(connectionId, value);
                                                value.ConnectionIdsByUser[userId] = connectionId;
                                                SendPresence(value, "Open Match");
                                            }
                                        }
                                    }
                                    /////////////////// NORMAL CODE FOR INVITE ONLY GAME \\\\\\\\\\\\\\\\\\\\\\\
                                    else if (!matchesByMatchId.ContainsKey(matchGuidId))
                                    {
                                        StrokeWarMatch match = new StrokeWarMatch();
                                        match.MatchHubDataCollector = matchHubDataCollector();
                                        matchesByMatchId.Add(matchGuidId, match);
                                        matchesByConnection.Add(connectionId, match);
                                        match.MatchId = matchGuidId;
                                        match.ConnectionIdsByUser.Add(userId, connectionId);
                                        if (userId == matchInvite.ChallengerId)
                                        {
                                            for (int i = 0; i < matchInvite.Opponents.Length; i++)
                                            {
                                                if (!match.ConnectionIdsByUser.ContainsKey(matchInvite.Opponents[i]))
                                                    match.ConnectionIdsByUser.Add(matchInvite.Opponents[i], null);
                                            }
                                            SendPresence(match, "Challenger");
                                        }
                                        else
                                        {
                                            match.ConnectionIdsByUser.Add(matchInvite.ChallengerId, null);
                                            for (int i = 0; i < matchInvite.Opponents.Length; i++)
                                            {
                                                if (userId != matchInvite.Opponents[i])
                                                {
                                                    match.ConnectionIdsByUser.Add(matchInvite.Opponents[i], null);
                                                }
                                            }
                                            SendPresence(match, "Opponent");
                                        }
                                        match.MatchHubDataCollector.SetMatchId(matchGuidId);
                                    }
                                    else
                                    {
                                        StrokeWarMatch value;
                                        if (matchesByMatchId.TryGetValue(matchGuidId, out value))
                                        {
                                            if (value.IsStarted)
                                                Clients.Client(connectionId).inProgress();
                    
                                            if (!value.ConnectionIdsByUser.ContainsKey(userId))
                                            {
                                                throw new HubException("You were not invited to this match.");
                                            }
                                            string existingConnection;
                                            if (value.ConnectionIdsByUser.TryGetValue(userId, out existingConnection))
                                            {
                                                if (existingConnection != null)
                                                {
                                                    matchesByConnection.Remove(existingConnection);
                                                    Clients.Client(existingConnection).timeOut();
                                                }
                                            }
                                            matchesByConnection.Add(connectionId, value);
                                            value.ConnectionIdsByUser[userId] = connectionId;
                    
                                            if (matchInvite.ChallengerId != userId)
                                            {
                                                SendPresence(value, "Opponent");
                                            }
                                            else
                                            {
                                                SendPresence(value, "Challenger");
                                            }
                                        } 
                                    }
                                }
                            }
                    
                            public void StartUp(Guid matchGuid)
                            {
                                int counter = 0;
                                MatchInvitation matchInvite = matchService.GetByGuid(matchGuid);
                                var userId = Context.User.Identity.GetId().Value;
                    
                                var inputQueue = new BufferBlock<InputMessage>();
                                StrokeWarMatch match;
                    
                                lock (syncLock)
                                {
                                    if (!matchesByMatchId.TryGetValue(matchGuid, out match))
                                        throw new HubException("Invalid match GUID");
                                    if (match.IsStarted)
                                        return;
                                    match.InputQueue = inputQueue;
                                }
                                int words = 0;
                                int currentWord = 0; 
                                Task.Run(async () =>
                                {
                                    try
                                    {
                                        int players;
                                        IDictionaryFeed feed;
                                        if(matchInvite.CustomVocabId != 0)
                                        {
                                            feed = customDictionaryFeed((int)matchInvite.CustomVocabId);
                                            match.CustomVocabId = matchInvite.CustomVocabId;
                                        }
                                        else
                                        {
                                            feed = dictionaryFeed(matchInvite.DifficultyLevels);
                                            match.DiffLevels = matchInvite.DifficultyLevels;
                                        }
                                        var nextWord = feed.GetNextWord();
                                        if(nextWord == null)
                                        {
                                            lock(syncLock)
                                            Clients.Clients(match.ConnectionIdsByUser.Values.Where(o => o != null).ToArray()).gameError("Vocab List is empty.");
                                        }
                                        WordCheck(nextWord.Word);
                                        TimeSpan newTotalTime = TotalTimeSpan(nextWord);
                                        lock (syncLock)
                                        {
                                            match.MatchHubDataCollector.StartWord(nextWord.Word);
                                            Clients.Clients(match.ConnectionIdsByUser.Values.Where(o => o != null).ToArray()).startWord(nextWord, newTotalTime.TotalMilliseconds);
                                            matchData.WordsSent++;
                                            players = match.ConnectionIdsByUser.Values.Where(o => o != null).ToArray().Length;
                                        }
                                        int completedEntries = 0;
                                        var roundTimeout = DateTime.Now.Add(newTotalTime);
                                        //ADD 6 SECONDS TO TIMER FOR GET READY COUNTDOWN
                                        roundTimeout += TimeSpan.FromSeconds(6);
                                        var connectionList = Clients.Clients(match.ConnectionIdsByUser.Values.Where(o => o != null).ToArray());
                                        // LOCAL Functions (Start) ********************************************************************************************
                                        // This function will be used to generate a new word from the dictionary, 
                                        //process the word through the TotalTimeSpan function, reset the roundTimeOut, and send the new word to the active users.
                                        void NextFeed()
                                        {
                                            nextWord = feed.GetNextWord();
                                            WordCheck(nextWord.Word);
                                            newTotalTime = TotalTimeSpan(nextWord);
                                            completedEntries = 0;
                                            roundTimeout = DateTime.Now.Add(newTotalTime);
                                            //ADD 3 SECONDS TO TIMER FOR GET STOPLIGHT TIME 
                                            roundTimeout += TimeSpan.FromSeconds(3);
                                            lock (syncLock)
                                            {
                                                match.MatchHubDataCollector.StartWord(nextWord.Word);
                                                connectionList.startWord(nextWord, newTotalTime.TotalMilliseconds);
                                                matchData.WordsSent++;
                                            }
                                        }
                                        void WordCheck(string word)
                                        {
                                            lock (syncLock)
                                            {
                                                if (match.PlayedWords.Count > 15)
                                                {
                                                    match.PlayedWords = new List<string>();
                                                }
                                                if (!match.PlayedWords.Contains(word))
                                                {
                                                    match.PlayedWords.Add(word);
                                                    counter = 0;
                                                }
                                                else
                                                {
                                                    nextWord = feed.GetNextWord();
                                                    counter++;
                                                    if (counter > 10)
                                                    {
                                                        match.PlayedWords = new List<string>();
                                                        WordCheck(nextWord.Word);
                                                        counter = 0;
                                                    }
                                                    else
                                                    {
                                                        WordCheck(nextWord.Word);
                                                    }
                                                }
                                            }
                                        }
                                        // This function calculates the total timespan allotted per word determined by the # of strokes. 
                                        TimeSpan TotalTimeSpan(DictionaryWord word)
                                        {
                                            var strokeCount = word.StrokeData
                                            .Select(JObject.Parse)
                                            .Select(item => item.Value<JArray>("strokes"))
                                            .Select(arr => arr.Count)
                                            .Sum();
                    
                                            int milliseconds = 800;
                    
                                            TimeSpan totalTime = TimeSpan.FromMilliseconds(strokeCount * (milliseconds));
                    
                                            Debug.Write(1 + " " + strokeCount + " ");
                                            Debug.Write(2 + " " + totalTime);
                    
                                            return totalTime;
                                        }
                                        // LOCAL Functions (End) ********************************************************************************************
                    
                                        while (true)
                                        {
                                            if (currentWord != words)
                                            {
                                                lock(syncLock)
                                                connectionList = Clients.Clients(match.ConnectionIdsByUser.Values.Where(o => o != null).ToArray());
                                                currentWord++;
                                            }
                                   
                                            InputMessage message = null;
                    
                                            try
                                            {
                                                var currentTime = (roundTimeout) - DateTime.Now; 
                                                if ((currentTime) <= TimeSpan.FromSeconds(0))
                                                    throw new TimeoutException();
                                                message = await inputQueue.ReceiveAsync(currentTime);
                                            }
                                            catch(InvalidOperationException)
                                            {
                                                return;
                                            }
                                            catch(TimeoutException)
                                            {
                                                words++;
                                                if (words >= matchInvite.TotalWords)
                                                {
                                                    System.Threading.Thread.Sleep(100);
                                                    lock (syncLock)
                                                    {
                                                        connectionList.endGame(match.ScoreByUser);
                                                        Debug.WriteLine(match.ScoreByUser);
                                                        words = 1;
                                                        currentWord = 0;
                                                        match.ScoreByUser.Clear();
                                                    }
                                                    break;
                                                }
                                                NextFeed();
                                            }
                                            lock (syncLock)
                                            {
                                                if (message != null)
                                                {
                                                    SendMatchUpdate(match, message);
                                                    if (message.EntryCompleted)
                                                    {
                                                        completedEntries++;
                                                    }
                                                    if (completedEntries == players)
                                                    {
                                                        words++;
                                                        if (words >= matchInvite.TotalWords)
                                                        {
                                                            System.Threading.Thread.Sleep(100);
                                                            connectionList.endGame(match.ScoreByUser);
                                                            words = 1;
                                                            currentWord = 0;
                                                            match.ScoreByUser.Clear();
                                                            break;
                                                        }
                                                        NextFeed();
                                                    }
                                                    
                                                }
                                            }
                                        }
                                    }
                                    finally
                                    {
                                        lock (syncLock)
                                        {
                                            if (match.InputQueue == inputQueue)
                                                match.InputQueue = null;
                                        }
                                    }
                                });
                            }
                    
                            public void StopMatch(Guid matchId)
                            {
                                lock (syncLock)
                                {
                                    StrokeWarMatch match;
                                    if (matchesByMatchId.TryGetValue(matchId, out match))
                                    {
                                        match.InputQueue.Complete();
                                        Clients.Clients(match.ConnectionIdsByUser.Values.Where(o => o != null).ToArray()).endGame();
                                        match.ScoreByUser.Clear();
                                    }
                                }
                            }
                    
                            public override Task OnDisconnected(bool stopCalled)
                            {
                                lock (syncLock)
                                {
                                    string connectionId = Context.ConnectionId;
                                    int userId = Context.User.Identity.GetId().Value;
                                    StrokeWarMatch match;
                                    if (matchesByConnection.TryGetValue(connectionId, out match))
                                    {
                                        matchesByConnection.Remove(connectionId);
                                        match.ConnectionIdsByUser[userId] = null;
                    
                                        if (match.ConnectionIdsByUser.Values.Where(o => o != null).ToArray().Length == 0)
                                        {
                                            matchesByMatchId.Remove(match.MatchId);
                                        }
                                        SendPresence(match, "Disconnected");
                                    }
                                }
                                return base.OnDisconnected(stopCalled);
                            }
                    
                            void SendPresence(StrokeWarMatch match, string status)
                            {
                                int userId = Context.User.Identity.GetId().Value;
                                var userIds =
                                    match.ConnectionIdsByUser
                                    .Where(kv => kv.Value != null)
                                    .Select(kv => kv.Key)
                                    .ToArray();
                                Debug.Assert(Monitor.IsEntered(syncLock));
                                lock (syncLock)
                                Clients.Clients(match.ConnectionIdsByUser.Values.Where(o => o != null).ToArray()).userChange(userIds, status, userId);
                            }
                            void SendMatchUpdate(StrokeWarMatch match, InputMessage message)
                            {
                                lock (syncLock)
                                {
                                    Debug.Assert(Monitor.IsEntered(syncLock));
                                    Clients.Clients(match.ConnectionIdsByUser.Values.Where(o => o != null).ToArray()).matchUpdate(message);
                                }
                            }
                            public void EventUpdate(InputMessage message)
                            {
                                lock (syncLock)
                                {
                                    StrokeWarMatch match;
                                    if (matchesByMatchId.TryGetValue(message.MatchId, out match))
                                    {
                                        if (message.OutOfTime || message.EntryCompleted)
                                        {
                                            matchHubCalculation.CalcWord(message, match);
                                            match.MatchHubDataCollector.RecordWordScore(match.ScoreByUser);
                                            match.MatchHubDataCollector.HandleMessage(message);
                                            match.MatchHubDataCollector.FinishWord();
                                        }
                                        match.InputQueue.SendAsync(message);
                                    }
                                }
                            }
                        }
                    }
                    
                    `
                }
            </Highlight>
        )
    }
}

export default Hub;