import Elevator from "../../components/elevators/Elevator";
import StopWatch from "../../components/stopwatch/StopWatch";

export const createElevators = (numOfElevators) => {
  let elevators = {};
  for (let i = 0; i < numOfElevators; i++) {
    elevators[i] = {
      elevatorNumber: i,
      currentFloor: 0,
      nextFloor: 0,
      isMoving: false,
    };
  }
  return elevators;
};

export const createElevatorShaft = (
  numOfElevators,
  floorNumber,
  watchStart
) => {
  let elevatorShaft = [];
  for (let i = 0; i < numOfElevators; i++) {
    elevatorShaft.push(
      <td key={`floor-${floorNumber}-elevator-${i}`} className="elevator-cell">
        {!floorNumber && (
          <Elevator key={`floor-${floorNumber}--${i}`} elevatorNumber={i} />
        )}
        {watchStart.elevatorNumber === i ? (
          <StopWatch floorNumber={floorNumber} />
        ) : null}
      </td>
    );
  }
  return elevatorShaft;
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
  let updatedElevator = JSON.parse(JSON.stringify(closestElevator));
  updatedElevator.nextFloor = floorNumber;
  updatedElevator.isMoving = true;
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
  elevatorsCopy[elevatorNumber] = updatedElevator;
  return elevatorsCopy;
};
