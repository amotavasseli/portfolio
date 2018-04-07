import React from 'react';
import Highlight from 'react-highlight';


class Algorithm extends React.Component {

    render() {

        return (
            <Highlight>
                {
                    `
                    using StrokeWars.Models.Domain;
                    using System;
                    using System.Collections.Generic;
                    using System.Diagnostics;
                    using System.Linq;
                    using System.Web;
                    
                    namespace StrokeWars.Web
                    {
                        public class MatchHubCalculation : IMatchHubCalculation
                        {
                            public void CalcWord(InputMessage message, StrokeWarMatch match)
                            {
                                //** CALCULATE SCORE BASED ON THE WORD **\\
                    
                                double totalPoints;
                                int diffLevel = message.DiffLevel;
                                if(diffLevel == 1)
                                {
                                    totalPoints = 5.0;
                                } else if(diffLevel == 2)
                                {
                                    totalPoints = 6.0; 
                                } else if(diffLevel == 3)
                                {
                                    totalPoints = 7.0;
                                } else if(diffLevel == 4)
                                {
                                    totalPoints = 8.0;
                                } else if(diffLevel == 5)
                                {
                                    totalPoints = 9;
                                } else if(diffLevel == 10)
                                {
                                    totalPoints = 10.0;
                                }
                                else
                                {
                                    totalPoints = 5.0;
                                }
                                totalPoints = (double)message.CompletedStroke / message.TotalStrokes * totalPoints;
                                
                                double timePoints = 0.4 * totalPoints;
                                double mistakePoints = 0.2 * totalPoints;
                                double peekPoints = 0.4 * totalPoints;
                                // Time calculation
                                bool outOfTime = message.OutOfTime;
                    
                                if (outOfTime)
                                {
                                    timePoints = 0.0;
                                }
                                // Peek calculation
                                double singlePeek = 1.0/3.0 * peekPoints; 
                                double fullPeek = 0.5 * peekPoints;
                                double totalMistakes = (message.Mistakes);
                                double totalSinglePeeks = (message.StrokePeeks);
                                double totalFullPeeks = (message.CharPeeks);
                                // single peeks
                                singlePeek = totalSinglePeeks * singlePeek;
                                peekPoints = peekPoints - singlePeek;
                               // full peeks
                                fullPeek = totalFullPeeks * fullPeek;
                                peekPoints = peekPoints - fullPeek;
                    
                                if(peekPoints < 0)
                                {
                                    peekPoints = 0;
                                }
                                //Mistake calculation
                                double mistake = (1.0 / 3.0) * mistakePoints;
                                mistake = totalMistakes * mistake;
                                mistakePoints = mistakePoints - mistake;
                                
                                if(mistakePoints < 0)
                                {
                                    mistakePoints = 0;
                                }
                                totalPoints = peekPoints + mistakePoints + timePoints;
                                Scores scores;           
                                if(!match.ScoreByUser.TryGetValue(message.Id, out scores))
                                {
                                    scores = new Scores();
                                    scores.TotalScore = totalPoints;
                                    scores.TimeScore = timePoints;
                                    scores.PeekScore = peekPoints;
                                    scores.MistakeScore = mistakePoints;
                                    if (!message.OutOfTime)
                                    {
                                        scores.TotalTime = message.WordTime;
                                    }
                                    else
                                    {
                                        scores.TotalTime = message.TotalTime;
                                    }
                    
                                    match.ScoreByUser.Add(message.Id, scores); 
                    
                                } else
                                {
                                    scores.TotalScore += totalPoints;
                                    scores.TimeScore += timePoints;
                                    scores.PeekScore += peekPoints;
                                    scores.MistakeScore += mistakePoints;
                                    if(message.WordTime != null)
                                    {
                                        if (!message.OutOfTime) {
                                            scores.TotalTime += message.WordTime;
                                        }
                                        else
                                        {
                                            scores.TotalTime += message.TotalTime;
                                        }
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

export default Algorithm;