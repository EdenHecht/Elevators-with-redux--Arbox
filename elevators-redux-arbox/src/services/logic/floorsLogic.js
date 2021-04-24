export const createFloors = (numOfFloors) => {
  let floors = {};
  for (let i = 0; i < numOfFloors; i++) {
    floors[i] = {
      floorNumber: i,
      isWaiting: false,
      isArrived: false,
    };
  }
  return floors;
};

export const updateFloor = (
  floorsCopy,
  floorNumber,
  isWaiting,
  isArrived = false
) => {
  let updatedFloor = JSON.parse(JSON.stringify(floorsCopy[floorNumber]));
  updatedFloor.isWaiting = isWaiting;
  updatedFloor.isArrived = isArrived;
  floorsCopy[floorNumber] = updatedFloor;
  return floorsCopy;
};
