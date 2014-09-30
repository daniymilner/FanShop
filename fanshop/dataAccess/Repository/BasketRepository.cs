using System;
using System.Linq;
using dataAccess.Model;

namespace dataAccess.Repository
{
    public class BasketRepository:DefaultRepository<Basket>
    {
        public void UpdateBasket(Basket basket)
        {
            using (var db = new ShopDataContext())
            {
                var item = db.Basket.FirstOrDefault(z => z.Id == basket.Id);
                if (item != null)
                {
                    item.DateUpdate = DateTime.Now;
                    item.Total = basket.Total;

                    db.SubmitChanges();
                }
            }
        }

        public void SuccessBasket(Basket basket)
        {
            using (var db = new ShopDataContext())
            {
                var item = db.Basket.FirstOrDefault(z => z.Id == basket.Id);
                if (item != null)
                {
                    item.DateSuccess = DateTime.Now;

                    db.SubmitChanges();
                }
            }
        }
    }
}
