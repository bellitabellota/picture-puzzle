import {useEffect, useState} from "react";
import type {PuzzleResultType} from "../../types/PuzzleResultType"

type PuzzleResultsWithPuzzleTitle = {
  puzzleTitle: string,
  results: PuzzleResultType[]
}

function isPuzzleResult(data: any): data is PuzzleResultType {
  return(
    data &&
    typeof data.id === "number" &&
    typeof data.name === "string" &&
    typeof data.secondsToCompletion === "number"
  )
}

function isPuzzleResultArray(data: any): data is PuzzleResultType[] { return(Array.isArray(data) && data.every(element => isPuzzleResult(element)))
}

function isPuzzleResultsWithPuzzleTitle(data:any): data is PuzzleResultsWithPuzzleTitle {
  return(data &&
    typeof data.puzzleTitle === "string" &&
    isPuzzleResultArray(data.results)
  )
}

const usePuzzleResults = (paramsId: string) => {
  const [puzzleResults, setPuzzleResults] = useState([]);
  const [puzzleTitle, setPuzzleTitle] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const url =`/api/v1/picture_puzzles/${paramsId}/results`;
    fetch(url, {signal})
    .then((response) => {
      if(!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`)
      }
      return response.json()
    }).then((data) => {

      if(!isPuzzleResultsWithPuzzleTitle(data)) {
        throw Error("Invalid puzzle result data returned from API.")
      }

      setPuzzleTitle(data.puzzleTitle);
      setPuzzleResults(data.results);
    }).catch((error) => {
      if (error.name !== "AbortError") {
        setError(error);
      }
    }).finally(() => {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    })

    return () => controller.abort(); // the cleanup function was added because the effect runs when the component mounts. So in case the component unmount before the request completes, the request would have been still active but the component would not be there anymore to handle the response.
  }, [])

  return {puzzleResults, puzzleTitle, error, isLoading}

}

export default usePuzzleResults;