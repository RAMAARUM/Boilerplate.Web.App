using System;
using System.Collections.Generic;

namespace Boilerplate.Web.App.Models
{
    public partial class Customer
    {
        public Customer()
        {
            ProductSold = new HashSet<ProductSold>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        public ICollection<ProductSold> ProductSold { get; set; }
    }
}
