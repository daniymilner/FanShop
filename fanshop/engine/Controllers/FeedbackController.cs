using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using dataAccess.Model;
using dataAccess.Repository;
using engine.Models;

namespace engine.Controllers
{
    public class FeedbackController : DefaultController
    {
        private readonly FeedbackRepository _feedbackRepository = new FeedbackRepository();

        [HttpGet]
        [ActionName("GetAllFeedback")]
        public HttpResponseMessage GetAllFeedback()
        {
            return SuccessResult(_feedbackRepository.All().OrderByDescending(z => z.Date).ToList());
        }

        [HttpPost]
        [ActionName("RemoveFeedback")]
        public HttpResponseMessage RemoveFeedback(Feedback feedback)
        {
            if (feedback == null) return ErrorResult();
            _feedbackRepository.DeleteItem(z=>z.Id == feedback.Id);
            return SuccessResult();
        }

        [HttpPost]
        [ActionName("SendFeedback")]
        public HttpResponseMessage SendFeedback(Feedback feedback)
        {
            feedback.Id = Guid.NewGuid();
            feedback.Date = DateTime.Now;
            _feedbackRepository.CreateItem(feedback);

            return SuccessResult();
        }
    }
}