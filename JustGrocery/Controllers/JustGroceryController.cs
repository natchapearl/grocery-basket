using JustGrocery.Models;
using JustGrocery.Models.Request;
using JustGrocery.Models.Response;
using JustGrocery.Services;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JustGrocery.Controllers
{
    [RoutePrefix("api/grocery")]
    public class JustGroceryController : ApiController
    {
        readonly IJustGroceryServices justGroceryServices;
        public JustGroceryController(IJustGroceryServices justGroceryServices)
        {
            this.justGroceryServices = justGroceryServices;
        }

        [Route, HttpGet]
        public HttpResponseMessage GetGroceryList()
        {
            GroceriesResponse<Grocery> response = new GroceriesResponse<Grocery>();
            response.Groceries = justGroceryServices.GetGroceryList();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route, HttpPost]
        public HttpResponseMessage AddNewItem(AddItemRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
                GroceryResponse<int> response = new GroceryResponse<int>
            {
                Grocery = justGroceryServices.AddNewItem(model)
            };
                return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage UpdateItem(int id, UpdateItemRequest model)
        {
            if(id != model.Id)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "The id parameter does not exist in this context");
            }
                SuccessResponse response = new SuccessResponse();
                justGroceryServices.UpdateItem(model);

                return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage DeleteItem(int id)
        {
            SuccessResponse response = new SuccessResponse();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
    }
}