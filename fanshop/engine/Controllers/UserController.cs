using System.Linq;
using dataAccess.Constants;
using dataAccess.Helpers;
using dataAccess.Model;
using dataAccess.Repository;
using System;
using System.Net.Http;
using engine.Components;
using engine.Models;
using System.Web.Http;

namespace engine.Controllers
{
    public class UserController : DefaultController
    {
        private readonly UserRepository _users = new UserRepository();
        private readonly FeedbackRepository _feedback = new FeedbackRepository();
        private readonly AuthenticationProvider _authenticationProvider = new AuthenticationProvider();

        [HttpPost]
        [ActionName("Registration")]
        public HttpResponseMessage Registration(Users user)
        {
            if (_users.GetFirstOrDefault(z=>z.Login == user.Login) != null) return ErrorResult(Constants.Login);
            if (_users.GetFirstOrDefault(z=>z.Email == user.Email) != null) return ErrorResult(Constants.Email);

            var passwordHashMd5 = HashHelper.ComputeHash(user.Password, "MD5", Converter.GetBytes(Constants.Salt));

            user.Password = passwordHashMd5;
            user.Id = Guid.NewGuid();
            user.CreateDate = DateTime.Now;
            _users.CreateItem(user);

            SetCurrentUser(user);
            _authenticationProvider.SignIn(user.Login, true);

            return SuccessResult(user);


            //Help

            //string passwordHashSha1 = HashHelper.ComputeHash(user.Password, "SHA1", null);
            //string passwordHashSha256 = HashHelper.ComputeHash(user.Password, "SHA256", null);
            //string passwordHashSha384 = HashHelper.ComputeHash(user.Password, "SHA384", null);
            //string passwordHashSha512 = HashHelper.ComputeHash(user.Password, "SHA512", null);
        }

        [HttpGet]
        [ActionName("GetUserInfo")]
        public HttpResponseMessage GetUserInfo(string login)
        {
            var sessionUser = GetCurrentUser();
            if (sessionUser != null) return SuccessResult(sessionUser);
            var user = _users.GetFirstOrDefault(z => z.Login == login);
            SetCurrentUser(user);
            return user == null ? ErrorResult(Constants.Login) : SuccessResult(user);
        }

        [HttpPost]
        [ActionName("SignIn")]
        public HttpResponseMessage SignIn(UserData userData)
        {
            if (userData == null || String.IsNullOrEmpty(userData.Login) || String.IsNullOrEmpty(userData.Password))
                return ErrorResult();

            var user = _users.GetFirstOrDefault(z => z.Login == userData.Login);
            if (user == null)
                return ErrorResult(Constants.Login);

            
            if (!HashHelper.VerifyHash(userData.Password, "MD5", user.Password))
                return ErrorResult(Constants.Password);

            SetCurrentUser(user);
            _authenticationProvider.SignIn(user.Login, true);
            return SuccessResult(user);
        }

        [HttpPost]
        [ActionName("SignOut")]
        public HttpResponseMessage SignOut()
        {
            _authenticationProvider.SignOut();
            CleatCurrentUser();
            return SuccessResult();
        }

        [HttpGet]
        [ActionName("GetAllUsers")]
        public HttpResponseMessage GetAllUsers()
        {
            return SuccessResult(_users.All().OrderByDescending(z=>z.CreateDate));
        }

        [HttpPost]
        [ActionName("GetUserById")]
        public HttpResponseMessage GetUserById(string id)
        {
            Guid identifier;
            if (!Guid.TryParse(id, out identifier)) return ErrorResult();
            var user = _users.GetFirstOrDefault(z => z.Id == identifier);
            return user != null ? SuccessResult(user) : ErrorResult("no user");
        }

        [HttpPost]
        [ActionName("UpdateUser")]
        public HttpResponseMessage UpdateUser(Users user)
        {
            _users.UpdateUser(user);
            return SuccessResult();
        }

        [HttpPost]
        [ActionName("DeleteUser")]
        public HttpResponseMessage DeleteUser(string id)
        {
            Guid identifier;
            if (Guid.TryParse(id, out identifier))
            {
                _users.DeleteItem(z=>z.Id == identifier);
            }
            return SuccessResult();
        }

        [HttpGet]
        [ActionName("Home")]
        public HttpResponseMessage Home()
        {
            return SuccessResult();
        }
    }
}