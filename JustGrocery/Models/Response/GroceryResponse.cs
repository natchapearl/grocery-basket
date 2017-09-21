using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JustGrocery.Models.Response
{
    public class GroceryResponse<G> : SuccessResponse
    {
        public G Grocery { get; set; }
    }
}