using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Xml.Serialization;
using dataAccess.Model;
using dataAccess.Repository;
using engine.Models;

namespace engine.Controllers
{
    public class CategoryController : DefaultController
    {
        private readonly CategoryRepository _category = new CategoryRepository();

        [HttpGet]
        [ActionName("GetAllCategories")]
        public HttpResponseMessage GetAllCategories()
        {
            return SuccessResult(_category.All());
        }

        [HttpPost]
        [ActionName("DeleteCategory")]
        public HttpResponseMessage DeleteCategory(string id)
        {
            Guid identifier;
            if (Guid.TryParse(id, out identifier))
            {
                _category.DeleteCategory(identifier);
            }
            return SuccessResult();
        }

        [HttpPost]
        [ActionName("CreateCategory")]
        public HttpResponseMessage CreateCategory(Category category)
        {
            var item = _category.GetFirstOrDefault(z => z.PublicKey == category.PublicKey);
            if (item != null) return ErrorResult("key");

            category.Id = Guid.NewGuid();
            _category.CreateItem(category);
            return SuccessResult();
        }

        [HttpPost]
        [ActionName("GetCategoryById")]
        public HttpResponseMessage GetCategoryById(string id)
        {
            Guid identifier;
            if (!Guid.TryParse(id, out identifier)) return ErrorResult();
            var category = _category.GetFirstOrDefault(z => z.Id == identifier);
            return category != null ? SuccessResult(category) : ErrorResult("no category");
        }

        [HttpPost]
        [ActionName("UpdateCategory")]
        public HttpResponseMessage UpdateCategory(Category category)
        {
            _category.UpdateCategory(category);
            return SuccessResult();
        }

        [HttpPost]
        [ActionName("ImportCategory")]
        public HttpResponseMessage ImportCategory()
        {
            ImportCategoryCollection categories;
            var path = HttpContext.Current.Request.PhysicalApplicationPath + "Import\\category.xml";

            var serializer = new XmlSerializer(typeof(ImportCategoryCollection));

            using (var reader = new StreamReader(path))
            {
                categories = (ImportCategoryCollection)serializer.Deserialize(reader);
            }

            var importList = categories.ImportCategory.ToList();
            if (importList.Count == 0) return ErrorResult();

            var list = importList.Select(category => new Category
            {
                Id = Guid.NewGuid(), 
                Name = category.Name, 
                PublicKey = category.PublicKey
            }).ToList();

            _category.CreateItems(list);

            return SuccessResult();
        }
    }
}