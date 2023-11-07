import styles from "./StatusScreen.module.scss";

interface StatusScreenProps {
  msg: string;
  status: string;
}

export default function StatusScreen({ msg, status }: StatusScreenProps) {
  return (
    <div className={styles.status_screen}>
      <div>
        <p
          className={
            status == "success" ? styles.msg_success : styles.msg_failure
          }
        >
          {msg}
        </p>{" "}
      </div>
    </div>
  );
}
