using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dataAccess.Model;

namespace dataAccess.Repository
{
    public class BasketLineRepository:DefaultRepository<BasketLine>
    {
        public void UpdateBasketLine(BasketLine line)
        {
            using (var db = new ShopDataContext())
            {
                var item = db.BasketLine.FirstOrDefault(z => z.Id == line.Id);
                if (item != null)
                {
                    item.Count = line.Count;

                    db.SubmitChanges();
                }
            }
        }
    }
}
