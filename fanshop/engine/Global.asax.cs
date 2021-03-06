﻿using System;
using System.Web;
using System.Web.Routing;
using System.Web.Http;
using System.Web.SessionState;

namespace engine
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Код, выполняемый при запуске приложения
            InitRouting(RouteTable.Routes);
        }

        private static void InitRouting(RouteCollection routes)
        {
            const string defaultSchema = "api/{controller}/{action}";

            routes.MapHttpRoute("Home", defaultSchema);
            routes.MapHttpRoute("Registration", defaultSchema);
            routes.MapHttpRoute("UserInfo", defaultSchema);
            routes.MapHttpRoute("SignIn", defaultSchema);
            routes.MapHttpRoute("GetAllUsers", defaultSchema);
            routes.MapHttpRoute("GetUserById", defaultSchema + "/{id}");
            routes.MapHttpRoute("UpdateUser", defaultSchema);
            routes.MapHttpRoute("DeleteUser", defaultSchema + "/{id}");
            routes.MapHttpRoute("GetAllCategories", defaultSchema);
            routes.MapHttpRoute("DeleteCategory", defaultSchema + "/{id}");
            routes.MapHttpRoute("CreateCategory", defaultSchema);
            routes.MapHttpRoute("GetCategoryById", defaultSchema + "/{id}");
            routes.MapHttpRoute("UpdateCategory", defaultSchema);
            routes.MapHttpRoute("GetAllProducts", defaultSchema);
            routes.MapHttpRoute("DeleteProduct", defaultSchema + "/{id}");
            routes.MapHttpRoute("GetProductById", defaultSchema + "/{id}");
            routes.MapHttpRoute("GetProductsByCategoryKey", defaultSchema + "/{id}");
            routes.MapHttpRoute("GetProductByPublicKey", defaultSchema + "/{id}");
            routes.MapHttpRoute("CreateProduct", defaultSchema);
            routes.MapHttpRoute("AddProductToBasket", defaultSchema);
            routes.MapHttpRoute("UpdateProduct", defaultSchema);
            routes.MapHttpRoute("RemoveProductFromBasket", defaultSchema);
            routes.MapHttpRoute("RemoveProductFromBasketById", defaultSchema);
            routes.MapHttpRoute("ChangeProductCountInBasket", defaultSchema);
            routes.MapHttpRoute("ChangeProductCountInBasketById", defaultSchema);
            routes.MapHttpRoute("PayForBasket", defaultSchema);
            routes.MapHttpRoute("BasketInfo", defaultSchema);
            routes.MapHttpRoute("GetAllSuccessBaskets", defaultSchema);
            routes.MapHttpRoute("RemoveBasket", defaultSchema);
            routes.MapHttpRoute("GetBasketInfoById", defaultSchema+"/{id}");
            routes.MapHttpRoute("SendFeedback", defaultSchema);
            routes.MapHttpRoute("SignOut", defaultSchema);
            routes.MapHttpRoute("GetAllFeedback", defaultSchema);
            routes.MapHttpRoute("RemoveFeedback", defaultSchema);
            routes.MapHttpRoute("OrderHistory", defaultSchema);
            routes.MapHttpRoute("BasketInfoByPublicId", defaultSchema+"/{id}");
            routes.MapHttpRoute("Export", defaultSchema);
            routes.MapHttpRoute("Import", defaultSchema);
            routes.MapHttpRoute("ImportCategory", defaultSchema);
        }

        void Application_End(object sender, EventArgs e)
        {
            //  Код, выполняемый при завершении работы приложения

        }

        void Application_Error(object sender, EventArgs e)
        {
            // Код, выполняемый при появлении необработанной ошибки

        }

        protected void Application_PostAuthorizeRequest()
        {
            if (IsWebApiRequest())
            {
                HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
            }
        }
        private bool IsWebApiRequest()
        {
            return HttpContext.Current.Request.AppRelativeCurrentExecutionFilePath.StartsWith("~/api");
        }

    }
}
