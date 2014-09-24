using dataAccess.Model;
using System;
using System.Linq;

namespace dataAccess.Repository
{
    public class UserRepository : DefaultRepository<Users>
    {
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
    }
}
