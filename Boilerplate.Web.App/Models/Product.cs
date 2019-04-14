using System;
using System.Collections.Generic;

namespace Boilerplate.Web.App.Models
{
    public partial class Product
    {
        public Product()
        {
            ProductSold = new HashSet<ProductSold>();
        }

        public int Pid { get; set; }
        public string Pname { get; set; }
        public decimal? Price { get; set; }

        public ICollection<ProductSold> ProductSold { get; set; }
    }
}
