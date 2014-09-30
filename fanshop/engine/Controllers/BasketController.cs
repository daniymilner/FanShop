using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;
using dataAccess.Model;
using dataAccess.Repository;
using engine.Models;

namespace engine.Controllers
{
    public class BasketController : DefaultController
    {
        public readonly BasketRepository _basketRepository = new BasketRepository();
        public readonly BasketLineRepository _basketLineRepository = new BasketLineRepository();
        public readonly UserRepository _userRepository = new UserRepository();
        public readonly ProductRepository _productRepository = new ProductRepository();

        private Guid CreateBasket(Guid userId)
        {
            var basketId = Guid.NewGuid();
            _basketRepository.CreateItem(new Basket
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
            var basket = _basketRepository.GetFirstOrDefault(z => z.Id == basketId);
            if (basket == null) return;
            basket.Total = basket.Total + product.Count * product.Price;
            _basketRepository.UpdateBasket(basket);
        }

        private void AddProductToBasketLine(Guid productId, Guid basketId, int count)
        {
            var line = _basketLineRepository.GetFirstOrDefault(z => z.BasketId == basketId && z.ProductId == productId);
            if (line != null)
            {
                line.Count = line.Count + count;
                _basketLineRepository.UpdateBasketLine(line);
            }
            else
            {
                _basketLineRepository.CreateItem(new BasketLine
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
            var userBasket = _basketRepository.GetFirstOrDefault(z => z.DateSuccess == null && z.UserId == data.User.Id);
            var basketId = userBasket == null ? CreateBasket(data.User.Id) : userBasket.Id;
            AddProductToBasket(basketId, data.Product);
            AddProductToBasketLine(data.Product.Id, basketId, data.Product.Count);

            return SuccessResult();
        }

        [HttpPost]
        [ActionName("RemoveProductFromBasket")]
        public HttpResponseMessage RemoveProductFromBasket(AddToBasketData data)
        {
            var basket = _basketRepository.GetFirstOrDefault(z => z.UserId == data.User.Id && z.DateSuccess == null);
            if (basket == null) return ErrorResult();
            var line = _basketLineRepository.GetFirstOrDefault(z => z.BasketId == basket.Id && z.ProductId == data.Product.Id);
            _basketLineRepository.DeleteItem(z => z.Id == line.Id);
            basket.Total = basket.Total - line.Count*data.Product.Price;
            _basketRepository.UpdateBasket(basket);

            var allLines = _basketLineRepository.FindAll(z => z.BasketId == basket.Id);
            if (allLines.Count == 0)
                _basketRepository.DeleteItem(z => z.Id == basket.Id);

            return SuccessResult();
        }

        [HttpPost]
        [ActionName("ChangeProductCountInBasket")]
        public HttpResponseMessage ChangeProductCountInBasket(AddToBasketData data)
        {
            var basket = _basketRepository.GetFirstOrDefault(z => z.UserId == data.User.Id && z.DateSuccess == null);
            if (basket == null) return ErrorResult();
            var line = _basketLineRepository.GetFirstOrDefault(z => z.BasketId == basket.Id && z.ProductId == data.Product.Id);
            line.Count = data.Product.Count;
            _basketLineRepository.UpdateBasketLine(line);

            var allLines = _basketLineRepository.FindAll(z => z.BasketId == basket.Id);
            basket.Total = 0;
            foreach (var basketLine in allLines)
            {
                var product = _productRepository.GetFirstOrDefault(z => z.Id == basketLine.ProductId);
                basket.Total += basketLine.Count*product.Price;
            }
                
            _basketRepository.UpdateBasket(basket);
            var result = new ViewBasketData
            {
                Basket = basket,
                Lines = new List<CustomBasketLine>()
            };
            foreach (var basketLine in allLines)
            {
                result.Lines.Add(new CustomBasketLine
                {
                    Line = basketLine,
                    Product = _productRepository.GetFirstOrDefault(z => z.Id == basketLine.ProductId)
                });
            }
            return SuccessResult(result);
        }

        [HttpPost]
        [ActionName("BasketInfo")]
        public HttpResponseMessage BasketInfo(Users user)
        {
            var basket = _basketRepository.GetFirstOrDefault(z => z.UserId == user.Id && z.DateSuccess == null);
            if (basket == null) return ErrorResult("no basket");

            var lines = _basketLineRepository.FindAll(z => z.BasketId == basket.Id);
            var result = new ViewBasketData
            {
                Basket = basket,
                Lines = new List<CustomBasketLine>()
            };
            foreach (var basketLine in lines)
            {
                result.Lines.Add(new CustomBasketLine
                {
                    Line = basketLine,
                    Product = _productRepository.GetFirstOrDefault(z => z.Id == basketLine.ProductId)
                });
            }
            
            return SuccessResult(result);
        }

        [HttpPost]
        [ActionName("PayForBasket")]
        public HttpResponseMessage PayForBasket(Users user)
        {
            var basket = _basketRepository.GetFirstOrDefault(z => z.UserId == user.Id && z.DateSuccess == null);
            if (basket == null) return ErrorResult();
            _basketRepository.SuccessBasket(basket);
            return SuccessResult();
        }
    }
}