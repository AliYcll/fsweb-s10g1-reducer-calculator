import { APPLY_NUMBER, CHANGE_OPERATION, CALCULATE, CLEAR_DISPLAY, CLEAR_ENTRY, MEMORY_ADD, MEMORY_RECALL, MEMORY_CLEAR } from './../actions';

export const initialState = {
  total: 0,
  currentValue: "0",
  operation: "+",
  previousValue: 0,
  previousOperation: "",
  overwriteDisplay: false,
  memory: 0,
  history: []
}

const calculateResult = (num1, num2, operation) => {
  switch (operation) {
    case ("+"):
      return num1 + num2;
    case ("*"):
      return num1 * num2;
    case ("-"):
      return num1 - num2;
    case ("/"):
      return num1 / num2;
    default:
      return num1;
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case (APPLY_NUMBER):
      if (state.overwriteDisplay) {
        return {
          ...state,
          currentValue: String(action.payload),
          overwriteDisplay: false,
          total: 0,
          previousValue: 0,
          previousOperation: "",
          history: []
        };
      } else if (state.currentValue === "0") {
        return {
          ...state,
          currentValue: String(action.payload)
        };
      } else {
        return {
          ...state,
          currentValue: state.currentValue + action.payload
        };
      }

    case (CHANGE_OPERATION):
      let newPreviousValue = state.previousValue;
      if (state.previousValue === 0) {
        newPreviousValue = Number(state.currentValue);
      } else if (state.currentValue !== "0") {
        newPreviousValue = calculateResult(state.previousValue, Number(state.currentValue), state.operation);
      }
      return {
        ...state,
        operation: action.payload,
        previousValue: newPreviousValue,
        currentValue: "0",
        overwriteDisplay: false,
        previousOperation: state.operation,
      };

    case (CALCULATE):
      const result = calculateResult(state.previousValue, Number(state.currentValue), state.operation);
      return {
        ...state,
        total: result,
        currentValue: "0",
        overwriteDisplay: true,
        previousValue: 0,
        previousOperation: "",
        history: [...state.history, `${state.previousValue} ${state.operation} ${state.currentValue} = ${result}`]
      };

    case (CLEAR_DISPLAY):
      return {
        ...state,
        total: 0,
        currentValue: "0",
        operation: "+",
        previousValue: 0,
        previousOperation: "",
        overwriteDisplay: false,
        memory: 0,
        history: []
      };

    case (CLEAR_ENTRY):
      return {
        ...state,
        currentValue: "0",
        overwriteDisplay: false
      };

    case (MEMORY_ADD):
      return {
        ...state,
        memory: state.memory + Number(state.currentValue),
        overwriteDisplay: false
      };

    case (MEMORY_RECALL):
      return {
        ...state,
        currentValue: String(state.memory),
        overwriteDisplay: false
      };

    case (MEMORY_CLEAR):
      return {
        ...state,
        memory: 0,
        overwriteDisplay: false
      };

    default:
      return state;
  }
}

export default reducer;