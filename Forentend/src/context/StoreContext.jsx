import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        const updatedCartItems = { ...cartItems };
        updatedCartItems[itemId] = (updatedCartItems[itemId] || 0) + 1;
        setCartItems(updatedCartItems);
    
        if (token) {
            try {
                const response = await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.status === 200 && response.data.success) {
                    console.log("Item added to backend cart:", response.data);
                } else {
                    console.error("Failed to add item to backend cart");
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        const updatedCartItems = { ...cartItems };
        if (updatedCartItems[itemId] > 1) {
            updatedCartItems[itemId] -= 1;
        } else {
            delete updatedCartItems[itemId];
        }
        setCartItems(updatedCartItems);
    
        if (token) {
            try {
                const response = await axios.put(
                    `${url}/api/cart/remove`,
                    { itemId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.status === 200 && response.data.success) {
                    console.log("Item removed from backend cart:", response.data);
                } else {
                    console.error("Failed to remove item from backend cart");
                }
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                } else {
                    console.warn(`Item with ID ${item} not found in food list.`);
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.status === 200) {
                setFoodList(response.data.data);
            } else {
                console.error("Failed to fetch food list");
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                `${url}/api/cart/get`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
