import {useEffect, useState} from "react";

import type { PuzzleType } from "../../types/PuzzleType";
import type { IdentifiedTargetType } from "../../types/IdentifiedTargetType";

const useGameState = (puzzle: PuzzleType, correctlyIdentifiedTargets: IdentifiedTargetType[], paramsId: string) => {
  console.log(puzzle)
  
  const [secondsToCompletion, setSecondsToCompletion] = useState(null);
  const [gameStateError, setGameStateError] = useState(null);

  useEffect(() => {
    if (puzzle && (correctlyIdentifiedTargets.length === puzzle.targets.length)) {
      const url = `/api/v1/puzzle_validations/${paramsId}/game_state`

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