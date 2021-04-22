import {
  INITIALIZATION,
  ELEVATOR_CALL,
  ELEVATOR_ARRIVED,
  DELAY_OVER,
} from "./actionTypes";
import {
  createElevators,
  createFloors,
  findClosestElevator,
  updateElevatorCalled,
  updateFloor,
  updateElevatorArrived,
} from "../services/utils";
import {
  WAITING,
  NOT_WAITING,
  NO_ELEVATOR_ASSIGNED,
  ARRIVED,
} from "../services/constants/types";

const initialState = {
  elevators: {},
  floors: {},
  callQueue: [],
  numOfFloors: 10,
  numOfElevators: 5,
};

const reducer = (state = initialState, action) => {
  let updatedElevators;
  let updatedFloors;
  let floorNumber;
  let elevatorNumber;

  switch (action.type) {
    case INITIALIZATION:
      const elevators = createElevators(state.numOfElevators);
      const floors = createFloors(state.numOfFloors);
      return {
        ...state,
        elevators: elevators,
        floors: floors,
      };

    case ELEVATOR_CALL:
      floorNumber = action.payload;
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
        if (floorNumber === updatedQueue[0]) {
          updatedQueue.shift();
        }
        updatedElevators = updateElevatorCalled(
          { ...state.elevators },
          floorNumber,
          closestElevator
        );
        updatedFloors = updateFloor(
          { ...state.floors },
          floorNumber,
          WAITING,
          closestElevator.elevatorNumber
        );
        return {
          ...state,
          elevators: updatedElevators,
          floors: updatedFloors,
          callQueue: updatedQueue,
        };
      }

    case ELEVATOR_ARRIVED:
      floorNumber = action.payload.floorNumber;
      elevatorNumber = action.payload.elevatorNumber;
      updatedFloors = updateFloor(
        { ...state.floors },
        floorNumber,
        NOT_WAITING,
        ARRIVED
      );
      updatedElevators = updateElevatorArrived(
        { ...state.elevators },
        floorNumber,
        elevatorNumber
      );
      return {
        ...state,
        elevators: updatedElevators,
        floors: updatedFloors,
      };

    case DELAY_OVER:
      floorNumber = action.payload.floorNumber;
      elevatorNumber = action.payload.elevatorNumber;
      updatedElevators = { ...state.elevators };
      updatedElevators[elevatorNumber].isMoving = false;
      updatedFloors = updateFloor(
        { ...state.floors },
        floorNumber,
        NOT_WAITING
      );
      return {
        ...state,
        floors: updatedFloors,
        elevators: updatedElevators,
      };

    default:
      return state;
  }
};

export default reducer;
