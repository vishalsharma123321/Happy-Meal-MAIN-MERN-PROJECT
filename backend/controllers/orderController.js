import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';


dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    // const frontend_url = "http://localhost:5174";
     const frontend_url =  "https://happy-meal-back-end.onrender.com";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();

        // Clear the user's cart after order placement
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

         // Create line items for Stripe checkout
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80 // Ensure the conversion is correct
            },
            quantity: item.quantity
        }));

        // Add delivery charge as a separate item
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80 // Ensure this is correct
            },
            quantity: 1
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.status(200).json({
            success: true,
            session_url: session.url
        });
    } catch (error) {
        console.error("Error in placeOrder API:", error);
        return res.status(500).json({
            success: false,
            message: "Error in the order API",
            error: error.message
        });
    }
};


const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body; // Change this line
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            return res.status(200).json({
                success: true,
                message: "Payment Paid Successfully"
            });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            return res.status(400).json({
                success: false,
                message: "Payment rejected"
            });
        }
    } catch (error) {
        console.error("Error in verifyOrder API:", error);
        return res.status(500).json({
            success: false,
            message: "Error in the verify order",
            error: error.message
        });
    }
};

// user orders for forntend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const orders = await orderModel.find({ userId });

        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error("Error in userOrders API:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found"
            });
        }

        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error("Error in listOrders API:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// api for updating order status 
const updateStatus = async (req, res) => {
    const { orderId, status } = req.body;

    // Validate input
    if (!orderId || !status) {
        return res.status(400).send({
            success: false,
            message: "Order ID and status are required."
        });
    }

    try {
        // Find the order to ensure it exists
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).send({
                success: false,
                message: "Order not found."
            });
        }

        // Update the order status
        await orderModel.findByIdAndUpdate(orderId, { status: status });

        return res.status(200).json({
            success: true,
            message: `Order status updated to ${status}`,
            updatedOrder: order
        });
    } catch (error) {
        console.error("Error in updateStatus API:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


export { placeOrder,verifyOrder, userOrders ,listOrders,updateStatus};
