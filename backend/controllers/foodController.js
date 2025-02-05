import { error, log } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food item
const addFood = async (req, res) => {

    const { name, description, price, category } = req.body;
    let image_filename = req.file ? req.file.filename : null;

    // If no image is uploaded
    if (!image_filename) {
        return res.send({
            success: false,
            message: "Image upload failed"
        });
    }

    // Ensure that name and price are not undefined
    if (!name || !price) {
        return res.json({
            success: false,
            message: "Name and Price are required"
        });
    }

    const food = new foodModel({
        name,
        description,
        price,
        category,
        image: image_filename
    });

    try {
        await food.save();
        res.status(201).send({
            success: true,
            message: "Food Added",
            food
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error in the food API",
            error
        });
    }
};


// TO get List of Food Items 
const listFood = async (req,res) => {
    try {
        let food = await foodModel.find({});
         return res.status(200).send({
            success:"true",
            message:"food list successfully retrived ",
            data:food
         })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:"false",
            message:"error in the foof Lsit Api",
            error
        })
    }
}


//  Remove food item  
const removeItem = async (req, res) => {
    try {
      const id = req.params.id;  // Get id from params instead of req.body
      const food = await foodModel.findById(id);
  
      if (!food) {
        return res.status(404).send({
          success: "false",
          message: "Food item not found",
        });
      }
  
      // Remove the image file associated with the food item
      fs.unlink(`./uploads/${food.image}`, (err) => {
        if (err) {
          console.log('Error deleting file ', err);
        }
      });
  
      // Delete the food item from the database
      await foodModel.findByIdAndDelete(id);
  
      return res.status(201).send({
        success: "true",
        message: "Food item successfully removed",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: "false",
        message: "Error in the removeItem API",
        error,
      });
    }
  };
  



export { addFood, listFood, removeItem};























