import userModel from '../models/userModel.js'


// ADD ITEMS TO THE CART
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).send({
                success: false,
                message: "User not found."
            });
        }

        const cartData = userData.cartData || {};
        cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.status(200).send({
            success: true,
            message: "Item added to cart."
        });
    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).send({
            success: false,
            message: "Error in the addToCart API.",
            error: error.message
        });
    }
};



// REMOVE ITEM FROMT HE CART
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).send({
                success: false,
                message: "User not found."
            });
        }

        const cartData = userData.cartData || {};
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.status(200).send({
            success: true,
            message: "Item removed from cart."
        });
    } catch (error) {
        console.error("Remove from cart error:", error);
        res.status(500).send({
            success: false,
            message: "Error in the removeFromCart API.",
            error: error.message
        });
    }
};


// FETCH USER CART DATA
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).send({
                success: false,
                message: "User not found."
            });
        }

        const cartData = userData.cartData || {};
        res.status(200).send({
            success: true,
            cartData
        });
    } catch (error) {
        console.error("Get cart error:", error);
        res.status(500).send({
            success: false,
            message: "Error in the getCart API.",
            error: error.message
        });
    }
};


export { addToCart, removeFromCart, getCart };