import {useState, useEffect} from "react";

const usePicturePuzzle = (paramsId: string) => {
  const [puzzle , setPuzzle ] = useState(null);
  const [error, setError] = useState(null);
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
      setPuzzle({...response,
        imageSrc: response.image_src,
        taskDescription: response.task_description
      });
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