using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using dataAccess.Model;

namespace engine.Models
{
    public class ViewBasketData
    {
        public Basket Basket { get; set; }
        public List<CustomBasketLine> Lines { get; set; } 
    }
}