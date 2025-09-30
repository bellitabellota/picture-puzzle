import {useEffect, useState} from "react";

const useValidateGuess = (selectedName, setSelectedName, paramsId, clickedCoordinates, incorrectMessage, setIncorrectMessage) => {
  const [correctlyIdentifiedTargets, setCorrectlyIdentifiedTargets] = useState([]);
  const [validationError, setValidationError] = useState(null);

  useEffect(()=>{
    if (!selectedName) return;

    const url = `/api/v1/puzzle_validations/${paramsId}/validate_guess`
    const token = document.querySelector('meta[name="csrf-token"]').content;
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
      if (data.success === true && !correctlyIdentifiedTargets.includes(data.target)) {
        setCorrectlyIdentifiedTargets([...correctlyIdentifiedTargets, data.target]);
      } else {
        setIncorrectMessage(data.message);
      }
      setSelectedName(null);
    }).catch(error => { setValidationError(error)})
  }, [selectedName])

  return {incorrectMessage, correctlyIdentifiedTargets, validationError}
}

export default useValidateGuess;