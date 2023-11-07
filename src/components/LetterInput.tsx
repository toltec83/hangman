import { useDispatch, useSelector } from "react-redux";
import { ALPHABET_LETTERS } from "../constants/constants";
import styles from "./LetterInput.module.scss";
import { makeGuess } from "../store/hangmanSlice";
import { useEffect, useRef } from "react";

const LetterInput = () => {
  const { guesses } = useSelector(
    (state: any) => state.hangman
  );
  const dispatch = useDispatch();
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const handleGuess = (evt: MouseEvent) => {
      const button = evt.target as HTMLButtonElement;
      const letter = button.getAttribute('data-letter');
      if (letter && !guesses.includes(letter)) {
        dispatch(makeGuess(letter));
      }
    };

    const buttonRefsCurrent = buttonRefs.current;

    Object.keys(buttonRefsCurrent).forEach((letter) => {
      const button = buttonRefsCurrent[letter];
        button?.addEventListener("click", handleGuess);
    });

    return () => {
      Object.keys(buttonRefsCurrent).forEach((letter) => {
        const button = buttonRefsCurrent[letter];
          button?.removeEventListener("click", handleGuess);
      });
    };
  }, [guesses, dispatch]);



  return (
    <div className={styles.letter_input}>
      {ALPHABET_LETTERS.toUpperCase()
        .split("")
        .map((letter: string) => (
          <button
            key={letter}
            data-letter={letter}
            ref={(el) => (buttonRefs.current[letter] = el)}
            disabled={guesses.includes(letter)}
          >
            {letter}
          </button>
        ))}
    </div>
  );
};

export default LetterInput;
