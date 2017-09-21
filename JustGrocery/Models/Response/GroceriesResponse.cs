using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JustGrocery.Models.Response
{
    public class GroceriesResponse<G>:BaseResponse
    {
        public List<G> Groceries { get; set; }
    }
}