import React, { useContext, useEffect } from 'react';
import "./Verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success") || "no-success";
    const orderId = searchParams.get("orderId") || "no-orderId";
    console.log('====================================');
    
    console.log(success, orderId);
    console.log(searchParams.toString()); // This should show the entire query string
    console.log('====================================');
    
    const { url } = useContext(StoreContext);
    console.log("API URL:", url);
    const navigate = useNavigate();

    // Function to verify payment
    const verifypayment = async () => {
        try {
            console.log("Sending request to:", `${url}/api/order/verify`);
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            console.log("Response from server:", response.data);  // Log server response
            
            if (response.data.success) {
                navigate('/myorders');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            navigate('/'); // Redirect to home on error
        }
    };

    // Trigger verification on component mount
    useEffect(() => {
        verifypayment();
    }, []); // Empty dependency array to run only once on mount

    return (
        <div className='verify'>
            <div className='spinner'></div>
        </div>
    );
};

export default Verify;
