import {
  createElevators,
  findClosestElevator,
  updateElevatorCalled,
  updateElevatorArrived,
} from "../services/logic/elevatorLogic";
import { createFloors, updateFloor } from "../services/logic/floorsLogic";
import { WAITING, NOT_WAITING, ARRIVED } from "../services/constants/types";

export const handleInit = (state) => {
  const elevators = createElevators(state.numOfElevators);
  const floors = createFloors(state.numOfFloors);
  return {
    ...state,
    elevators: elevators,
    floors: floors,
  };
};

export const handleAddCallToQueue = (state, action) => {
  const floorNumber = action.payload;
  return {
    ...state,
    callQueue: [...state.callQueue, floorNumber],
  };
};

export const handleElevatorCall = (state, action) => {
  const floorNumber = action.payload;
  const closestElevator = findClosestElevator(floorNumber, state.elevators);
  let updatedQueue = [...state.callQueue];

  if (!closestElevator) {
    if (!updatedQueue.includes(floorNumber)) {
      updatedQueue.push(floorNumber);
    }
    return {
      ...state,
      callQueue: updatedQueue,
    };
  } else {
    updatedQueue.shift();

    const updatedElevators = updateElevatorCalled(
      { ...state.elevators },
      floorNumber,
      closestElevator
    );
    const updatedFloors = updateFloor(
      { ...state.floors },
      floorNumber,
      WAITING
    );
    return {
      ...state,
      elevators: updatedElevators,
      floors: updatedFloors,
      callQueue: updatedQueue,
    };
  }
};

export const handleElevatorArrived = (state, action) => {
  const floorNumber = action.payload.floorNumber;
  const elevatorNumber = action.payload.elevatorNumber;
  const updatedFloors = updateFloor(
    { ...state.floors },
    floorNumber,
    NOT_WAITING,
    ARRIVED
  );
  const updatedElevators = updateElevatorArrived(
    { ...state.elevators },
    floorNumber,
    elevatorNumber
  );
  return {
    ...state,
    elevators: updatedElevators,
    floors: updatedFloors,
  };
};

export const handleDelayOver = (state, action) => {
  const floorNumber = action.payload.floorNumber;
  const elevatorNumber = action.payload.elevatorNumber;
  let updatedElevators = { ...state.elevators };
  updatedElevators[elevatorNumber].isMoving = false;
  const updatedFloors = updateFloor(
    { ...state.floors },
    floorNumber,
    NOT_WAITING
  );
  return {
    ...state,
    floors: updatedFloors,
    elevators: updatedElevators,
  };
};
