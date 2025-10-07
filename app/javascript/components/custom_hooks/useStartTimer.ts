import {useEffect, useState} from "react";

import type { PuzzleType } from "../../types/PuzzleType"

const useStartTimer = (puzzle: PuzzleType | null, paramsId: string) => {

  const [startTimerError, setStartTimerError] = useState<Error|null>(null); 

  useEffect(()=> {
    if(puzzle ) {
      const url = `/api/v1/puzzle_timers/${paramsId}/start_timer`;
      const metaTag = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]');
      const token = metaTag?.content;

      if (!token) {
        throw Error("CSRF token not found in document");
        return;
      }      

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token
        }
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.error || `HTTP Error ${response.status}: ${response.statusText}`);
          });
        }
      })
      .catch((error) => setStartTimerError(error));
    }
  }, [puzzle])

  return {startTimerError}
}

export default useStartTimer;