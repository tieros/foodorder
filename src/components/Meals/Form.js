import Input from "../UI/Input";
import style from "./Form.module.css";
import { useRef, useState } from "react";

export default function Form(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    // addtocart diye bir func var ona göndericez bu amountı
    // cart sadece amount'tan oluşmuyor, o yüzden bu submit işini başka componentta yapcaz
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={style.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
        }}
      />

      <button> + Add</button>
      {!amountIsValid && <p> Please enter amount between 1- 5</p>}
    </form>
  );
}
