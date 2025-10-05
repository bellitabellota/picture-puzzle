import {useEffect, useState} from "react";

import type { ClickedCoordinatesType } from "../../types/ClickedCoordinatesType";

const useValidateGuess = (selectedName:string|null, setSelectedName:(a:string|null)=> void, paramsId: string, clickedCoordinates:ClickedCoordinatesType|null, setIncorrectMessage:(a:string|null)=>void) => {

  const [correctlyIdentifiedTargets, setCorrectlyIdentifiedTargets] = useState([]);
  const [validationError, setValidationError] = useState(null);
  console.log(correctlyIdentifiedTargets)
  console.log(correctlyIdentifiedTargets.length)
  useEffect(()=>{
    if (!selectedName) return;

    const url = `/api/v1/puzzle_validations/${paramsId}/validate_guess`
    const token = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]').content;
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

      const alreadyIdentified = correctlyIdentifiedTargets.some(
        target => target.name === data.target.name
      );

      if (data.success === true && !alreadyIdentified) {
        setCorrectlyIdentifiedTargets([...correctlyIdentifiedTargets, data.target]);
      } else {
        setIncorrectMessage(data.message);
      }
      setSelectedName(null);
    }).catch(error => { setValidationError(error)})
  }, [selectedName])

  return {correctlyIdentifiedTargets, validationError}
}

export default useValidateGuess;