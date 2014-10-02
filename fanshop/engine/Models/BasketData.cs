using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using dataAccess.Model;

namespace engine.Models
{
    public class BasketData
    {
        public Basket Basket { get; set; }
        public Users User { get; set; }
    }
}