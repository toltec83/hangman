import styles from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
  msg: string;
}

export default function ErrorMessage({ msg }: ErrorMessageProps) {
  return (
    <div className={styles.error_message}>
      <div>
        <p className={msg}>{msg}</p>
      </div>
    </div>
  );
}
