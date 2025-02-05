import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/oderRoute.js' //  // commented because the strip api is not working properly which may cause error .
import dotenv from 'dotenv';


dotenv.config();

// Initialize the Express application
const app = express();
const port = 4000; 

// Middleware setup
app.use(express.json()); // Automatically parses incoming JSON requests into JavaScript objects
app.use(cors()); // Allows cross-origin requests from any frontend (useful for connecting to APIs)



// db connection
connectDB();



// api endpoints for food
app.use('/api/food',foodRouter)

//  api endpoints for user login and registraion 
app.use('/api/user',userRouter)

// api endpoint for Cart 
app.use('/api/cart',cartRouter)

// api endpoint for order
app.use('/api/order',orderRouter)   // commented because the strip api is not working properly which may cause error .

// api for image 
app.use('/images',express.static("uploads"))




// Define a route to handle GET requests to the root URL ('/')
app.get('/', (req, res) => {
    return res.send("API is working properly"); 
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
    console.log(`Server started successfully on http://localhost:${port}`); 
});


