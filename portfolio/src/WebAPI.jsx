import React from 'react';
import Highlight from 'react-highlight';


class WebAPI extends React.Component {

    render() {

        return (
            <Highlight className="cs">
                {
                    `
                    using StrokeWars.Models.Domain;
                    using StrokeWars.Models.Requests;
                    using StrokeWars.Models.Responses;
                    using StrokeWars.Services;
                    using StrokeWars.Services.Security;
                    using System;
                    using System.Collections.Generic;
                    using System.Linq;
                    using System.Net;
                    using System.Net.Http;
                    using System.Web.Http;
                    
                    namespace StrokeWars.Web.Controllers
                    {
                        [Authorize]
                        public class LMSDocResponseController : ApiController
                        {
                            readonly ILMSDocResponseService lmsService;
                            
                            public LMSDocResponseController(ILMSDocResponseService lmsService)
                            {
                                this.lmsService = lmsService;
                            }
                    
                            [HttpGet, Route("api/lms-doc-response")]
                            public HttpResponseMessage GetAll()
                            {
                                List<LMSDocResponse> lmsResponses = lmsService.GetAll();
                                ItemsResponse<LMSDocResponse> response = new ItemsResponse<LMSDocResponse>();
                                response.Items = lmsResponses;
                                return Request.CreateResponse(HttpStatusCode.OK, response);
                            }
                    
                            [HttpGet, Route("api/lms-doc-response/{id}")]
                            public HttpResponseMessage GetById(int id)
                            {
                                LMSDocResponse lmsResponse = lmsService.GetById(id);
                                ItemResponse<LMSDocResponse> response = new ItemResponse<LMSDocResponse>();
                                response.Item = lmsResponse;
                                return Request.CreateResponse(HttpStatusCode.OK, response);
                            }
                    
                            [HttpGet, Route("api/lms-doc-response/file/{docId}")]
                            public HttpResponseMessage GetByDocId(int docId)
                            {
                                List<CompletedHomework> assignments = lmsService.GetByDocId(docId);
                                ItemsResponse<CompletedHomework> response = new ItemsResponse<CompletedHomework>();
                                response.Items = assignments;
                                return Request.CreateResponse(HttpStatusCode.OK, response);
                            }
                    
                            [HttpPost, Route("api/lms-doc-response")]
                            public HttpResponseMessage Create(LMSDocResponseRequest req)
                            {
                                if (!ModelState.IsValid)
                                {
                                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                                }
                                int userId = User.Identity.GetId().Value;
                                req.UserId = userId; 
                                int newId = lmsService.Create(req);
                                ItemResponse<int> response = new ItemResponse<int>();
                                response.Item = newId;
                    
                                return Request.CreateResponse(HttpStatusCode.Created, response);
                            }
                    
                            [HttpPut, Route("api/lms-doc-response/{id}")]
                            public HttpResponseMessage Update(LMSDocResponseUpdateRequest req)
                            { 
                                if (!ModelState.IsValid)
                                {
                                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                                }
                                req.UserId = User.Identity.GetId().Value;
                                lmsService.Update(req);
                                SuccessResponse response = new SuccessResponse();
                    
                                return Request.CreateResponse(HttpStatusCode.OK, response);
                            }
                        }
                    }
                    `
                }
            </Highlight>
        )
    }
}

export default WebAPI;