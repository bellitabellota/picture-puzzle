import {useEffect, useState} from "react";

import type { ClickedCoordinatesType } from "../../types/ClickedCoordinatesType";
import type { IdentifiedTargetType } from "../../types/IdentifiedTargetType";

function isIdentifiedTarget(data:any): data is IdentifiedTargetType {
  return(
    typeof data.name === "string" &&
    typeof data.xCenter === "number" &&
    typeof data.yCenter === "number"
  )
}

type APIResponse = {
  success: true
  message: string
  target: {
    name: string
    xCenter: number
    yCenter: number
  }
} | {
  success: false
  message: string
}

function isValidAPIResponse(data: any): data is APIResponse {
  if (!data || typeof data !== "object") return false;

  if (data.success === true) {
  return (
  typeof data.message === "string" &&
  typeof data.target === "object" &&
  isIdentifiedTarget(data.target)
  );
  }

  if (data.success === false) {
  return typeof data.message === "string" && data.target === undefined;
  }

  return false;
}

const useValidateGuess = (selectedName:string|null, setSelectedName:(a:string|null)=> void, paramsId: string, clickedCoordinates: ClickedCoordinatesType | null, setIncorrectMessage:(a:string|null)=>void) => {

  const [correctlyIdentifiedTargets, setCorrectlyIdentifiedTargets] = useState<IdentifiedTargetType[]>([]);
  const [validationError, setValidationError] = useState<Error | null>(null);

  useEffect(()=>{
    if (!selectedName || !clickedCoordinates) return;

    const url = `/api/v1/puzzle_validations/${paramsId}/validate_guess`
    const metaTag = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]');
    const token = metaTag?.content;

    if (!token) {
      setValidationError(Error("CSRF token not found in document"));
      return;
    }

    const body = {originalX: clickedCoordinates.originalX, originalY: clickedCoordinates.originalY, selectedName}

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token
      },
      body: JSON.stringify(body),
    }).then((response) => {

      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || `HTTP Error ${response.status}: ${response.statusText}`);
        });
      }

      return response.json()

    }).then((data) => {
      if(!isValidAPIResponse(data)) {
        throw Error("Invalid API response.")
      }

      if (data.success === true) {
        const alreadyIdentified = correctlyIdentifiedTargets.some(
          target => target.name === data.target.name
        );

        if(!alreadyIdentified) {
          setCorrectlyIdentifiedTargets([...correctlyIdentifiedTargets, data.target]);
        } else {
          setIncorrectMessage("The target was already identified.");
        }       
      } else {
        setIncorrectMessage(data.message);
      }
      setSelectedName(null);
    }).catch(error => { setValidationError(error)})
  }, [selectedName])

  return {correctlyIdentifiedTargets, validationError}
}

export default useValidateGuess;