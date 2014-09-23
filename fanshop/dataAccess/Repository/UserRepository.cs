using dataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace dataAccess.Repository
{
    public class UserRepository
    {
        public Users GetUserById(Guid id)
        {
            using (var db = new ShopDataContext())
            {
                return db.Users.FirstOrDefault(z => z.Id == id);
            }
        }

        public Users GetUserByEmail(string email)
        {
            using (var db = new ShopDataContext())
            {
                return db.Users.FirstOrDefault(z => z.Email == email);
            }
        }

        public Users GetUserByLogin(string login)
        {
            using (var db = new ShopDataContext())
            {
                return db.Users.FirstOrDefault(z => z.Login == login);
            }
        }

        public void CreateUser(Users user)
        {
            using (var db = new ShopDataContext())
            {
                db.Users.InsertOnSubmit(user);
                db.SubmitChanges();
            }
        }

        public List<Users> GetAllUsers()
        {
            using (var db = new ShopDataContext())
            {
                return db.Users.OrderByDescending(z=>z.CreateDate).ToList();
            }
        }

        public void UpdateUser(Users user)
        {
            using (var db = new ShopDataContext())
            {
                var itemFromDb = db.Users.FirstOrDefault(z => z.Id == user.Id);
                if (itemFromDb == null) return;

                itemFromDb.Email = user.Email;
                itemFromDb.IsAdmin = user.IsAdmin;
                itemFromDb.Login = user.Login;
                itemFromDb.Name = user.Name;
                itemFromDb.Surname = user.Surname;
                db.SubmitChanges();
            }
        }

        public void DeleteUserById(Guid id)
        {
            using (var db = new ShopDataContext())
            {
                var user = db.Users.FirstOrDefault(z => z.Id == id);
                if (user == null) return;
                db.Users.DeleteOnSubmit(user);
                db.SubmitChanges();
            }
        }
    }
}
