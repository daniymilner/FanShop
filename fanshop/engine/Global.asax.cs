using System;
using System.Web;
using System.Web.Routing;
using System.Web.Http;

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
            routes.MapHttpRoute("Registration", "api/{controller}/{action}/{id}", new
               {
                   controller = "User",
                   action = "Registration",
                   id = RouteParameter.Optional
               });

            routes.MapHttpRoute("UserInfo", "api/{controller}/{action}", new
                {
                    controller = "User",
                    action = "GetUserInfo"
                });

            routes.MapHttpRoute("SignIn", "api/{controller}/{action}/{id}", new
                {
                    controller = "User",
                    action = "SignIn",
                    id = RouteParameter.Optional
                });
        }

        void Application_End(object sender, EventArgs e)
        {
            //  Код, выполняемый при завершении работы приложения

        }

        void Application_Error(object sender, EventArgs e)
        {
            // Код, выполняемый при появлении необработанной ошибки

        }
    }
}
