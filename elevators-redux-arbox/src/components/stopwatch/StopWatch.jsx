import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StopWatch = (props) => {
  const { floorNumber } = props;
  const initTime = useSelector(
    (state) => state.startWatch[floorNumber].pickUpTime
  );

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(initTime);

  useEffect(() => {
    setTimeout(() => {
      setMinutes(minutes + 1);
      setSeconds(0);
    }, 60000);
  }, [minutes]);

  useEffect(() => {
    setTimeout(() => setSeconds(seconds + 1), 1000);
  }, [seconds]);

  return (
    <>
      <div>
        {minutes ? `${minutes}min,` : null}
        {`${seconds}sec`}
      </div>
    </>
  );
};

export default StopWatch;
