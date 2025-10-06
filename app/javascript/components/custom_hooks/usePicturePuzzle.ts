import {useState, useEffect} from "react";

import type { PuzzleType } from "../../types/PuzzleType";
import type { TargetNameObjectType } from "../../types/TargetNameObjectType";

function isTargetNameObject(data: any): data is TargetNameObjectType {
  return (
    data &&
    typeof data === "object" &&
    typeof data.name === "string"
  )
}

function isPuzzle(data:any): data is PuzzleType {
  return(
    data &&
    typeof data.id === "number" &&
    typeof data.title === "string" &&
    typeof data.imageSrc === "string" &&
    typeof data.taskDescription=== "string" &&
    typeof data.resolutionWidth === "number" &&
    typeof data.resolutionHeight === "number" &&
    Array.isArray(data.targets) && data.targets.every(isTargetNameObject) &&
    typeof data.createdAt === "string" &&
    typeof data.updatedAt === "string"
  )
}

const usePicturePuzzle = (paramsId: string) => {
  const [puzzle , setPuzzle ] = useState<PuzzleType|null>(null);
  const [error, setError] = useState<Error|null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    const url = `/api/v1/picture_puzzles/${paramsId}`
    
    fetch(url, {signal})
    .then((response) => {
      if(!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((response) => {
      if (!isPuzzle(response)) {
        throw Error("Invalid puzzle data from API.")
      }
      setPuzzle(response);
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

  }, [paramsId])

  return { puzzle, error, isLoading }
}

export default usePicturePuzzle;