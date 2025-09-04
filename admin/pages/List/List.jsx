import React, { useEffect, useState } from 'react' // Importing necessary React hooks
import './List.css' // Importing custom styles
import axios from 'axios'; // Importing axios for HTTP requests
import { toast } from 'react-toastify'; // Importing toast notifications for user feedback

const List = () => {
  ///const url = "http://localhost:4000"; // Backend API base URL
  const url = "https://happy-meal-back-end.onrender.com"
  
const [list, setList] = useState([]); // State variable to store the list of food items

  // Function to fetch the list of food items from the backend
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`); // Making GET request to fetch food list
    // If response is successful, update the list state with the fetched data
    if (response.data.success) {
      setList(response.data.data); // Updating the list with data from the response
    } else {
      toast.error("Failed to fetch food items"); // Displaying error message if fetch fails
    }
  };

  // Function to delete a specific food item by its ID
  const removeFood = async (foodId) => {
    try {
      // Making DELETE request to remove the food item by ID
      const response = await axios.delete(`${url}/api/food/remove/${foodId}`);
      await fetchList(); // Refreshing the list after successful deletion
      // Providing feedback based on the success of the deletion
      if(response.data.success){
        toast.success(response.data.message); // Success notification if deletion was successful
      }else{
        toast.error("Error"); // Error notification if deletion failed
      }
    } catch (error) {
      console.error("Error removing food item:", error); // Logging error if the DELETE request fails
    }
  };
  
  // Using useEffect to fetch the list of items when the component loads
  useEffect(()=>{
    fetchList(); // Fetching food list initially when the component mounts
  },[]);

  return (
    <div className='list add flex-col'>
        <p>All Food List</p> {/* Title */}
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {/* Mapping through each item in the list to display them in rows */}
          {list.map((item, index) => {
            return (
              <div key={index} className="list-table-format"> {/* Unique key for each item */}
                <img src={`${url}/images/` + item.image} alt={item.name} /> {/* Displaying item image */}
                <p>{item.name}</p> {/* Displaying item name */}
                <p>{item.category}</p> {/* Displaying item category */}
                <p>{item.price}</p> {/* Displaying item price */}
                {/* Delete button to remove item; calls removeFood function on click */}
                <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
              </div>
            )
          })}
        </div>
    </div>
  );
};

export default List;
