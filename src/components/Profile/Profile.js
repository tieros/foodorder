import { ref, child, get, set } from "firebase/database";
import { database } from "../../Firebase/firebase-config";
import Modal from "../UI/Modal";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import ProfileInfo from "./ProfileInfo";
import LoadingSpinner from "../UI/LoadingSpinner";
import style from "./Profile.module.css";
import FormikForm from "./FormikForm";
import InfoNotification from "./InfoNotification";

export default function Profile(props) {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isSucceed, setIsSucceed] = useState(null);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const dbRef = ref(database);

    get(child(dbRef, `users/${authCtx.userInfo?.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
          setIsLoading(false);
        } else {
          console.log("No data available");
          setUserData(null);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [authCtx.userInfo?.uid]);

  function closeModal() {
    props.onCloseProfile();
  }

  function saveUserInfoHandler(data) {
    // send to Database ./users
    const dbRef = ref(database);
    set(child(dbRef, `users/${authCtx.userInfo.uid}`), {
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
    })
      .then(() => {
        setIsSucceed(true);
        // kapat modal'ı
      })
      .catch((error) => {
        setIsSucceed(false);
        authCtx.makeFormValid(false);
      });
  }
  console.log(authCtx.userInfo);

  return (
    <Modal onClose={props.onCloseProfile}>
      <div className={style.profile}>
        {isLoading && <LoadingSpinner />}
        {userData != null && !isLoading && isSucceed === null && (
          <ProfileInfo
            data={userData}
            onConfirm={saveUserInfoHandler}
            onClose={closeModal}
            dataResponse={setIsSucceed}
          />
        )}
        {userData === null && !isLoading && isSucceed === null && (
          <FormikForm onConfirm={saveUserInfoHandler} onClose={closeModal} />
        )}
        {isSucceed === true ? (
          <InfoNotification type={isSucceed} onClose={closeModal} />
        ) : (
          <InfoNotification type={isSucceed} onClose={closeModal} />
        )}
      </div>
    </Modal>
  );
}
