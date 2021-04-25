import { TIMER_DEFAULT } from "../constants/types";

export const createFloors = (numOfFloors) => {
  let floors = {};
  for (let i = 0; i < numOfFloors; i++) {
    floors[i] = {
      floorNumber: i,
      isWaiting: false,
      isArrived: false,
      timer: null,
    };
  }
  return floors;
};

export const updateFloor = (
  floorsCopy,
  floorNumber,
  isWaiting,
  timer = TIMER_DEFAULT,
  isArrived = false
) => {
  let updatedFloor = JSON.parse(JSON.stringify(floorsCopy[floorNumber]));
  updatedFloor.isWaiting = isWaiting;
  updatedFloor.isArrived = isArrived;
  updatedFloor.timer = timer;
  floorsCopy[floorNumber] = updatedFloor;
  return floorsCopy;
};
