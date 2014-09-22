﻿using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace engine
{
    public class DefaultController : ApiController
    {
        public HttpResponseMessage SuccessResult()
        {
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        public HttpResponseMessage SuccessResult(object result)
        {
            var message = new HttpResponseMessage(HttpStatusCode.OK);
            if (result is string)
            {
                message.Content = new StringContent(Convert.ToString(result));
            }
            else
            {
                message.Content = new StringContent(new JavaScriptSerializer().Serialize(result));
            }
            return message;
        }

        public HttpResponseMessage ErrorResult()
        {
            return new HttpResponseMessage(HttpStatusCode.PreconditionFailed);
        }

        public HttpResponseMessage ErrorResult(string result)
        {
            return new HttpResponseMessage(HttpStatusCode.PreconditionFailed)
            {
                Content = new StringContent(result)
            };
        }
    }
}