import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Food Title is required"],
      },
    description:{
        type:String,
        required:[true, "Food Description is required"]
    },
    price:{
        type:Number,
        required:[true , "Food Price is required "]
    },
    image:{
        type:String,
        required:[true, "Image is required "]
    },
    category:{
        type:String,
        required:[true , "Food category is required "]
    }
}, {timestamps:true} 
)

const  foodModel = mongoose.models.food || mongoose.model("food",foodSchema);
export default foodModel;