import styles from "./ScoreEntry.module.scss";
import { Score } from "../types/types";

interface ScoreEntryProps {
  data: Score;
  calc:Function;
}

export const ScoreEntry = ({ data, calc }: ScoreEntryProps) => {
  const { userName } = data;
  return (
    <div className={styles.score_entry}>
      <span className={styles.name}>{userName}</span>
      <span className={styles.score}>{calc(data).toFixed(2)}</span>
    </div>
  );
};

export default ScoreEntry;
