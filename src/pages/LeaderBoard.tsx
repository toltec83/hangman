import styles from "./LeaderBoard.module.scss";
import { LEADERBOARD_URL } from "../constants/constants";
import { Score } from "../types/types";
import withFetch from "../components/withFetch";
import ScoreEntry from "../components/ScoreEntry";
import { Link } from "react-router-dom";

export interface LeaderBoardProps {
  data: Score[];
}

const LeaderBoard = ({ data }: LeaderBoardProps) => {
  function calcScore(entry: Score) {
    return 100 / (1 + entry.errors + Number.EPSILON);
  }

  const entries = data
    .sort((a: Score, b: Score) => {
      if (calcScore(a) > calcScore(b)) {
        return 1;
      } else if (calcScore(a) < calcScore(b)) {
        return -1;
      }
      return 0;
    })
    .reverse();

  //
  return (
    <div className={styles.leaderboard}>
      <h1>Leaderboard</h1>
      <div className={styles.entries}>
        {entries.map((entry: Score, index: number) => (
          <ScoreEntry key={`score_` + index} data={entry} calc={calcScore} />
        ))}
      </div>
      <Link className={styles.back_link} to="/game">
        Back to game
      </Link>
    </div>
  );
};

export default withFetch<LeaderBoardProps, Score[]>(
  LeaderBoard,
  LEADERBOARD_URL
);
