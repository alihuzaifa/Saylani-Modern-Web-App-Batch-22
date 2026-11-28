import { createContext, useState } from "react";
export const CartContext = createContext();
const CartProvider = (props) => {

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    }

    const removeFromCart = (id) => {
        const allProducts = cartItems
        const updatedCartItems = allProducts.filter(cartItem => cartItem.id !== id);
        setCartItems(updatedCartItems);
    }

    return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
        {props.children}
    </CartContext.Provider>

}


export default CartProvider;