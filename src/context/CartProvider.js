import React, { useEffect, useState } from "react";
import CartContext from "./CartContext";
import { useContext } from "react";
import UserContext from "./UserContext";
import {
  addItemtoCart,
  clearCart,
  getCart,
  removeItemsFromCart,
} from "../services/CartService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartProvider = ({ children }) => {
  const { isLogin, userData } = useContext(UserContext);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (isLogin) {
      //getUserCard
      loadUserCart(userData?.userId);
    } else {
      setCart(null);
    }
  }, [isLogin]);

  //Add Item to Cart
  const addItem = async (quantity, productId, next) => {
    try {
      if (!isLogin) {
        const mySwal = withReactContent(Swal);
        mySwal.fire({
          title: "Not Logged In",
          html: <>
          <Alert variant="danger" className="border border-0">You need to Login First Inorder to add Product to Cart</Alert>
          </>,
          icon: "error",
        }).then(()=>{

        });
        return;
      }

      const result = await addItemtoCart(userData.userId, productId, quantity);
      setCart({ ...result });
      next();
      // if (quantity > 1) {
      //   toast.success("Quantity Updated");
      // } else {
      //   toast.success("Item added to cart");
      // }
    } catch (error) {
      console.log(error);
      toast.error("Error in adding Product in Cart");
    }
  };

  //Load User Cart
  const loadUserCart = async (userId) => {
    try {
      const cart = await getCart(userId);
      console.log(cart);
      setCart({ ...cart });
    } catch (error) {
      console.log(error);
      setCart({ items: [] });
    }
  };

  //remove item from cart
  const removeItem = async (itemId) => {
    try {
      const result = await removeItemsFromCart(userData.userId, itemId);
      const newCartItems = cart.items.filter(
        (item) => item.cartItemId !== itemId
      );
      setCart({
        ...cart,
        items: newCartItems,
      });
      toast.success("Item Removed");
    } catch (error) {
      console.log(error);
      toast.error("Error in Removing the Item");
    }
  };

  //clear Cart
  const clearCartofUser = async () => {
    try {
      const result = clearCart(userData.userId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addItem, removeItem, clearCartofUser }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
