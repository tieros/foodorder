import { useFormik } from "formik";
import style from "../components/Cart/CheckoutForm.module.css";
import validations from "../components/Profile/validations";

export default function useInput([{ label }, { type }, { identifiertext }]) {
  const { getFieldProps, errors, touched } = useFormik({});
  const identifier = () => {
    return identifiertext.replace(/['"]+/g, "");
  };
  return (
    <>
      <div className={style.input}>
        <label htmlFor={identifiertext}>{label}</label>
        <input
          id={identifiertext}
          type={type}
          {...getFieldProps(identifiertext)}
          className={errors.identifier && touched.identifier && style.invalid}
        />
      </div>
      {errors.identifier && touched.identifier && (
        <p>{`Please enter a valid ${identifier}`}</p>
      )}
    </>
  );
}
