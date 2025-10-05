import {useState, useEffect} from "react";

import type { NavigateFunction } from "react-router-dom";

const usePostResult = (playerName: string, navigate: NavigateFunction, paramsId: string) => {
  const [saveResultError, setSaveResultError] = useState(null);
  const [resultSaved, setResultSaved] = useState(false);

  useEffect(() => {
    if(!playerName) return;
    const url = `/api/v1/picture_puzzles/${paramsId}/results`;
    const token = document.querySelector<HTMLMetaElement>('meta[name="csrf-token').content

    const body = {puzzle_result: {player_name: playerName}}

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token
      },
      body: JSON.stringify(body)
    }).then((response) => {
      
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || `HTTP Error ${response.status}: ${response.statusText}`);
        });
      }

      return response.json();
    }).then(()=> { 
      setResultSaved(true);
    })
    .catch((error) => {setSaveResultError(error)})
  }, [playerName, navigate])

  return { resultSaved, saveResultError }
}

export default usePostResult; 