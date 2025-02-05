import { assets } from "../../assets/assets"
import { StoreContext } from "../../context/StoreContext"
import "./FoodItem.css"
import { useContext, useState } from "react"

const FoodItem = ({ id, name, price, description, img }) => {

    const { cartItems, addToCart, removeFromCart ,url } = useContext(StoreContext)

    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <img className="food-item-image" src={url+"/images/"+img} />
                {
                    !cartItems[id] ? <img className="add" onClick={() => addToCart(id)} src={assets.add_icon_white} /> :
                        <div className="food-item-counter" >
                            <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="remove iteam " />
                            <p>{cartItems[id]}</p>
                            <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="add iteam" />
                        </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="food-item-rating" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    )
}

export default FoodItem
