import React from 'react';
import Highlight from 'react-highlight';


class Services extends React.Component {

    render() {

        return (
            <Highlight className="cs">
                {
                    `
                    using Newtonsoft.Json;
                    using Newtonsoft.Json.Linq;
                    using StrokeWars.Data;
                    using StrokeWars.Data.Providers;
                    using StrokeWars.Models.Domain;
                    using StrokeWars.Models.Requests;
                    using System;
                    using System.Collections.Generic;
                    using System.Data;
                    using System.Data.SqlClient;
                    using System.Linq;
                    using System.Text;
                    using System.Threading.Tasks;
                    using System.Web;
                    using System.Web.Security;
                    
                    namespace StrokeWars.Services
                    {
                        public class LMSDocResponseService : ILMSDocResponseService
                        {
                            readonly IDataProvider dataProvider;
                    
                            public LMSDocResponseService(IDataProvider dataProvider)
                            {
                                this.dataProvider = dataProvider;
                            }
                    
                            public List<LMSDocResponse> GetAll()
                            {
                                List<LMSDocResponse> lmsDocs = null;
                    
                                dataProvider.ExecuteCmd(
                                    "LMSDocumentResponses_getall",
                                    null,
                                    delegate (IDataReader reader, short resultIndex)
                                    {
                    
                                        LMSDocResponse lmsDoc = new LMSDocResponse();
                                        lmsDoc.Id = reader.GetInt32(0);
                                        lmsDoc.UserId = reader.GetInt32(1);
                                        lmsDoc.DocId = reader.GetInt32(2);
                                        lmsDoc.DateCreated = reader.GetDateTime(3);
                                        lmsDoc.DateModified = reader.GetDateTime(4);
                                        lmsDoc.Feedback = reader.GetSafeString(5);
                                        var json = reader.GetSafeString(6);
                                        lmsDoc.DatePublished = reader.GetSafeDateTime(7);
                                        lmsDoc.TimeSpentInSec = reader.GetFloat(8);
                    
                                        lmsDoc.Content =
                                            JArray.Parse(json)
                                            .Select(item => item.Value<string>("contents"))
                                            .ToArray();
                    
                                        lmsDocs.Add(lmsDoc);
                                        
                                    });
                                return lmsDocs;
                            }
                    
                            public List<CompletedHomework> GetByDocId(int docId)
                            {
                                List<CompletedHomework> assignments = null;
                    
                                dataProvider.ExecuteCmd(
                                    "LMSDocumentResponses_getbydocid",
                                    delegate (SqlParameterCollection parameter)
                                    {
                                        parameter.AddWithValue("@doc_id", docId);
                                    },
                                    delegate (IDataReader reader, short resultIndex)
                                    {
                                        CompletedHomework assignment = new CompletedHomework();
                                        assignment.Id = reader.GetInt32(0);
                                        assignment.UserId = reader.GetInt32(1);
                                        assignment.DocId = reader.GetInt32(2);
                                        assignment.Contents = reader.GetString(3);
                                        assignment.Feedback = reader.GetString(4);
                                        assignment.TimeSpentInSec = reader.GetDouble(5);
                                        assignment.DateCompleted = reader.GetSafeDateTime(6);
                                        assignment.FirstName = reader.GetString(7);
                                        assignment.LastName = reader.GetString(8);
                                        assignment.Email = reader.GetString(9);
                                        if(assignments == null)
                                        {
                                            assignments = new List<CompletedHomework>();
                                        }
                                        assignments.Add(assignment);
                                    }
                                );
                                return assignments;
                            }
                    
                            public LMSDocResponse GetById(int id)
                            {
                                LMSDocResponse lmsDoc = null;
                                dataProvider.ExecuteCmd(
                                    "LmsDocumentResponses_getbyid",
                                    delegate (SqlParameterCollection parameter)
                                    {
                                        parameter.AddWithValue("@id", id);
                                    },
                                    delegate (IDataReader reader, short resultIndex)
                                    {
                                        lmsDoc = new LMSDocResponse();
                                        lmsDoc.Id = reader.GetInt32(0);
                                        lmsDoc.UserId = reader.GetInt32(1);
                                        lmsDoc.DocId = reader.GetInt32(2);
                                        lmsDoc.DateCreated = reader.GetDateTime(3);
                                        lmsDoc.DateModified = reader.GetDateTime(4);
                                        lmsDoc.Feedback = reader.GetSafeString(5);
                                        var json = reader.GetSafeString(6);
                                        lmsDoc.DatePublished = reader.GetDateTime(7);
                                        lmsDoc.TimeSpentInSec = reader.GetFloat(8);
                    
                                        lmsDoc.Content =
                                        JArray.Parse(json)
                                        .Select(item => item.Value<string>("content"))
                                        .ToArray();
                    
                                    });
                                return lmsDoc;
                            }
                    
                            public int Create(LMSDocResponseRequest req)
                            {
                                int id = 0;
                                dataProvider.ExecuteNonQuery(
                                    "LmsDocumentResponses_insert",
                                    delegate (SqlParameterCollection parameter)
                                    {
                                        parameter.AddWithValue("@doc_id", req.DocId);
                                        parameter.AddWithValue("@user_id", req.UserId);
                                        parameter.AddWithValue("@time_spent", req.TimeSpentInSec);
                                        parameter.AddWithValue("@feedback", JsonConvert.SerializeObject(req.FeedBack));
                                        parameter.AddWithValue("@date_submitted", req.DateSubmitted ?? (object)DBNull.Value);
                                        parameter.AddWithValue("@content", JsonConvert.SerializeObject(req.Content));
                                        SqlParameter newId = new SqlParameter("@id", SqlDbType.Int);
                                        newId.Direction = ParameterDirection.Output;
                                        parameter.Add(newId);
                                    }, returnParameters: delegate (SqlParameterCollection param)
                                    {
                                        id = (int)param["@id"].Value;
                                    }
                                    );
                                return id;
                            }
                    
                            public void Update(LMSDocResponseUpdateRequest req)
                            {
                                dataProvider.ExecuteNonQuery(
                                    "LmsDocumentResponses_update",
                                    delegate (SqlParameterCollection parameter)
                                    {
                                        parameter.AddWithValue("@id", req.Id);
                                        parameter.AddWithValue("@doc_id", req.DocId);
                                        parameter.AddWithValue("@user_id", req.UserId);
                                        parameter.AddWithValue("@time_spent", req.TimeSpentInSec);
                                        parameter.AddWithValue("@feedback", JsonConvert.SerializeObject(req.FeedBack));
                                        parameter.AddWithValue("@content", JsonConvert.SerializeObject(req.Content));
                                        parameter.AddWithValue("@date_submitted", req.DateSubmitted ?? (object)DBNull.Value);
                                    });
                            }
                        }
                    }
                    
                    `
                }
            </Highlight>
        )
    }
}

export default Services;