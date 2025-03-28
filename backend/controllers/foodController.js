import foodModel from "../models/foodModel.js";
import fs from 'fs';


// ADD FOOD ITEM TO DATABASE
const addFood = async (req, res) => {
  try {
      // Destructure fields from request body
      const { name, description, price, category } = req.body;
      
      // Get image filename if uploaded
      let image_filename = req.file ? req.file.filename : null;

      // If no image is uploaded, return an error
      if (!image_filename) {
          return res.status(400).json({
              success: false,
              message: "Image upload failed"
          });
      }

      // Validate required fields
      if (!name || !description || !price || !category) {
          return res.status(400).json({
              success: false,
              message: "All fields (name, description, price, category) are required."
          });
      }

      // Create a new food document
      const food = new foodModel({
          name,
          description,
          price,
          category,
          image: image_filename
      });

      // Save food item to the database
      await food.save();

      // Send success response
      return res.status(201).json({
          success: true,
          message: "Food Added Successfully",
          food
      });

  } catch (error) {
      console.error("Error in addFood API:", error);

      // Handle any internal server errors
      return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: error.message
      });
  }
};



// TO get List of Food Items 
const listFood = async (req,res) => {
    try {
        let food = await foodModel.find({});
         return res.status(200).send({
          success: true,
          message: "Food list successfully retrieved",
          data: food
         })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Error retrieving food list",
            error
        })
    }
}


// REMOVE FOOD ITEM FROM DATABASE
const removeItem = async (req, res) => {
  try {
      const id = req.params.id; // Get food item ID from request parameters
      const food = await foodModel.findById(id); // Find food item by ID

      if (!food) {
          return res.status(404).json({
              success: false, // ✅ Use boolean instead of string
              message: "Food item not found",
          });
      }

      // Remove the image file associated with the food item
      const imagePath = `./uploads/${food.image}`;
      try {
          if (fs.existsSync(imagePath)) {
              await fs.promises.unlink(imagePath); // ✅ Asynchronous file deletion
          }
      } catch (err) {
          console.error("Error deleting file:", err);
      }

      // Delete the food item from the database
      await foodModel.findByIdAndDelete(id);

      return res.status(200).json({
          success: true,
          message: "Food item successfully removed",
      });
      
  } catch (error) {
      console.error("Error in removeItem API:", error);
      return res.status(500).json({
          success: false,
          message: "Error in the removeItem API",
          error: error.message, // ✅ Return only the error message
      });
  }
};
  



export { addFood, listFood, removeItem};























