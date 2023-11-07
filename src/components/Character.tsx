import Letter from "./Letter";
import styles from "./Character.module.scss";

export interface LetterProps {
  letter: string;
  isAlphabet?: boolean;
  revealed?: boolean;
}

export const Character = ({
  letter,
  isAlphabet = false,
  revealed = true,
}: LetterProps) => {
  return (
    <span
      className={[
        styles.character,
        isAlphabet && styles.alphabet,
        revealed && styles.revealed,
      ].join(" ")}
    >
      <span className={styles.letter}>
        {letter}
      </span>
    </span>
  );
};

export default Letter(Character);
