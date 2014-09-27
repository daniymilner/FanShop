using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using dataAccess.Model;

namespace engine.Models
{
    public class AddToBasketData
    {
        public Users User { get; set; }
        public ProductData Product { get; set; }
    }
}