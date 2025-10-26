export const APPLY_NUMBER = "APPLY_NUMBER";
export const CHANGE_OPERATION = "CHANGE_OPERATION";
export const CALCULATE = "CALCULATE";
export const CLEAR_DISPLAY = "CLEAR_DISPLAY";
export const CLEAR_ENTRY = "CLEAR_ENTRY";
export const MEMORY_ADD = "MEMORY_ADD";
export const MEMORY_RECALL = "MEMORY_RECALL";
export const MEMORY_CLEAR = "MEMORY_CLEAR";

export const applyNumber = (number) => {
  return ({ type: APPLY_NUMBER, payload: number });
}

export const changeOperation = (operation) => {
    return ({ type: CHANGE_OPERATION, payload: operation });
}

export const calculate = () => {
    return ({ type: CALCULATE });
}

export const clearDisplay = () => {
    return ({ type: CLEAR_DISPLAY });
}

export const clearEntry = () => {
    return ({ type: CLEAR_ENTRY });
}

export const memoryAdd = () => {
    return ({ type: MEMORY_ADD });
}

export const memoryRecall = () => {
    return ({ type: MEMORY_RECALL });
}

export const memoryClear = () => {
    return ({ type: MEMORY_CLEAR });
}