using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
    }
}
