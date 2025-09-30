import {useEffect} from "react";

function IncorrectMessage({message, setIncorrectMessage}) {
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