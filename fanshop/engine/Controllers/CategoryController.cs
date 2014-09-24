using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using dataAccess.Model;
using dataAccess.Repository;

namespace engine.Controllers
{
    public class CategoryController : DefaultController
    {
        private readonly CategoryRepository _category = new CategoryRepository();

        [HttpGet]
        [ActionName("GetAllCategories")]
        public HttpResponseMessage GetAllCategories()
        {
            return SuccessResult(_category.GetAllCategories());
        }

        [HttpPost]
        [ActionName("DeleteCategory")]
        public HttpResponseMessage DeleteCategory(string id)
        {
            Guid identifier;
            if (Guid.TryParse(id, out identifier))
            {
                _category.DeleteCategoryById(identifier);
            }
            return SuccessResult();
        }

        [HttpPost]
        [ActionName("CreateCategory")]
        public HttpResponseMessage CreateCategory(Category category)
        {
            var item = _category.GetCategoryByPublicKey(category.PublicKey);
            if (item != null) return ErrorResult("key");

            category.Id = Guid.NewGuid();
            _category.CreateCategory(category);
            return SuccessResult();
        }

        [HttpPost]
        [ActionName("GetCategoryById")]
        public HttpResponseMessage GetCategoryById(string id)
        {
            Guid identifier;
            if (!Guid.TryParse(id, out identifier)) return ErrorResult();
            var category = _category.GetCategoryById(identifier);
            return category != null ? SuccessResult(category) : ErrorResult("no category");
        }

        [HttpPost]
        [ActionName("UpdateCategory")]
        public HttpResponseMessage UpdateCategory(Category category)
        {
            _category.UpdateCategory(category);
            return SuccessResult();
        }
    }
}