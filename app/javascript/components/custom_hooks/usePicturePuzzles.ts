import {useState, useEffect} from "react";

import type {PreviewPicturePuzzleType} from "../../types/PreviewPicturePuzzleType"

function isPreviewPicturePuzzle(data: any): data is PreviewPicturePuzzleType {
  return(
    data &&
    typeof data.id === "number" &&
    typeof data.title === "string" &&
    typeof data.imageSrc === "string"
  )
}

function isPreviewPicturePuzzleArray(data: any): data is PreviewPicturePuzzleType[] {
  return(
    Array.isArray(data) && data.every(isPreviewPicturePuzzle)
  )
}

const usePicturePuzzles = () => {
  const [picturePuzzles , setPicturePuzzles ] = useState<PreviewPicturePuzzleType[]>([]);
  const [error, setError] = useState<Error|null>(null);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const url = "/api/v1/picture_puzzles"
    
    fetch(url, {signal})
    .then((response) => {
      if(!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((response) => {
      if(!isPreviewPicturePuzzleArray(response)) {
        throw Error("Invalid picture puzzle preview data from API")
      }
      setPicturePuzzles(response);
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

  return { picturePuzzles, error, isLoading }
}

export default usePicturePuzzles;