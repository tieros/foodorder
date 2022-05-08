import classes from "./Profile.module.css";
import okImg from "../../assets/ok.png";
import CancelButton from "../UI/CancelButton";

export default function InfoNotification(props) {
  let notificationContent;

  if (props.type === true) {
    notificationContent = (
      <>
        <img src={okImg} alt="Success icon" />
        <h1>Changes saved successfully !</h1>
      </>
    );
  } else if (props.type === false) {
    notificationContent = <h1>Something went wrong!</h1>;
  } else if (props.type === null) {
    return <></>;
  }
  return (
    <div className={classes.successContainer}>
      <div className={classes.cancelButtonContainer}>
        <CancelButton
          onClick={props.onClose}
          className={classes.cancelButton}
        />
      </div>
      <div className={classes.successContent}>{notificationContent}</div>
    </div>
  );
}
