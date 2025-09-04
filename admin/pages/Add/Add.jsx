import React, { useState } from 'react'; // Import React and useState hook for managing state
import './Add.css'; // Import CSS for styling the component
import { assets, url } from '../../assets/assets'; // Import assets (for images) and the base URL from a shared location
import axios from 'axios'; // Import axios for making HTTP requests
import { toast } from 'react-toastify';



const Add = () => {

//    const url = "http://localhost:4000"; // Backend server URL (local API endpoint)
  const url = "https://happy-meal-back-end.onrender.com"

    // State to manage the selected image file (initially null, since no image is selected)
    const [image, setImage] = useState(null); 

    // State to manage form data (product details like name, description, price, category)
    const [data, setData] = useState({
        name: "", // Product name
        description: "", // Product description
        price: "", // Product price (empty initially)
        category: "Salad" // Default category selected is 'Salad'
    });

    /**
     * Handler function to update form data when an input field changes.
     * This function is triggered whenever the user types into the form fields.
     * It updates the corresponding field in the `data` state object.
     */
    const onChangeHandler = (event) => {
        const name = event.target.name; // Get the name of the input field (e.g., 'name', 'price', etc.)
        const value = event.target.value; // Get the current value entered by the user
        setData(data => ({ ...data, [name]: value })); // Update the state with the new value for that input field
    };

    /**
     * Handler function to submit the form data.
     * It prevents the default form submission, collects all form data (including the image),
     * and sends it to the backend via an HTTP POST request using axios.
     */
    const onSubmitHandler = async (event) => {
        event.preventDefault(); // Prevent default form submission (prevents page reload)

        const formData = new FormData(); // Create a new FormData object to handle file uploads and form data
        formData.append("name", data.name); // Append product name
        formData.append("description", data.description); // Append product description
        formData.append("price", Number(data.price)); // Append product price (convert to number)
        formData.append("category", data.category); // Append product category
        formData.append("image", image); // Append the selected image file (from `image` state)

        // Send a POST request to the backend API with the form data
        const response = await axios.post(`${url}/api/food/add`, formData);
        
        if (response.data.success) {
            // If the submission is successful, reset the form data and image
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad" // Reset to default category
            });
            setImage(null); // Reset the image state
            toast.success(response.data.message) // Show a success message when the form is submitted successfully

        } else {
             // Show an error message when the form submission fails
            toast.error(response.data.message)
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                {/* Section for image upload */}
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" /> 
                        {/* Display the selected image preview or a default image if no image is selected */}
                    </label>
                    {/* Input for file upload (image), hidden from view */}
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>

                {/* Section for product name input */}
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
                </div>

                {/* Section for product description input */}
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write content here' required ></textarea>
                </div>

                {/* Section for product category and price */}
                <div className="add-category-price">
                    {/* Dropdown for selecting product category */}
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    {/* Input for entering product price */}
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20' />
                    </div>
                </div>

                {/* Submit button for adding the product */}
                <button type='submit' className='add-btn'>Add</button>
            </form>
        </div>
    );
};

export default Add;
