using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Xml;
using System.Xml.Serialization;
using dataAccess.Model;
using dataAccess.Repository;
using engine.Models;

namespace engine.Controllers
{
    public class ProductController : DefaultController
    {
        private readonly ProductRepository _product = new ProductRepository();
        private readonly CategoryRepository _category = new CategoryRepository();
        private readonly ExportRepository _export = new ExportRepository();
        private readonly BasketRepository _basket = new BasketRepository();
        private readonly UserRepository _user = new UserRepository();

        [HttpGet]
        [ActionName("GetAllProducts")]
        public HttpResponseMessage GetAllProducts()
        {
            return SuccessResult(_product.All().OrderByDescending(z=>z.UpdateDate));
        }

        [HttpPost]
        [ActionName("DeleteProduct")]
        public HttpResponseMessage DeleteProduct(string id)
        {
            Guid identifier;
            if (Guid.TryParse(id, out identifier))
            {
                _product.DeleteItem(z => z.Id == identifier);
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

        [HttpPost]
        [ActionName("Export")]
        public HttpResponseMessage Export()
        {
            //var allExports = _export.All().OrderByDescending(z => z.Date).ToList();
            //var number = allExports.Count != 0 ? allExports[allExports.Count - 1].Number + 1 : 1;
            //var orders = allExports.Count != 0 ? _basket.FindAll(z => z.DateSuccess != null && z.DateSuccess > allExports[allExports.Count - 1].Date) : _basket.FindAll(z => z.DateSuccess != null);

            //if (orders.Count == 0) return ErrorResult();

            //var settings = new XmlWriterSettings { Indent = true, Encoding = Encoding.UTF8 };

            //var xmlDoc = HttpContext.Current.Request.PhysicalApplicationPath + "Export\\order_export_" + number + ".xml";
            //using (var writer = XmlWriter.Create(xmlDoc, settings))
            //{
            //    writer.WriteStartDocument();
            //    writer.WriteStartElement("orders");
            //    foreach (var order in orders)
            //    {
            //        var user = _user.GetFirstOrDefault(z => z.Id == order.UserId);
            //        writer.WriteElementString("userName", user.Name + " " + user.Surname);
            //        writer.WriteElementString("publicId", order.PublicId);
            //        writer.WriteElementString("dateCreate", Convert.ToString(order.DateCreate));
            //        writer.WriteElementString("dateSuccess", Convert.ToString(order.DateSuccess));
            //        writer.WriteElementString("dateUpdate", Convert.ToString(order.DateUpdate));
            //        writer.WriteElementString("total", Convert.ToString(order.Total));
            //        writer.WriteEndElement();
            //    }
            //    writer.WriteEndElement();
            //    writer.WriteEndDocument();
            //}

            //_export.CreateItem(new Export
            //{
            //    Date = DateTime.Now,
            //    Id = Guid.NewGuid(),
            //    Number = number
            //});
            return SuccessResult(HttpContext.Current.Request);
        }

        [HttpPost]
        [ActionName("Import")]
        public HttpResponseMessage Import()
        {
            ImportProductCollection products;
            var path = HttpContext.Current.Request.PhysicalApplicationPath + "Import\\products.xml";

            var serializer = new XmlSerializer(typeof(ImportProductCollection));

            using (var reader = new StreamReader(path))
            {
                products = (ImportProductCollection)serializer.Deserialize(reader);
            }

            var importList = products.ImportProduct.ToList();
            if (importList.Count == 0) return ErrorResult();

            var list = importList.Select(product => new Products
            {
                Id = Guid.NewGuid(), 
                Color = product.Color, 
                Description = product.Description, 
                Price = product.Price, 
                PublicKey = product.PublicKey, 
                Title = product.Title, 
                UpdateDate = DateTime.Now, 
                CategoryId = product.CategoryId
            }).ToList();

            _product.CreateItems(list);
            
            return SuccessResult();
        }

    }
}