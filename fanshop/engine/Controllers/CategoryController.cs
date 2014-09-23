using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
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
    }
}