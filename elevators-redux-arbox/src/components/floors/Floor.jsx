import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./floor.scss";
import { getFloorName } from "../../services/logic/utils";
import { createElevatorShaft } from "../../services/logic/elevatorLogic";
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
  const [basePositions, setBasePositions] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setBasePositions(createElevatorShaft(numOfElevators, floorNumber));
  }, [watchStart]);

  useEffect(() => {
    setIsWaiting(floorInfo.isWaiting);
    setIsArrived(floorInfo.isArrived);
  }, [floorInfo]);

  useEffect(() => {
    const text = isWaiting ? "Waiting" : isArrived ? "Arrived" : "Call";
    setBtnText(text);
  }, [isWaiting, isArrived]);

  const handleBtnClick = () => {
    setIsWaiting(true);
    dispatch(addCallToQueue(floorNumber));
  };

  return (
    <tr className="floor-row">
      <td className="floor-name">{getFloorName(floorNumber)}</td>
      {basePositions}
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
