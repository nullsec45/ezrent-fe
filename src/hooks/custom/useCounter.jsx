import { useState } from 'react';

export default function useCounter(initalValue = 0) {
  const [counter, setCounter] = useState(initalValue);

  const incrementCounter = () => setCounter(counter + 1);
  const decrementCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const inputCounterChange = (e) => {
    const value = e?.target.value.replace(/[^0-9]/g, '');
    if (value === 0) return;
    setCounter(+value);
  };

  return [counter, inputCounterChange, incrementCounter, decrementCounter];
}
