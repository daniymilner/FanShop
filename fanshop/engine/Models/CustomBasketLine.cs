using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using dataAccess.Model;

namespace engine.Models
{
    public class CustomBasketLine
    {
        public BasketLine Line { get; set; }
        public Products Product { get; set; }
    }
}