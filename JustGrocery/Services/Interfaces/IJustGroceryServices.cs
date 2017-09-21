using System.Collections.Generic;
using JustGrocery.Models;
using JustGrocery.Models.Request;

namespace JustGrocery.Services
{
    public interface IJustGroceryServices
    {
        int AddNewItem(AddItemRequest model);
        void DeleteItem(int id);
        List<Grocery> GetGroceryList();
        void UpdateItem(UpdateItemRequest model);
    }
}