import style from "./MealItem.module.css";
import Form from "./Form";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

export default function MealItem(props) {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount, //parametre olarak gelen amount
      price: props.price,
    });
  };
  return (
    <li className={style.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={style.description}>{props.description}</div>
        <div className={style.price}>{price}</div>
      </div>
      <div>
        <Form id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}
