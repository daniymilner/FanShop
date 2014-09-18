using dataAccess.Constants;
using dataAccess.Model;
using dataAccess.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Web.Http;

namespace engine.API
{
    public class UserController : ApiController
    {
        private UserRepository _users = new UserRepository();
        
        public void Registration(Users user)
        {
            //var salt = System.Text.Encoding.UTF8.GetBytes(Constants.salt);
            //var password = System.Text.Encoding.UTF8.GetBytes(user.Password);
            //var hmacMD5 = new HMACMD5(salt);
            //var saltedHash = hmacMD5.ComputeHash(password);
            int a = 0;
            //user.Password = saltedHash;
            //user.Id = Guid.NewGuid();
            //user.CreateDate = DateTime.Now;
            //_users.CreateUser(user);
        }
    }
}