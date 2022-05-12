import { ref, child, get, set } from "firebase/database";
import { database } from "../../Firebase/firebase-config";
import Modal from "../UI/Modal";
import { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo";
import LoadingSpinner from "../UI/LoadingSpinner";
import style from "./Profile.module.css";
import FormikForm from "./FormikForm";
import InfoNotification from "./InfoNotification";
import { useSelector } from "react-redux";

export default function Profile(props) {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isSucceed, setIsSucceed] = useState(null);

  const userInfo = useSelector(state => state.auth.userInfo)

  useEffect(() => {
    const dbRef = ref(database);

    get(child(dbRef, `users/${userInfo?.uid}`))
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
  }, [userInfo?.uid]);

  function closeModal() {
    props.onCloseProfile();
  }

  function saveUserInfoHandler(data) {
    // send to Database ./users
    const dbRef = ref(database);
    set(child(dbRef, `users/${userInfo.uid}`), {
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
      });
  }
  console.log(userInfo);

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
