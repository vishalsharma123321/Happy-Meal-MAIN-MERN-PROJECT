import mongoose, { Types } from "mongoose"; // Importing mongoose and Types for defining schema and managing MongoDB operations

// Defining the schema for the user collection in MongoDB
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // User's name, required field of type String
    email: { type: String, required: true, unique: true }, // User's email, required and unique to prevent duplicates
    password: { type: String, required: true }, // User's password, required field of type String
    cartData: { type: Object, default: {} } // Object to store user's cart data, defaulting to an empty object
}, { minimize: false }); // Setting minimize to false ensures empty objects are stored in the database

// Creating a model for the user schema; checks if 'user' model exists to avoid redefining it
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel; // Exporting the userModel to use it in other parts of the application
