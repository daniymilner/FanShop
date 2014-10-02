using System.Collections.Generic;
using System.Linq;
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

        public void DeleteLines(List<BasketLine> lines)
        {
            using (var db = new ShopDataContext())
            {
                foreach (var line in lines)
                {
                    var element = db.BasketLine.FirstOrDefault(z => z.Id == line.Id);
                    if (element == null) continue;
                    db.BasketLine.DeleteOnSubmit(element);
                }
                db.SubmitChanges();
            }
        }
    }
}
