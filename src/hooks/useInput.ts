import React, { useState } from 'react';

type useInputType = (
  initialValue?: string
) => [string, React.Dispatch<React.SetStateAction<string>>, (e: React.ChangeEvent<HTMLInputElement>) => void];

const useInput: useInputType = (initialValue = '') => {
  const [value, setValue] = useState<string>(initialValue);
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return [value, setValue, onChangeValue];
};

export default useInput;
