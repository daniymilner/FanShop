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
            const string defaultSchema = "api/{controller}/{action}";

            routes.MapHttpRoute("Registration", defaultSchema);

            routes.MapHttpRoute("UserInfo", defaultSchema);

            routes.MapHttpRoute("SignIn", defaultSchema);

            routes.MapHttpRoute("GetAllUsers", defaultSchema);

            routes.MapHttpRoute("GetUserById", defaultSchema + "/{id}");

            routes.MapHttpRoute("UpdateUser", defaultSchema);

            routes.MapHttpRoute("DeleteUser", defaultSchema + "/{id}");

            routes.MapHttpRoute("GetAllCategories", defaultSchema);

            routes.MapHttpRoute("DeleteCategory", defaultSchema + "/{id}");
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
