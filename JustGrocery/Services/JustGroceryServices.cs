using JustGrocery.Models;
using JustGrocery.Models.Request;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace JustGrocery.Services
{
    public class JustGroceryServices : IJustGroceryServices
    {
        const string connectionString = "Server=.;Database=JustGrocery;Trusted_Connection=true";

        //Get a full grocery list
        public List<Grocery> GetGroceryList()
        {
            List<Grocery> groceryList = null;

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "dbo.GroceryList_SelectAll";
                cmd.CommandType = CommandType.StoredProcedure;

                using (IDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int index = 0;
                        Grocery groceryItem = new Grocery();
                        groceryItem.Id = reader.GetInt32(index++);
                        groceryItem.Item = reader.GetString(index++);
                        groceryItem.Quantity = reader.GetInt32(index++);
                        groceryItem.Comment = reader.GetString(index++);

                        if(groceryList == null)
                        {
                            groceryList = new List<Grocery>();
                        }
                        groceryList.Add(groceryItem);
                    }
                    return groceryList;
                }
            }
        }

        //Add new item to the list
        public int AddNewItem(AddItemRequest model)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "dbo.GroceryList_Insert";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Item", model.Item);
                cmd.Parameters.AddWithValue("@Quantity", model.Quantity);
                cmd.Parameters.AddWithValue("@Comment", model.Comment);

                SqlParameter outputParam = cmd.Parameters.Add("@Id", SqlDbType.Int);
                outputParam.Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                return (int)outputParam.Value;
            }
        }

        //Update item in the list
        public void UpdateItem(UpdateItemRequest model)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "dbo.GroceryList_Update";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Item", model.Item);
                cmd.Parameters.AddWithValue("@Quantity", model.Quantity);
                cmd.Parameters.AddWithValue("@Comment", model.Comment);

                cmd.ExecuteNonQuery();
            }
        }

        //Delete item from the list
        public void DeleteItem(int id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "dbo.GroceryList_Delete";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", id);

                cmd.ExecuteNonQuery();
            }
        }
    }
}