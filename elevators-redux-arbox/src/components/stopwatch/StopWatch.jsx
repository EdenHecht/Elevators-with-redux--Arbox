import React, { useEffect, useState } from "react";

const StopWatch = (props) => {
  const { startStopWatch } = props;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (startStopWatch)
      setTimeout(() => {
        setMinutes(minutes + 1);
        setSeconds(0);
      }, 60000);
  }, [startStopWatch, minutes]);

  useEffect(() => {
    if (startStopWatch) setTimeout(() => setSeconds(seconds + 1), 1000);
  }, [startStopWatch, seconds]);

  useEffect(() => {
    setMinutes(0);
    setSeconds(0);
  }, [startStopWatch]);

  return (
    <>
      {startStopWatch ? (
        <div>
          {minutes ? `${minutes}min,` : null}
          {`${seconds}sec`}
        </div>
      ) : null}
    </>
  );
};

export default StopWatch;
