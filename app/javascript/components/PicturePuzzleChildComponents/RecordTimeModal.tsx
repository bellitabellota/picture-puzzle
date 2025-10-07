import {useState, useRef, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePostResult from "../custom_hooks/usePostResult";

function RecordTimeModal({secondsToCompletion}: {secondsToCompletion: number}) {
  const params = useParams();
  if (!params.id) {
    throw new Error("Expected route param :id to exist");
  }

  const [playerName, setPlayerName] = useState(null);
  const inputField = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const {resultSaved, saveResultError} = usePostResult(playerName, params.id);

  const minutes = Math.floor(secondsToCompletion / 60);
  const remainingSeconds = secondsToCompletion % 60;

  function recordTimeHandler() {
    if (!inputField.current) return;
    if (inputField.current.value === "") {
      return alert("Enter a name to record your time.")
    }

    setPlayerName(inputField.current.value);
  }

  useEffect(()=>{
    if(resultSaved) {
      navigate(`/${params.id}/results`)
    }
  }, [resultSaved])

  const pageHtml = saveResultError ? 
    <div className="modal"><p>{saveResultError.message} - The puzzle result could not be saved.</p></div> 
    : 
    (<div className="modal">
      <h2>PUZZLE FINISHED</h2>
      <p>You solved the puzzle in {minutes !== 0 && (String(minutes) + " minute(s) and ")} {remainingSeconds} seconds.</p>

      <label htmlFor="player-name">Enter your name (if you want your time to be recorded).</label>
      <input type="text" id="player-name" name="player-name" ref={inputField}/>
      <button className="record-time-btn" onClick={recordTimeHandler}>Record Time</button>
    </div>)

  return(
    pageHtml
  )
}

export default RecordTimeModal;