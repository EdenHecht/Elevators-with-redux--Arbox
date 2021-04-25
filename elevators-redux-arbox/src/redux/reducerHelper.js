import {
  createElevators,
  findClosestElevator,
  updateElevatorCalled,
  updateElevatorArrived,
} from "../services/logic/elevatorLogic";
import { createFloors, updateFloor } from "../services/logic/floorsLogic";
import { initWatches, toggleWatch } from "../services/logic/watchesLogic";
import {
  WAITING, // true
  NOT_WAITING, // false
  ARRIVED, // true
  START, // true
  STOP, // false
  PICKUP_DEFAULT, // 0
  TIMER_DEFAULT, // null
} from "../services/constants/types";

export const handleInit = (state) => {
  const elevators = createElevators(state.numOfElevators);
  const floors = createFloors(state.numOfFloors);
  const watches = initWatches(state.numOfFloors);
  return {
    ...state,
    elevators: elevators,
    floors: floors,
    startWatch: watches,
  };
};

export const handleAddCallToQueue = (state, action) => {
  const floorNumber = action.payload;
  const updatedWatches = toggleWatch(
    { ...state.startWatch },
    floorNumber,
    START,
    PICKUP_DEFAULT
  );
  const updatedFloors = updateFloor(
    { ...state.floors },
    floorNumber,
    WAITING,
    performance.now()
  );
  return {
    ...state,
    callQueue: [...state.callQueue, floorNumber],
    startWatch: updatedWatches,
    floors: updatedFloors,
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

    const timer = Math.round(
      (performance.now() - state.floors[floorNumber].timer) / 1000
    );
    const updatedWatches = toggleWatch(
      { ...state.startWatch },
      floorNumber,
      START,
      timer,
      closestElevator.elevatorNumber
    );

    return {
      ...state,
      elevators: updatedElevators,
      callQueue: updatedQueue,
      startWatch: updatedWatches,
    };
  }
};

export const handleElevatorArrived = (state, action) => {
  const floorNumber = action.payload.floorNumber;
  const elevatorNumber = action.payload.elevatorNumber;
  const updatedWatches = toggleWatch(
    { ...state.startWatch },
    floorNumber,
    STOP,
    PICKUP_DEFAULT
  );
  const updatedFloors = updateFloor(
    { ...state.floors },
    floorNumber,
    NOT_WAITING,
    TIMER_DEFAULT,
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
    startWatch: updatedWatches,
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
