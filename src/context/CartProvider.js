import React, { useEffect, useState } from "react";
import CartContext from "./CartContext";
import { useContext } from "react";
import UserContext from "./UserContext";
import { addItemtoCart, getCart } from "../services/CartService";
import { toast } from "react-toastify";

const CartProvider = ({ children }) => {

  const { isLogin, userData } = useContext(UserContext);
  const [cart, setCart] = useState(null);
  const [heading, setHeading] = useState("Initial Heading");

  useEffect(() => {
    if(isLogin){
      //getUserCard
      loadUserCart(userData?.userId);
    }
  },[isLogin]);

  //Add Item to Cart
  const addItem= async (quantity, productId)=>{
    try {
      const result = await addItemtoCart(userData.userId, productId, quantity);
      setCart({...result})
    } catch (error) {
      console.log(error);
      toast.error("Error in adding Product in Cart");
    }
  }

  //Load User Cart
  const loadUserCart= async (userId)=>{
    try {
      const cart = await getCart(userId);
      console.log(cart);
      setCart({...cart})
    } catch (error) {
      console.log(error);
      setCart({items:[]})
    }
  }

  return (
    <CartContext.Provider value={{ cart, heading, setHeading, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
