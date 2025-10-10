import {useEffect, useState} from "react";

import type { PuzzleType } from "../../types/PuzzleType";
import type { IdentifiedTargetType } from "../../types/IdentifiedTargetType";

type APIResponse = {gameFinished: true, secondsToCompletion: number} | {gameFinished: false};

function isAPIResponse(data:any): data is APIResponse {
  return (
    (
      data && 
      data.gameFinished === true && 
      typeof data.secondsToCompletion === "number"
    ) 
    ||
    (
      data && 
      data.gameFinished === false
    )
  )
}

const useGameState = (puzzle: PuzzleType | null, correctlyIdentifiedTargets: IdentifiedTargetType[], paramsId: string) => {
  const [secondsToCompletion, setSecondsToCompletion] = useState(null);
  const [gameStateError, setGameStateError] = useState<Error | null>(null);

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
        if(!isAPIResponse(data)) {
          throw Error ("Invalid game state response from API.")
        }
        if (data.gameFinished === true) {
          setSecondsToCompletion(data.secondsToCompletion);
        }
      }).catch(error => setGameStateError(error));
    }
  }, [correctlyIdentifiedTargets])

  return {secondsToCompletion, gameStateError}
}

export default useGameState;