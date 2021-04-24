import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./floor.scss";
import { getFloorName } from "../../services/logic/utils";
import Elevator from "../elevators/Elevator";
import { addCallToQueue } from "../../redux/actions";
import StopWatch from "../stopwatch/StopWatch";

const Floor = (props) => {
  const { floorNumber } = props;
  const numOfElevators = useSelector((state) => state.numOfElevators);
  const floorInfo = useSelector((state) => state.floors[floorNumber]);
  const watchStart = useSelector((state) => state.startWatch[floorNumber]);

  const [isWaiting, setIsWaiting] = useState(floorInfo.isWaiting);
  const [isArrived, setIsArrived] = useState(floorInfo.isArrived);
  const [btnText, setBtnText] = useState("Call");
  const [base, setbase] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setbase(createElevatorShaft());
  }, [watchStart]);

  useEffect(() => {
    setIsWaiting(floorInfo.isWaiting);
    setIsArrived(floorInfo.isArrived);
  }, [floorInfo]);

  useEffect(() => {
    const text = isWaiting ? "Waiting" : isArrived ? "Arrived" : "Call";
    setBtnText(text);
  }, [isWaiting, isArrived]);

  const createElevatorShaft = () => {
    let elevatorShaft = [];
    for (let i = 0; i < numOfElevators; i++) {
      elevatorShaft.push(
        <td
          key={`floor-${floorNumber}-elevator-${i}`}
          className="elevator-cell"
        >
          {!floorNumber && (
            <Elevator key={`floor-${floorNumber}--${i}`} elevatorNumber={i} />
          )}
        </td>
      );
    }
    return elevatorShaft;
  };

  const handleBtnClick = () => {
    setIsWaiting(true);
    dispatch(addCallToQueue(floorInfo.floorNumber));
  };

  return (
    <tr className="floor-row">
      <td className="floor-name">{getFloorName(floorInfo.floorNumber)}</td>
      {base}
      <td>
        <button
          className={`floor-button 
          ${isWaiting && "waiting"} 
          ${isArrived && "arrived"}`}
          onClick={handleBtnClick}
          disabled={isWaiting}
        >
          {btnText}
        </button>
      </td>
      <td className="watch">{<StopWatch startStopWatch={watchStart} />}</td>
    </tr>
  );
};

export default Floor;
