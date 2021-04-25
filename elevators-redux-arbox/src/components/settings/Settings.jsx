import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initSettings } from "../../redux/actions";
import "./setting.scss";
import "../home/home.css";

const Settings = () => {
  const numOfFloorsInit = useSelector((state) => state.numOfFloors);
  const numOfElevatorsInit = useSelector((state) => state.numOfElevators);

  const [numOfElevators, setNumOfElevators] = useState(numOfElevatorsInit);
  const [numOfFloors, setNumOfFloors] = useState(numOfFloorsInit);

  const dispatch = useDispatch();

  return (
    <div className="settings-container">
      <input
        className="input"
        name="numberOfFloors"
        type="number"
        value={numOfFloors}
        onChange={(e) => setNumOfFloors(Number(e.target.value))}
      />
      <input
        className="input"
        name="numberOfElevators"
        type="number"
        value={numOfElevators}
        onChange={(e) => setNumOfElevators(Number(e.target.value))}
      />
      <button
        className="settings-btn"
        type="submit"
        onClick={() => dispatch(initSettings(numOfElevators, numOfFloors))}
      >
        Start
      </button>
    </div>
  );
};

export default Settings;
