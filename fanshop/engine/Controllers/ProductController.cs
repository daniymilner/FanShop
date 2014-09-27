using System;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using dataAccess.Model;
using dataAccess.Repository;

namespace engine.Controllers
{
    public class ProductController : DefaultController
    {
        private readonly ProductRepository _product = new ProductRepository();
        private readonly CategoryRepository _category = new CategoryRepository();

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

        [HttpPost]
        [ActionName("GetProductsByCategoryKey")]
        public HttpResponseMessage GetProductsByCategoryKey(string id)
        {
            var allCategories = _category.All();
            var category = allCategories.FirstOrDefault(z => z.PublicKey == id);
            if (category == null) return ErrorResult("no category");
            var products = _product.FindAll(z => z.CategoryId == category.Id);
            return products.Count != 0 ? SuccessResult(products) : ErrorResult("no products");
        }

        [HttpPost]
        [ActionName("GetProductByPublicKey")]
        public HttpResponseMessage GetProductByPublicKey(string id)
        {
            var product = _product.GetFirstOrDefault(z => z.PublicKey == id);
            return product != null ? SuccessResult(product) : ErrorResult("no product");
        }
    }
}