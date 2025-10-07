import {useState, useEffect} from "react";

const usePostResult = (playerName: string | null, paramsId: string) => {
  const [saveResultError, setSaveResultError] = useState<Error|null>(null);
  const [resultSaved, setResultSaved] = useState(false);

  useEffect(() => {
    if(!playerName) return;
    const url = `/api/v1/picture_puzzles/${paramsId}/results`;
    const metaTag = document.querySelector<HTMLMetaElement>('meta[name="csrf-token')
    const token = metaTag?.content;

    if (!token) {
      setSaveResultError(Error("CSRF token not found in document"));
      return;
    }

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
  }, [playerName])

  return { resultSaved, saveResultError }
}

export default usePostResult; 