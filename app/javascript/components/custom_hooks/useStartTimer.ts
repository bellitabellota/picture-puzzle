import {useEffect, useState} from "react";

const useStartTimer = (puzzle, paramsId) => {
  const [startTimerError, setStartTimerError] = useState(null); 

  useEffect(()=> {
    if(puzzle ) {
      const url = `/api/v1/puzzle_timers/${paramsId}/start_timer`;
      const token = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]').content;

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