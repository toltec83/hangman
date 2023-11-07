import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Game.module.scss";
import {
  ERRORS_MAX,
  FAILED_TIMEOUT,
  POST_RESULT_URL,
} from "../constants/constants";
import { RootState } from "../store/store";
import LetterBoard from "../components/LetterBoard";
import LetterInput from "../components/LetterInput";
import StatusScreen from "../components/StatusScreen";
import { isLetter } from "../utils/functions";
import axios from "axios";
import { resetGame as resetHangman } from "../store/hangmanSlice";
import { useNavigate } from "react-router-dom";

function Game() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [submitError, setSubmitError] = useState("");
  const [secsLeft, setSecsLeft] = useState(FAILED_TIMEOUT);
  const [resetIndex, setResetIndex] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const resetBtnRef = useRef<HTMLButtonElement | null>(null);
  const {
    attempts: attemptsLeft,
    quote,
    guesses,
  } = useSelector((state: RootState) => state.hangman);

  //
  const uniqueLetters = useMemo(() => {
    return new Set(
      quote.content
        .toUpperCase()
        .split("")
        .filter((letter: string) => isLetter(letter))
    ).size;
  }, [quote]);
  //

  const { name } = useSelector((state: RootState) => state.user);

  const hasWon =
    guesses.length > 0 &&
    uniqueLetters === guesses.length - ERRORS_MAX + attemptsLeft;

  const hasLost = attemptsLeft <= 0;

  function resetGame() {
    setResetIndex(resetIndex + 1);
    setTimeout(() => {
      setSecsLeft(FAILED_TIMEOUT);
    }, 1000);
  }

  useEffect(() => {
    name === "" && navigate("/");
  }, [name]);

  useEffect(() => {
    setStartTime(Date.now());
    const resetBtnRefCurrent = resetBtnRef.current;
    resetBtnRefCurrent?.addEventListener("click", resetGame);
    return () => {
      resetBtnRefCurrent?.removeEventListener("click", resetGame);
    };
  }, [resetIndex]);

  useEffect(() => {
    if (hasLost) {
      setTimeout(() => {
        setSecsLeft(secsLeft - 1);
      }, 1000);
    }
    secsLeft === 0 && resetGame();
  }, [attemptsLeft, secsLeft]);

  useEffect(() => {
    const submitScore = async () => {
      try {
        await axios.post(POST_RESULT_URL, {
          quoteId: quote.quoteId,
          uniqueCharacters: uniqueLetters,
          length: quote.content.split("").filter((x: string) => isLetter(x))
            .length,
          errors: ERRORS_MAX - attemptsLeft,
          userName: name,
          duration: Date.now() - startTime,
        });
        dispatch(resetHangman());
        navigate("/leaderboard");
      } catch (err: any) {
        setSubmitError(
          err.message ||
            "There has been an error submitting your score. Please try later!"
        );
      }
    };

    hasWon && submitScore();
  }, [hasWon]);

  return (
    <div>
      <p className={styles.attempts_left}>
        Wrong attempts left:
        <br />
        <span className={styles.attempts_num}>{attemptsLeft}</span>
      </p>
      <LetterBoard key={`board_${resetIndex}`} />
      <LetterInput />
      <div className={styles.btn_container}>
        <button className={styles.reset_btn} ref={resetBtnRef}>
          Reset game
        </button>
      </div>
      {hasWon && (
        <StatusScreen key={`status`} status={"success"} msg={`loading...`} />
      )}
      {hasLost && (
        <StatusScreen
          key={`status${secsLeft}`}
          status={"failure"}
          msg={`Game will restart in ${secsLeft}`}
        />
      )}
      {submitError !== "" && (
        <StatusScreen
          key={`status`}
          status={"failure"}
          msg={`${submitError}. Please try again later!`}
        />
      )}
    </div>
  );
}

export default Game;
