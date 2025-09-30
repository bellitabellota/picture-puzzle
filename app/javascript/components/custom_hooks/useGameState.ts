import {useEffect, useState} from "react";

const useGameState = (puzzle, correctlyIdentifiedTargets, paramsId) => {
  const [secondsToCompletion, setSecondsToCompletion] = useState(null);
  const [gameStateError, setGameStateError] = useState(null);

  useEffect(() => {
    if (puzzle && (correctlyIdentifiedTargets.length === puzzle.targets.length)) {
      const url = `/api/v1/puzzle_validations/${paramsId}/game_state`
      const token = document.querySelector('meta[name="csrf-token"]').content;

      fetch(url)
      .then((response) => {
        if(!response.ok) {
          throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }
        return response.json()
      }).then((data) => {
        if (data.gameFinished === true) {
          setSecondsToCompletion(data.secondsToCompletion);
        }
      }).catch(error => setGameStateError(error));
    }
  }, [correctlyIdentifiedTargets])

  return {secondsToCompletion, gameStateError}
}

export default useGameState;