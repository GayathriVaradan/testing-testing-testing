import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let shouldCleanUp = false;
    async function load() {
      const res = await fetch('/getcounter');
      const data = await res.json();
      if (!shouldCleanUp) {
        setCounter(data.counter);
      }
    }
    load();
    // Cleaning up the effect. This will be called when the component unmounts
    // In our case this will stop errors happening from tests that unmount the
    // after they are done but before the call to the api is completed. In that
    // case the setCounter would fire for the unmounted component causing the warrning
    return () => (shouldCleanUp = true);
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 data-testid='title'>React counter app demo</h1>
      </header>
      <main>
        <div>
          <button
            onClick={() => {
              setCounter(counter - 1);
            }}
            data-testid='dec-button'
          >
            -
          </button>
          <span data-testid='counter' className='counter'>{counter}</span>
          <button
            onClick={() => {
              setCounter(counter + 1);
            }}
            data-testid='inc-button'
          >
            +
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
