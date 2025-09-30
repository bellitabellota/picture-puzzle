import React, {useState, useEffect} from "react";

function CheckMark({identifiedTargets, imgRef, resolution}) {
  const [scalingFactors, setScalingFactors] = useState({ scaleX: 1, scaleY: 1 });

  useEffect(() => {
    function updateScaling() {
      if (imgRef.current) {
        const rect = imgRef.current.getBoundingClientRect();
        setScalingFactors({
          scaleX: rect.width / resolution[0],
          scaleY: rect.height / resolution[1],
        });
      }
    }

    updateScaling();
    window.addEventListener("resize", updateScaling);
    return () => window.removeEventListener("resize", updateScaling);
  }, []);

  const checkMarksOfIdentified = identifiedTargets.map((target) => {
    return(
      <img className="check-mark" src="/picture-puzzle-images/utils/checkmark.png" style={{left: `${target.xCenter * scalingFactors.scaleX}px`, top:`${target.yCenter* scalingFactors.scaleY}px`}} key={target.name}/>
    )
  })

  return(
    checkMarksOfIdentified
  )
}

export default CheckMark;