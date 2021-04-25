import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Floor from "../floors/Floor";
import "../home/home.css";
import "./building.scss";
import { resetSettings, handleElevatorCall } from "../../redux/actions";

const Building = () => {
  const floors = useSelector((state) => state.floors);
  const elevators = useSelector((state) => state.elevators);
  const callQueue = useSelector((state) => state.callQueue);
  const dispatch = useDispatch();

  useEffect(() => {
    var filtered = Object.fromEntries(
      Object.entries(elevators).filter(([key, val]) => val.isMoving === false)
    );
    if (callQueue.length && Object.keys(filtered).length) {
      dispatch(handleElevatorCall(callQueue[0]));
    }
  }, [callQueue, elevators]);

  return (
    <>
      <button
        className="back-settings-btn settings-btn"
        type="submit"
        onClick={() => dispatch(resetSettings())}
      >
        {`< Back To Settings`}
      </button>
      <div className="building-container">
        <table className="building-table">
          <tbody>
            {Object.keys(floors)
              .map((key) => floors[key])
              .sort((floor1, floor2) => floor2.floorNumber - floor1.floorNumber)
              .map((floor) => (
                <Floor
                  key={`floor-${floor.floorNumber}`}
                  floorNumber={floor.floorNumber}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Building;
