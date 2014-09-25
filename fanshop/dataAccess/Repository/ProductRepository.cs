using System;
using System.Linq;
using dataAccess.Model;

namespace dataAccess.Repository
{
    public class ProductRepository : DefaultRepository<Products>
    {
        public void UpdateProduct(Products product)
        {
            using (var db = new ShopDataContext())
            {
                var item = db.Products.FirstOrDefault(z => z.Id == product.Id);
                if (item != null)
                {
                    item.Price = product.Price;
                    item.PublicKey = product.PublicKey;
                    item.Title = product.Title;
                    item.UpdateDate = DateTime.Now;
                    item.CategoryId = product.CategoryId;
                    item.Color = item.Color;
                    item.Description = item.Description;

                    db.SubmitChanges();
                }
            }
        }
    }
}
