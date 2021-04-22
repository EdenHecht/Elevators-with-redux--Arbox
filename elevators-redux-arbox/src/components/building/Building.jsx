import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Floor from "../floors/Floor";
import "./building.scss";
import { initBaseComponents, handleElevatorCall } from "../../redux/actions";

const Building = () => {
  const floors = useSelector((state) => state.floors);
  const callQueue = useSelector((state) => state.callQueue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBaseComponents());
  }, []);

  useEffect(() => {
    if (callQueue.length) {
      callQueue.map((floorNum) => dispatch(handleElevatorCall(floorNum)));
    }
  }, [callQueue]);

  return (
    <div className="building-container">
      <p className="header">Elevator Exercise</p>
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
  );
};

export default Building;
