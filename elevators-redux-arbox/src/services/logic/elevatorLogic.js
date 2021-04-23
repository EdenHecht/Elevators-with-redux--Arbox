export const createElevators = (numOfElevators) => {
  let elevators = {};
  for (let i = 0; i < numOfElevators; i++) {
    elevators[i] = {
      elevatorNumber: i,
      currentFloor: 0,
      nextFloor: 0,
      isMoving: false,
      startTime: null,
    };
  }
  return elevators;
};

export const findClosestElevator = (floorNumber, elevators) => {
  const elevatorValues = Object.keys(elevators).map((key) => elevators[key]);
  return elevatorValues
    .filter((elevator) => !elevator.isMoving)
    .sort((elevator1, elevator2) =>
      Math.abs(elevator1.currentFloor - floorNumber) >
      Math.abs(elevator2.currentFloor - floorNumber)
        ? 1
        : Math.abs(elevator1.currentFloor - floorNumber) <
          Math.abs(elevator2.currentFloor - floorNumber)
        ? -1
        : 0
    )[0];
};

export const updateElevatorCalled = (
  elevatorsCopy,
  floorNumber,
  closestElevator
) => {
  let updatedElevator = JSON.parse(JSON.stringify(closestElevator)); //deep clone
  updatedElevator.nextFloor = floorNumber;
  updatedElevator.isMoving = true;
  updatedElevator.startTime = performance.now();
  elevatorsCopy[closestElevator.elevatorNumber] = updatedElevator;

  return elevatorsCopy;
};

export const updateElevatorArrived = (
  elevatorsCopy,
  floorNumber,
  elevatorNumber
) => {
  let updatedElevator = JSON.parse(
    JSON.stringify(elevatorsCopy[elevatorNumber])
  );
  updatedElevator.nextFloor = floorNumber;
  updatedElevator.currentFloor = floorNumber;
  updatedElevator.startTime = null;
  elevatorsCopy[elevatorNumber] = updatedElevator;
  return elevatorsCopy;
};
