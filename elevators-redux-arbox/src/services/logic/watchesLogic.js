import { NO_ELEVATOR_ASSIGNED } from "../constants/types";

export const initWatches = (numOfFloors) => {
  let watches = [];
  for (let i = 0; i < numOfFloors; i++) {
    watches[i] = {
      elevatorNumber: -1,
      start: false,
      pickUpTime: 0,
    };
  }
  return watches;
};

export const toggleWatch = (
  watchesCopy,
  floorNumber,
  isToggled,
  pickUpTime,
  elevatorNumber = NO_ELEVATOR_ASSIGNED
) => {
  watchesCopy[floorNumber] = {
    elevatorNumber: elevatorNumber,
    start: isToggled,
    pickUpTime: pickUpTime,
  };
  return watchesCopy;
};
