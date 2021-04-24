export const initWatches = (numOfFloors) => {
  let watches = {};
  for (let i = 0; i < numOfFloors; i++) {
    watches[i] = false;
  }
  return watches;
};

export const toggleWatch = (watchesCopy, floorNumber, isToggled) => {
  watchesCopy[floorNumber] = isToggled;
  return watchesCopy;
};
