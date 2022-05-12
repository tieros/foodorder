import classes from "./Profile.module.css";
import CancelButton from "../UI/CancelButton";
import { useFormik } from "formik";
import validations from "./validations";
import AuthService from "../../services/auth";

const FormikForm = (props) => {
  
  const { handleSubmit, errors, isValid, touched, getFieldProps, values } =
    useFormik({
      initialValues: {
        name: "",
        surname: "",
        email: "",
        password: "",
        passwordConfirm: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
      },
      onSubmit: () => {
        props.onConfirm(values);
      },
      validationSchema: validations,
      validateOnMount: true,
    });
  const logoutHandler = () => {
    AuthService.logoutHandler();
    props.onClose();
  };

  return (
    <>
      <div className={classes.cancelButtonContainer}>
        <CancelButton
          onClick={props.onClose}
          className={classes.cancelButton}
        />
      </div>
      <form onSubmit={handleSubmit} className={classes.formContainer}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          {...getFieldProps("name")}
          className={errors.name && touched.name && classes.invalid}
        />
        {errors.name && touched.name && (
          <p className={classes.errorMsg}>Please enter a valid name</p>
        )}
        <label htmlFor="surname">Last Name</label>
        <input
          id="surname"
          type="text"
          {...getFieldProps("surname")}
          className={errors.surname && touched.surname && classes.invalid}
        />
        {errors.surname && touched.surname && (
          <p>Please enter a valid surname</p>
        )}
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="text"
          {...getFieldProps("phone")}
          className={errors.phone && touched.phone && classes.invalid}
        />
        {errors.phone && touched.phone && (
          <p>Please enter a valid phone number (7 characters)</p>
        )}
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          {...getFieldProps("address")}
          className={errors.address && touched.address && classes.invalid}
        />
        {errors.address && touched.address && (
          <p>Please enter a valid address)</p>
        )}
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          {...getFieldProps("city")}
          className={errors.city && touched.city && classes.invalid}
        />
        {errors.city && touched.city && <p>Please enter a valid city</p>}
        <label htmlFor="postalCode">Postal Code </label>
        <input
          id="postalCode"
          type="text"
          {...getFieldProps("postalCode")}
          className={errors.postalCode && touched.postalCode && classes.invalid}
        />
        {errors.postalCode && touched.postalCode && (
          <p>Please enter a valid postal code (5 characters)</p>
        )}
        <button type="submit" disabled={!isValid} className={classes.button}>
          Submit
        </button>
        <button type="button" onClick={logoutHandler}>
          Logout
        </button>
      </form>
    </>
  );
};

export default FormikForm;
