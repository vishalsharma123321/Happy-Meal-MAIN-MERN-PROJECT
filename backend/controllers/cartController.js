import userModel from "../models/userModel.js";

// ADD ITEMS TO THE CARTconst addToCart = async (req, res) => {
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Validate input: Ensure userId and itemId are provided
    if (!userId || !itemId) {
      return res.status(400).json({
        success: false,
        message: "userId and itemId are required.",
      });
    }

    // Find the user by ID and return a plain JavaScript object using .lean() for performance
    const userData = await userModel.findById(userId).lean();

    // If user is not found, return a 404 error
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Retrieve existing cart data or initialize an empty object if none exists
    const cartData = userData.cartData || {};

    // Increment the quantity of the item in the cart (or add it if not present)
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    // Update the user's cartData in the database using $set for efficiency
    await userModel.findByIdAndUpdate(userId, { $set: { cartData } });

    // Send success response with the updated cart data
    res.status(200).json({
      success: true,
      message: "Item added to cart.",
      cartData, // Returning updated cart for frontend use
    });
  } catch (error) {
    console.error("Add to cart error:", error); // Log error for debugging

    // Send error response with status 500 (Internal Server Error)
    res.status(500).json({
      success: false,
      message: "Error in the addToCart API.",
      error: error.message,
    });
  }
};


// REMOVE ITEM FROM THE CART
const removeFromCart = async (req, res) => {
    try {
      const { userId, itemId } = req.body;
  
      // Validate input: Ensure userId and itemId are provided
      if (!userId || !itemId) {
        return res.status(400).json({
          success: false,
          message: "userId and itemId are required.",
        });
      }
  
      // Find the user by ID in the database
      const userData = await userModel.findById(userId);
  
      // If the user is not found, return a 404 error
      if (!userData) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  
      // Retrieve existing cart data or initialize an empty object if none exists
      const cartData = userData.cartData || {};
  
      // Check if the item exists in the cart and its quantity is greater than 0
      if (cartData[itemId] > 0) {
        cartData[itemId] -= 1; // Reduce the quantity by 1
  
        // If the quantity becomes 0, remove the item from the cart completely
        if (cartData[itemId] === 0) {
          delete cartData[itemId];
        }
      }
  
      // Update the user's cartData in the database
      await userModel.findByIdAndUpdate(userId, { $set: { cartData } });
  
      // Send success response
      res.status(200).json({
        success: true,
        message: "Item removed from cart.",
        cartData, // Returning updated cart for frontend reference
      });
  
    } catch (error) {
      console.error("Remove from cart error:", error); // Log error for debugging
  
      // Send error response with status 500 (Internal Server Error)
      res.status(500).json({
        success: false,
        message: "Error in the removeFromCart API.",
        error: error.message,
      });
    }
  };
  

// FETCH USER CART DATA
const getCart = async (req, res) => {
    const { userId } = req.body;
  
    // Validate userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }
  
    try {
      // Fetch only the cartData field from the user document
      const userData = await userModel.findById(userId).select("cartData");
  
      // If user is not found, return an error response
      if (!userData) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  
      // Send a successful response with the cart data
      return res.status(200).json({
        success: true,
        message: "Cart fetched successfully.",
        cartData: userData.cartData || {},
      });
  
    } catch (error) {
      console.error("Get cart error:", error);
      return res.status(500).json({
        success: false,
        message: "Error in the getCart API.",
        error: error.message,
      });
    }
  };

export { addToCart, removeFromCart, getCart };
