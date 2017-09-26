using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JustGrocery.Models
{
    public class Grocery
    {
        public int Id { get; set; }
        public string Item { get; set; }
        public string Comment { get; set; }
        public int Quantity { get; set; }
    }
}