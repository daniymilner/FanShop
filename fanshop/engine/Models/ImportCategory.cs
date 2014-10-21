using System;
using System.Xml.Serialization;

namespace engine.Models
{
    [Serializable]
    public class ImportCategory
    {
        [XmlElement("Name")]
        public string Name { get; set; }

        [XmlElement("PublicKey")]
        public string PublicKey { get; set; }
    }

    [Serializable]
    [XmlRoot("CategoryCollection")]
    public class ImportCategoryCollection
    {
        [XmlArray("Categories")]
        [XmlArrayItem("Category", typeof(ImportCategory))]
        public ImportCategory[] ImportCategory { get; set; }
    }
}