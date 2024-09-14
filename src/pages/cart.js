import Base from "../components/Base";
import React, { useContext } from "react";
import CartContext from "../context/CartContext";

const Cart = () => {

    const { item } = useContext(CartContext);
  return (
    <Base>
      <div>This is Cart { item}</div>
    </Base>
  );
};

export default Cart;
