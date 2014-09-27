using System;
using System.Net.Http;
using System.Web.Http;
using dataAccess.Model;
using dataAccess.Repository;
using engine.Models;

namespace engine.Controllers
{
    public class BasketController : DefaultController
    {
        public readonly BasketRepository BasketRepository = new BasketRepository();
        public readonly BasketLineRepository BasketLineRepository = new BasketLineRepository();

        private Guid CreateBasket(Guid userId)
        {
            var basketId = Guid.NewGuid();
            BasketRepository.CreateItem(new Basket
            {
                Id = basketId,
                DateCreate = DateTime.Now,
                DateUpdate = DateTime.Now,
                UserId = userId,
                Total = 0
            });
            return basketId;
        }

        private void AddProductToBasket(Guid basketId, ProductData product)
        {
            var basket = BasketRepository.GetFirstOrDefault(z => z.Id == basketId);
            if (basket == null) return;
            basket.DateUpdate = DateTime.Now;
            basket.Total = basket.Total + product.Count * product.Price;
            BasketRepository.UpdateBasket(basket);
        }

        private void AddProductToBasketLine(Guid productId, Guid basketId, int count)
        {
            var line = BasketLineRepository.GetFirstOrDefault(z => z.BasketId == basketId && z.ProductId == productId);
            if (line != null)
            {
                line.Count = line.Count + count;
                BasketLineRepository.UpdateBasketLine(line);
            }
            else
            {
                BasketLineRepository.CreateItem(new BasketLine
                {
                    Id = Guid.NewGuid(),
                    BasketId = basketId,
                    ProductId = productId,
                    Count = count
                });
            }
        }

        [HttpPost]
        [ActionName("AddProductToBasket")]
        public HttpResponseMessage AddProductToBasket(AddToBasketData data)
        {
            var userBasket = BasketRepository.GetFirstOrDefault(z => z.DateSuccess == null && z.UserId == data.User.Id);
            var basketId = userBasket == null ? CreateBasket(data.User.Id) : userBasket.Id;
            AddProductToBasket(basketId, data.Product);
            AddProductToBasketLine(data.Product.Id, basketId, data.Product.Count);

            return SuccessResult();
        }

    }
}