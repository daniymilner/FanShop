using dataAccess.Constants;
using dataAccess.Helpers;
using dataAccess.Model;
using dataAccess.Repository;
using System;
using System.Net.Http;
using engine.Models;

namespace engine.Controllers
{
    public class UserController : DefaultController
    {
        private readonly UserRepository _users = new UserRepository();
        
        public HttpResponseMessage Registration(Users user)
        {
            if (_users.GetUserByLogin(user.Login) != null) return ErrorResult(Constants.Login);
            if (_users.GetUserByEmail(user.Email) != null) return ErrorResult(Constants.Email);

            var passwordHashMd5 = HashHelper.ComputeHash(user.Password, "MD5", Converter.GetBytes(Constants.Salt));
            //string verify = HashHelper.VerifyHash(user.Password, "MD5", passwordHashMD5).ToString();

            user.Password = passwordHashMd5;
            user.Id = Guid.NewGuid();
            user.CreateDate = DateTime.Now;
            _users.CreateUser(user);

            return SuccessResult(user);

           
            //Help

            //string passwordHashSha1 = HashHelper.ComputeHash(user.Password, "SHA1", null);
            //string passwordHashSha256 = HashHelper.ComputeHash(user.Password, "SHA256", null);
            //string passwordHashSha384 = HashHelper.ComputeHash(user.Password, "SHA384", null);
            //string passwordHashSha512 = HashHelper.ComputeHash(user.Password, "SHA512", null);
        }

        public HttpResponseMessage GetUserInfo(string login)
        {
            var user = _users.GetUserByLogin(login);
            return user == null ? ErrorResult(Constants.Login) : SuccessResult(user);
        }

        public HttpResponseMessage SignIn(UserData userData)
        {
            if (userData == null || String.IsNullOrEmpty(userData.Login) || String.IsNullOrEmpty(userData.Password))
                return ErrorResult();

            var user = _users.GetUserByLogin(userData.Login);
            if (user == null)
                return ErrorResult(Constants.Login);

            if (!HashHelper.VerifyHash(userData.Password, "MD5", user.Password))
                return ErrorResult(Constants.Password);

            return SuccessResult(user);
        }
    }
}