using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace engine.Models
{
    public class ProductData
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public Guid CategoryId { get; set; }
        public decimal Price { get; set; }
        public string PublicKey { get; set; }
        public DateTime UpdateDate { get; set; }
        public int Count { get; set; }
    }
}