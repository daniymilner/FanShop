using System;
using System.Xml.Serialization;

namespace engine.Models
{
    [Serializable]
    public class ImportProduct
    {
        [XmlElement("Title")]
        public string Title { get; set; }

        [XmlElement("Price")]
        public int Price { get; set; }

        [XmlElement("Color")]
        public string Color { get; set; }

        [XmlElement("Description")]
        public string Description { get; set; }

        [XmlElement("PublicKey")]
        public string PublicKey { get; set; }

        [XmlElement("CategoryId")]
        public Guid CategoryId { get; set; }
    }

    [Serializable]
    [XmlRoot("ProductsCollection")]
    public class ImportProductCollection
    {
        [XmlArray("Products")]
        [XmlArrayItem("Product", typeof(ImportProduct))]
        public ImportProduct[] ImportProduct { get; set; }
    }
}