using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace engine.Models
{
    public class ChangeProductCountData
    {
        public ProductData Product { get; set; }
        public Guid BasketId { get; set; }
    }
}