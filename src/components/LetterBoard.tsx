import withFetch from "./withFetch";
import styles from "./LetterBoard.module.scss";
import { QUOTE_URL } from "../constants/constants";
import { isLetter } from "../utils/functions";
import { Quote } from "../types/types";
import { Character } from "./Character";
import Letter from "./Character";
import { useSelector, useDispatch } from "react-redux";
import { startGame } from "../store/hangmanSlice";
import { useEffect } from "react";
import { RootState } from "../store/store";

export interface LetterBoardProps {
  data: Quote;
}

const LetterBoard = ({ data }: LetterBoardProps) => {
  const { _id, content } = data;
  const dispatch = useDispatch();
  const { quote, guesses } = useSelector((state: RootState) => state.hangman);

  useEffect(() => {
    dispatch(startGame({ content: content, quoteId: _id }));
  }, []);

  //
  return (
    <div className={styles.letterboard}>
      {quote.content.split(" ").map((word: string, wIndex: number) => (
        <span key={`word_${wIndex}`} className={styles.letterboard_word}>
          {word
            .split("")
            .map((letter: string, lIndex: number) =>
              isLetter(letter) ? (
                <Letter
                  key={`letter_${wIndex}${lIndex}`}
                  letter={letter}
                  revealed={guesses.includes(letter.toUpperCase())}
                />
              ) : (
                <Character key={`letter_${wIndex}${lIndex}`} letter={letter} />
              )
            )}{" "}
        </span>
      ))}
    </div>
  );
};

export default withFetch<LetterBoardProps, Quote>(LetterBoard, QUOTE_URL);
