import { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { database } from "../../Firebase/firebase-config";
import { ref, child, get, set } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/slices";

const dbRef = ref(database);

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const userInfo = useSelector(state => state.auth.userInfo);
  const items = useSelector(state => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const dispatch = useDispatch();

  const totalAmountUpdated = `$${totalAmount.toFixed(2)}`;
  const hasItems = items.length > 0;

  useEffect(() => {
    get(child(dbRef, `users/${userInfo?.uid}`)).then((snapshot) => {
      if (snapshot.exists) {
        setUserData(snapshot.val());
      }
    });
  }, []);

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItem(id))
  };

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItem(item));
  };

  const submitOrderHandler = async () => {
    setIsSubmitting(true);
    console.log(userData);

    await set(child(dbRef, `orders/${userInfo.uid}/`), {
      userData,
      ordereditems: items,
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    dispatch(cartActions.clearCart())
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
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
        <span>{totalAmountUpdated}</span>
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
