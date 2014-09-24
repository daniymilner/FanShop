using System;
using System.Collections.Generic;
using System.Linq;
using dataAccess.Model;

namespace dataAccess.Repository
{
    public class CategoryRepository
    {
        public List<Category> GetAllCategories()
        {
            using (var db = new ShopDataContext())
            {
                return db.Category.ToList();
            }
        }

        public void DeleteCategoryById(Guid id)
        {
            using (var db = new ShopDataContext())
            {
                var category = db.Category.FirstOrDefault(z => z.Id == id);
                if (category == null) return;
                db.Category.DeleteOnSubmit(category);
                db.SubmitChanges();
            }
        }

        public Category GetCategoryByPublicKey(string key)
        {
            using (var db = new ShopDataContext())
            {
                return db.Category.FirstOrDefault(z => z.PublicKey == key);
            }
        }

        public void CreateCategory(Category category)
        {
            using (var db = new ShopDataContext())
            {
                db.GetTable<Category>().InsertOnSubmit(category);
                db.SubmitChanges();
            }
        }

        public Category GetCategoryById(Guid id)
        {
            using (var db = new ShopDataContext())
            {
                return db.Category.FirstOrDefault(z => z.Id == id);
            }
        }

        public void UpdateCategory(Category category)
        {
            using (var db = new ShopDataContext())
            {
                var item = db.Category.FirstOrDefault(z => z.Id == category.Id);
                if (item != null)
                {
                    item.Name = category.Name;
                    item.PublicKey = category.PublicKey;

                    db.SubmitChanges();
                }
            }
        }
    }
}
