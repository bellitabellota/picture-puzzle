import {useRef, useState} from "react";
import { Link, useParams } from "react-router-dom";
import IncorrectMessage from "./PicturePuzzleChildComponents/IncorrectMessage";
import SelectBoxContainer from "./PicturePuzzleChildComponents/SelectBoxContainer";
import CheckMark from "./PicturePuzzleChildComponents/CheckMark";
import Timer from "./PicturePuzzleChildComponents/Timer";
import RecordTimeModal from "./PicturePuzzleChildComponents/RecordTimeModal";
import usePicturePuzzle from "./custom_hooks/usePicturePuzzle";
import usePuzzleFrontendTimer from "./custom_hooks/usePuzzleFrontendTimer";
import useStartTimer from "./custom_hooks/useStartTimer";
import useValidateGuess from "./custom_hooks/useValidateGuess";
import useGameState from "./custom_hooks/useGameState";

import type {ClickedCoordinatesType} from "../types/ClickedCoordinatesType"

function PicturePuzzle() {
  const params = useParams();

  if (!params.id) {
    throw new Error("Expected route param :id to exist");
  }

  const {puzzle, error, isLoading}  = usePicturePuzzle(params.id);

  const [incorrectMessage, setIncorrectMessage] = useState<string|null>(null);
  const [clickedCoordinates, setClickedCoordinates] = useState<ClickedCoordinatesType | null>(null);
  const [selectedName, setSelectedName] = useState<string|null>(null);

  const {correctlyIdentifiedTargets, validationError} = useValidateGuess(selectedName, setSelectedName, params.id, clickedCoordinates, setIncorrectMessage)
  const {secondsToCompletion, gameStateError} = useGameState(puzzle, correctlyIdentifiedTargets, params.id)
  const {startTimerError} = useStartTimer(puzzle, params.id);
  const {secondsPassed} = usePuzzleFrontendTimer (puzzle, secondsToCompletion);

  const selectBox = useRef<HTMLSelectElement>(null);
  const imgRef = useRef(null);

  function getCoordinates(event: React.MouseEvent<HTMLImageElement>) {
    const img = event.currentTarget;
    const rect = img.getBoundingClientRect();

    const displayedWidth = rect.width;
    const displayedHeight = rect.height;

    const scalingFactorX = displayedWidth / puzzle.resolutionWidth;
    const scalingFactorY = displayedHeight / puzzle.resolutionHeight;

    // Calculate relative click position
    const scaledX = event.clientX - rect.left;
    const scaledY = event.clientY - rect.top;

    // Scale click coordinates back to original resolution
    const originalX = Math.round(scaledX / scalingFactorX);
    const originalY = Math.round(scaledY / scalingFactorY);

    setClickedCoordinates({originalX:originalX, originalY: originalY, scaledX: scaledX, scaledY:scaledY, isSelecting: true})
  }

  function selectName() {
    const selectedTargetName = selectBox.current.value;
    setSelectedName(selectedTargetName);

    // Ensure that the select box is removed from screen (until next click on image) 
    setClickedCoordinates({...clickedCoordinates, isSelecting: false})
  }

  if(isLoading) return <p>Puzzle is loading ...</p>
  if(error) return <p>{error.message}</p>;
  if(startTimerError) return <p>{startTimerError.message} - The server could not correctly set the start time.</p>;
  if(validationError) return <p>{validationError.message} - The server could not correctly process the validation of the guess.</p>;
  if(gameStateError) return <p>{gameStateError.message} - The server could not correctly process the validation of the game state.</p>;

  return (
    <main className="main-picture-puzzle">
      {incorrectMessage && <IncorrectMessage message={incorrectMessage} setIncorrectMessage={setIncorrectMessage} />}
      <Link to="/" >&lt; Back to Home</Link>
      <h1>{puzzle.title}</h1>
      <div className="task-info">
        <p>{puzzle.taskDescription}</p>
        <Timer seconds={secondsToCompletion ? secondsToCompletion : secondsPassed}/>
      </div>

      <div className="img-container">
        {clickedCoordinates?.isSelecting && 
          <SelectBoxContainer clickedCoordinates={clickedCoordinates} selectBox={selectBox} targets={puzzle.targets} selectName={selectName} />
        }

        { (correctlyIdentifiedTargets.length !== 0) &&
          <CheckMark identifiedTargets={correctlyIdentifiedTargets} imgRef={imgRef} resolution={[puzzle.resolutionWidth, puzzle.resolutionHeight]} />
        }

        { secondsToCompletion !== null && 
          <RecordTimeModal secondsToCompletion={secondsToCompletion} />
        }
        <img src={puzzle.imageSrc} onClick={getCoordinates} ref={imgRef}/>
      </div>
    </main>
  )
}

export default PicturePuzzle;