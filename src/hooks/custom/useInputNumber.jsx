import { useState } from 'react';

export default function useInputNumber(initalValue = '') {
  const [value, setValue] = useState(initalValue);

  const handleOnChange = (e) => {
    const value = e?.target.value.replace(/[^0-9]/g, '');
    setValue(+value);
  };

  return [value, handleOnChange, setValue];
}
