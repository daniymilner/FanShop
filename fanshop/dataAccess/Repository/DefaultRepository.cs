using System;
using System.Collections.Generic;
using System.Linq;
using dataAccess.Model;

namespace dataAccess.Repository
{
    public class DefaultRepository<T> where T : class
    {
        public List<T> All()
        {
            using (var db = new ShopDataContext())
            {
                return db.GetTable<T>().ToList();
            }
        }

        public List<T> FindAll(Func<T, bool> exp)
        {
            using (var db = new ShopDataContext())
            {
                return db.GetTable<T>().Where(exp).ToList();
            }
        }

        public T GetFirstOrDefault(Func<T, bool> exp)
        {
            using (var db = new ShopDataContext())
            {
                return db.GetTable<T>().FirstOrDefault(exp);
            }
        }

        public void CreateItem(T entity)
        {
            using (var db = new ShopDataContext())
            {
                db.GetTable<T>().InsertOnSubmit(entity);
                db.SubmitChanges();
            }
        }

        public void DeleteItem(Func<T, bool> exp)
        {
            using (var db = new ShopDataContext())
            {
                var item = db.GetTable<T>().FirstOrDefault(exp);
                if (item == null) return;
                db.GetTable<T>().DeleteOnSubmit(item);
                db.SubmitChanges();
            }
        }

    }
}
