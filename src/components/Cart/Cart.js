import { useContext, useState, useEffect } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { AuthContext } from "../../store/auth-context";
import { database } from "../../Firebase/firebase-config";
import { ref, child, get, set } from "firebase/database";

const dbRef = ref(database);

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [userData, setUserData] = useState(null);
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  useEffect(() => {
    get(child(dbRef, `users/${authCtx.userInfo?.uid}`)).then((snapshot) => {
      if (snapshot.exists) {
        authCtx.makeFormValid(true);
        console.log(authCtx.canOrder);
        setUserData(snapshot.val());
      }
    });
  }, []);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const submitOrderHandler = async () => {
    if (!authCtx.canOrder) {
      alert("Please complete your profile information to proceed.");
      // Redirect to Profile
      return;
    }
    setIsSubmitting(true);
    console.log(userData);

    await set(child(dbRef, `orders/${authCtx.userInfo.uid}/`), {
      userData,
      ordereditems: cartCtx.items,
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
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

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={submitOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button
          className={classes.button}
          onClick={() => {
            props.onCloseCart();
            window.location.reload();
          }}
        >
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
