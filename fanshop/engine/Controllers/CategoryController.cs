using System;
using System.Net.Http;
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
    }
}