import { useEffect, useRef, useState } from "react";
import styles from "./UserLogin.module.scss";
import { useNavigate } from "react-router-dom";
import { USERNAME_MIN } from "../constants/constants";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const loginRef = useRef<HTMLButtonElement | null>(null);
  const userNameRef = useRef<HTMLInputElement | null>(null);

  function checkUsername() {
    if (userNameRef.current!.value.length >= USERNAME_MIN) {
      dispatch(setUser(userNameRef.current!.value));
      navigate("/game");
    } else {
      setError(
        `Please enter a username with ${USERNAME_MIN} or more characters`
      );
    }
  }

  useEffect(() => {
    loginRef.current?.addEventListener("click", checkUsername);
    return () => {
      loginRef.current?.removeEventListener("click", checkUsername);
    };
  }, []);
  //
  return (
    <div className={styles.login}>
      <div className={styles.inputs}>
        <input ref={userNameRef} placeholder="Enter you username" />
        {error !== "" && <p className={styles.error_msg}>{error}</p>}
        <button ref={loginRef}>Proceed to game</button>
      </div>
    </div>
  );
};

export default UserLogin;
