using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCDemo.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.LessonTitle = "Lesson 4: Introduction to ASP.Net MVC";
            ViewBag.WelcomeText = "Welcome to Computer Programming NC III .NET Technology!";
            return View();
        }
    }
}