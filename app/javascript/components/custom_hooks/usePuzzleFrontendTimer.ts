
import {useState, useEffect, useRef} from "react";

import type { PuzzleType } from "../../types/PuzzleType";

const usePuzzleFrontendTimer = (puzzle: PuzzleType | null, secondsToCompletion: number | null) => {
  const [secondsPassed, setSecondsPassed] = useState(0);
  const savedIncreaseSecondsPassed = useRef<(() => void) |null>(null);

  function increaseSecondsPassed() {
    setSecondsPassed(secondsPassed + 1);
  }

  useEffect(()=> {
    // saving the increaseSecondsPassed function on every render via useRef 
    // makes sure that when the function is passed into setInterval in the Effect below 
    // always the most recent state of secondsPassed is referenced
    savedIncreaseSecondsPassed.current = increaseSecondsPassed;
  })

  useEffect(()=>{
    let id: number;
    if (secondsToCompletion) return;

    if (puzzle) {
      id = setInterval(() => {savedIncreaseSecondsPassed.current?.()},  1000)
    }

    return () => {
      if (id) {
       
        clearInterval(id);
      }
    }
  }, [puzzle, secondsToCompletion])

  return { secondsPassed }
}

export default usePuzzleFrontendTimer ;