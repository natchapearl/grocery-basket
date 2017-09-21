using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace JustGrocery.Models.Request
{
    public class AddItemRequest
    {
        [Required]
        public string Item { get; set; }
        [Required]
        public int Quantity { get; set; }
        public string Comment { get; set; }
    }
}