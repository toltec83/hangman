import { ComponentType } from "react";
import { LetterProps } from "./Character";


export default function AlphabetLetter<T>(
  WrappedComponent: ComponentType<T & LetterProps>
) {
  return (props: T & LetterProps) => {
    return (
      <WrappedComponent
        {...(props as T)}
        letter={props.letter}
        revealed={props.revealed}
        isAlphabet={true}
      />
    );
  };
}
