using System;
using System.Linq;
using dataAccess.Model;

namespace dataAccess.Repository
{
    public class CategoryRepository : DefaultRepository<Category>
    {
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

        public void DeleteCategory(Guid id)
        {
            var productRepository = new ProductRepository();
            var products = productRepository.FindAll(z => z.CategoryId == id);
            foreach (var product in products)
                productRepository.DeleteItem(z=>z.Id == product.Id);

            DeleteItem(z=>z.Id == id);
        }
    }
}
