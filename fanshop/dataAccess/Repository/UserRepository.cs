using dataAccess.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public void CreateUser(Users user)
        {
            using (var db = new ShopDataContext())
            {
                db.Users.InsertOnSubmit(user);
                db.SubmitChanges();
            }
        }
    }
}
