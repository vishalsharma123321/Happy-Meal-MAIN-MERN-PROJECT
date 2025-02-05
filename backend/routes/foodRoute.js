import express from "express"
import { addFood, listFood, removeItem } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();

// IMage Storage Engine 

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage:storage})


// POST TO ADD FOOD ITEM
foodRouter.post("/add", upload.single("image") ,addFood)

// GET TO GET FOOD ITEM LIST 
foodRouter.get('/list',listFood);

// Remove The Food Item using its id 
foodRouter.delete('/remove/:id',removeItem);


export default foodRouter;  