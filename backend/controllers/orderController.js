import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import e from 'express';


dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

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

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.send({
            success: true,
            session_url: session.url
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error in the order API",
            error
        });
    }
};


const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body; // Change this line
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.send({
                success: true,
                message: "Payment Paid Successfully"
            });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.send({
                success: false,
                message: "Payment rejected"
            });
        }
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error in the verify order"
        });
    }
};

// user orders for forntend
const userOrders  = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.send({
            success:true,
            data:orders
        })
    } catch (error) {
        console.log(error);
        return res.send({
            success:false,
            message:"error in the userOrders" 
        })
        
    }
}

// listing orders for admin panel
const listOrders = async (req,res) => {
  try {
    const orders = await orderModel.find({})
    res.json({
        success:true,
        data:orders
    })
  } catch (error) {
    console.log(error);
    return res.send({
        success:false,
        message:"Error in the list order api"
    })
  }
}

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

        res.send({
            success: true,
            message: "Status Updated"
        });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).send({
            success: false,
            message: "Error in updating status: " + error.message  // Include the error message
        });
    }
};


export { placeOrder,verifyOrder, userOrders ,listOrders,updateStatus};
