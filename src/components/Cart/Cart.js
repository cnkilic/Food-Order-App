import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import FormCheckout from "./FormCheckOut";

const Cart = (props) => {
  const [formOpen, setFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorPost, setErrorPost] = useState();
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const formOpenHandler = () => {
    setFormOpen(true);
  };

  const postRequestHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://react-http-2668b-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          header: "deneme",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong during Posting !!!");
      }
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (error) {
      setErrorPost(error.message);
    }

    setIsSubmitting(false);
  };

  //During the order ,adding items to list vs. vs.
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {formOpen === true ? (
        <FormCheckout onConfirm={postRequestHandler} onCancel={props.onClose} />
      ) : (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button onClick={formOpenHandler} className={classes.button}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  //During the submition to the backend
  const isSubmittingModalContent = <p>Sending order data...</p>;

  //After  the successfuly submition to the backend
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Succesfully sent the order ✅ All your informations saved to the Database ✅ </p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  //if  ERROR occures during the submition to the backend
  const errorModalContent = <p>{errorPost}</p>;

  /*  if (!isSubmitting && didSubmit) {
    
  } */

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && !errorPost && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
      {!isSubmitting && errorPost && errorModalContent}
    </Modal>
  );
};

export default Cart;
