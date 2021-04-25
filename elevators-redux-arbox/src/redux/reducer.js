import {
  SETTINGS,
  INITIALIZATION,
  RESET_SETTINGS,
  ADD_CALL_TO_QUEUE,
  ELEVATOR_CALL,
  ELEVATOR_ARRIVED,
  DELAY_OVER,
} from "./actionTypes";
import {
  handleInit,
  handleAddCallToQueue,
  handleElevatorCall,
  handleElevatorArrived,
  handleDelayOver,
} from "./reducerHelper";

const initialState = {
  isSet: false,
  elevators: {},
  floors: {},
  callQueue: [],
  startWatch: [],
  numOfFloors: 10,
  numOfElevators: 5,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SETTINGS:
      return {
        ...state,
        isSet: true,
        numOfFloors: action.payload.numOfFloors,
        numOfElevators: action.payload.numOfElevators,
      };

    case RESET_SETTINGS:
      return {
        ...initialState,
      };

    case INITIALIZATION:
      return handleInit(state);

    case ADD_CALL_TO_QUEUE:
      return handleAddCallToQueue(state, action);

    case ELEVATOR_CALL:
      return handleElevatorCall(state, action);

    case ELEVATOR_ARRIVED:
      return handleElevatorArrived(state, action);

    case DELAY_OVER:
      return handleDelayOver(state, action);

    default:
      return state;
  }
};

export default reducer;
