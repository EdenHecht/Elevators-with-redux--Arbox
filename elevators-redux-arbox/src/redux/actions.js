import {
  INITIALIZATION,
  ELEVATOR_CALL,
  ELEVATOR_ARRIVED,
  DELAY_OVER,
} from "./actionTypes";

export const initBaseComponents = () => {
  return {
    type: INITIALIZATION,
  };
};

export const handleElevatorCall = (floorNumber) => {
  return {
    type: ELEVATOR_CALL,
    payload: floorNumber,
  };
};

export const handleElevatorArrived = (floorNumber, elevatorNumber) => {
  return {
    type: ELEVATOR_ARRIVED,
    payload: { floorNumber, elevatorNumber },
  };
};

export const handleDelayOver = (floorNumber, elevatorNumber) => {
  return {
    type: DELAY_OVER,
    payload: { floorNumber, elevatorNumber },
  };
};
