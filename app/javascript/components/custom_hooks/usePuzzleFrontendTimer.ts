
import {useState, useEffect, useRef} from "react";

const usePuzzleFrontendTimer = (puzzle, secondsToCompletion) => {
  const [secondsPassed, setSecondsPassed] = useState(0);
  const savedIncreaseSecondsPassed = useRef(null);

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
    let id;
    if (secondsToCompletion) return;

    if (puzzle) {
      id = setInterval(() => {savedIncreaseSecondsPassed.current()},  1000)
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