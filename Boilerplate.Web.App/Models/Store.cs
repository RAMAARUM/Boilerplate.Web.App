using System;
using System.Collections.Generic;

namespace Boilerplate.Web.App.Models
{
    public partial class Store
    {
        public Store()
        {
            ProductSold = new HashSet<ProductSold>();
        }

        public int Sid { get; set; }
        public string Sname { get; set; }
        public string Saddress { get; set; }

        public ICollection<ProductSold> ProductSold { get; set; }
    }
}
