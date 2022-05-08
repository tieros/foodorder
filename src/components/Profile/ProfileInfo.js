import { useState, useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { database } from "../../Firebase/firebase-config";
import { ref, child, update } from "firebase/database";
import CancelButton from "../UI/CancelButton";
import classes from "./Profile.module.css";
import InfoNotification from "./InfoNotification";

let style;

export default function ProfileInfo(props) {
  const { address, name, surname, phone, postalCode, city } = props.data;

  const [enteredName, setEnteredName] = useState(name);
  const [enteredSurname, setEnteredSurname] = useState(surname);
  const [enteredPhone, setEnteredPhone] = useState(phone);
  const [enteredAddress, setEnteredAddress] = useState(address);
  const [enteredPostalcode, setEnteredPostalcode] = useState(postalCode);
  const [enteredCity, setEnteredCity] = useState(city);

  // save changes states:

  const [editVersion, setEditVersion] = useState(false);

  const authCtx = useContext(AuthContext);

  let component;
  function editEnable() {
    setEditVersion(true);
  }
  if (!editVersion) {
    style = { cursor: "default", border: "none" };
  } else {
    style = {
      cursor: "pointer",
      borderWidth: "1px",
      borderStyle: "dashed",
      borderColor:
        "-internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))",
    };
  }

  function sendData(event) {
    event.preventDefault();
    const dbRef = ref(database);
    update(child(dbRef, `users/${authCtx.userInfo.uid}`), {
      name: enteredName,
      surname: enteredSurname,
      phone: enteredPhone,
      address: enteredAddress,
      city: enteredCity,
      postalCode: enteredPostalcode,
    })
      .then(() => {
        props.dataResponse(true);
        component = <InfoNotification />;
      })
      .catch(() => {
        props.dataResponse(false);
        component = <InfoNotification />;
      });
  }

  const logoutHandler = () => {
    authCtx.logout();
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
      <form className={classes.formContainer}>
        <div>
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            placeholder={name}
            style={style}
            disabled={!editVersion ? "disabled" : ""}
            value={enteredName}
            onChange={(event) => setEnteredName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Surname :</label>
          <input
            type="text"
            placeholder={surname}
            style={style}
            disabled={!editVersion ? "disabled" : ""}
            value={enteredSurname}
            onChange={(event) => setEnteredSurname(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Phone :</label>
          <input
            type="text"
            placeholder={phone}
            style={style}
            disabled={!editVersion ? "disabled" : ""}
            value={enteredPhone}
            onChange={(event) => setEnteredPhone(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Address :</label>
          <input
            type="text"
            placeholder={address}
            style={style}
            disabled={!editVersion ? "disabled" : ""}
            value={enteredAddress}
            onChange={(event) => setEnteredAddress(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">City :</label>
          <input
            type="text"
            placeholder={city}
            style={style}
            disabled={!editVersion ? "disabled" : ""}
            value={enteredCity}
            onChange={(event) => setEnteredCity(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Postal Code :</label>
          <input
            type="text"
            placeholder={postalCode}
            style={style}
            disabled={!editVersion ? "disabled" : ""}
            value={enteredPostalcode}
            onChange={(event) => setEnteredPostalcode(event.target.value)}
          />
        </div>
      </form>
      {!editVersion && (
        <button onClick={editEnable} className={classes.editBtn}>
          Edit Your Information
        </button>
      )}
      {editVersion && (
        <button onClick={sendData} className={classes.editBtn}>
          Save Changes
        </button>
      )}
      <button onClick={logoutHandler} className={classes.logoutBtn}>
        Logout
      </button>
    </>
  );
}
