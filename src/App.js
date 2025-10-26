import React, { useReducer, useEffect } from 'react';
import reducer, { initialState } from './reducers';

import TotalDisplay from './components/TotalDisplay';
import CalcButton from './components/CalcButton';

import { applyNumber, changeOperation, calculate, clearDisplay, clearEntry, memoryAdd, memoryRecall, memoryClear } from './actions';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleApplyNumber = (number) => {
    dispatch(applyNumber(number));
  };

  const handleChangeOperation = (operation) => {
    dispatch(changeOperation(operation));
  };

  const handleCalculate = () => {
    dispatch(calculate());
  };

  const handleClearDisplay = () => {
    dispatch(clearDisplay());
  };

  const handleClearEntry = () => {
    dispatch(clearEntry());
  };

  const handleMemoryAdd = () => {
    dispatch(memoryAdd());
  };

  const handleMemoryRecall = () => {
    dispatch(memoryRecall());
  };

  const handleMemoryClear = () => {
    dispatch(memoryClear());
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key >= '0' && event.key <= '9') {
        handleApplyNumber(parseInt(event.key));
      } else if (['+', '-', '*', '/'].includes(event.key)) {
        handleChangeOperation(event.key);
      } else if (event.key === 'Enter') {
        handleCalculate();
      } else if (event.key === 'Escape') {
        handleClearEntry();
      } else if (event.key === 'c' || event.key === 'C') {
        handleClearEntry();
      } else if (event.key === 'm' || event.key === 'M') {
        handleMemoryAdd();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleApplyNumber, handleChangeOperation, handleCalculate, handleClearEntry, handleMemoryAdd]);

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand"> Reducer Challenge</span>
      </nav>

      <div className="container row mt-5">
        <div className="col-md-12 d-flex justify-content-center">
          <form name="Cal">

            <TotalDisplay value={state.currentValue !== "0" ? state.currentValue : state.previousValue !== 0 ? state.previousValue : state.total} />
            <div className="row details">
              <span id="operation"><b>Operation:</b> {state.previousValue !== 0 ? `${state.previousValue} ${state.previousOperation} ` : ''}{state.currentValue !== "0" ? state.currentValue : ''}</span>
              <span id="memory"><b>Memory:</b> {state.memory}</span>
            </div>

            <div className="row history">
              {state.history.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>

            <div className="row">
              <CalcButton value={"M+"} onClick={handleMemoryAdd} />
              <CalcButton value={"MR"} onClick={handleMemoryRecall} />
              <CalcButton value={"MC"} onClick={handleMemoryClear} />
            </div>

            <div className="row">
              <CalcButton value={1} onClick={() => handleApplyNumber(1)} />
              <CalcButton value={2} onClick={() => handleApplyNumber(2)} />
              <CalcButton value={3} onClick={() => handleApplyNumber(3)} />
            </div>

            <div className="row">
              <CalcButton value={4} onClick={() => handleApplyNumber(4)} />
              <CalcButton value={5} onClick={() => handleApplyNumber(5)} />
              <CalcButton value={6} onClick={() => handleApplyNumber(6)} />
            </div>

            <div className="row">
              <CalcButton value={7} onClick={() => handleApplyNumber(7)} />
              <CalcButton value={8} onClick={() => handleApplyNumber(8)} />
              <CalcButton value={9} onClick={() => handleApplyNumber(9)} />
            </div>

            <div className="row">
              <CalcButton value={'+'} onClick={() => handleChangeOperation('+')} />
              <CalcButton value={'*'} onClick={() => handleChangeOperation('*')} />
              <CalcButton value={'-'} onClick={() => handleChangeOperation('-')} />
            </div>

            <div className="row">
              <CalcButton value={'/'} onClick={() => handleChangeOperation('/')} />
              <CalcButton value={'='} onClick={handleCalculate} />
              <CalcButton value={"C"} onClick={handleClearEntry} />
            </div>

            <div className="row ce_button">
              <CalcButton value={"CE"} onClick={handleClearDisplay} />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;