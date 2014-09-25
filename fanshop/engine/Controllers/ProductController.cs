using System;
using System.Net.Http;
using System.Web.Http;
using dataAccess.Model;
using dataAccess.Repository;

namespace engine.Controllers
{
    public class ProductController : DefaultController
    {
        private readonly ProductRepository _product = new ProductRepository();

        [HttpGet]
        [ActionName("GetAllProducts")]
        public HttpResponseMessage GetAllProducts()
        {
            return SuccessResult(_product.All());
        }

        [HttpPost]
        [ActionName("DeleteProduct")]
        public HttpResponseMessage DeleteProduct(string id)
        {
            Guid identifier;
            if (Guid.TryParse(id, out identifier))
            {
                _product.DeleteItem(z=>z.Id == identifier);
            }
            return SuccessResult();
        }

        [HttpPost]
        [ActionName("GetProductById")]
        public HttpResponseMessage GetProductById(string id)
        {
            Guid identifier;
            if (!Guid.TryParse(id, out identifier)) return ErrorResult();
            var product = _product.GetFirstOrDefault(z => z.Id == identifier);
            return product != null ? SuccessResult(product) : ErrorResult("no product");
        }

        [HttpPost]
        [ActionName("CreateProduct")]
        public HttpResponseMessage CreateProduct(Products product)
        {
            var item = _product.GetFirstOrDefault(z => z.PublicKey == product.PublicKey);
            if (item != null) return ErrorResult("key");

            product.Id = Guid.NewGuid();
            product.UpdateDate = DateTime.Now;
            _product.CreateItem(product);
            return SuccessResult();
        }

        [HttpPost]
        [ActionName("UpdateProduct")]
        public HttpResponseMessage UpdateProduct(Products product)
        {
            _product.UpdateProduct(product);
            return SuccessResult();
        }
    }
}