using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace JustGrocery.Models.Request
{
    public class UpdateItemRequest : AddItemRequest
    {
        [Required]
        public int Id { get; set; }
    }
}