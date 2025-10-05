import {useEffect} from "react";

type IncorrectMessagePropType = {
  message: string,
  setIncorrectMessage: (a: string | null)=> void
}

function IncorrectMessage({message, setIncorrectMessage}: IncorrectMessagePropType) {
  useEffect(() => {
    if (message) {
      
      const timer = setTimeout(() => {
        setIncorrectMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return(
    <div className="incorrect-message"><p className="incorrect-icon">+</p><p>{message}</p></div>
  )
}

export default IncorrectMessage;