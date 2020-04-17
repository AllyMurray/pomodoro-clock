import * as React from 'react';

import Button from './Button';

export interface ITimeControlProps {
  type: string;
  time: number;
  setTime: (time: number) => void;
}

export default function TimeControl(props: ITimeControlProps) {
  const onDecrementClick = () => setTime(props.time - 1);

  const onIncrementClick = () => setTime(props.time + 1);

  const setTime = (time: number) => {
    if (time <= 0 || time > 60) return;
    props.setTime(time);
  };

  return (
    <>
      <span
        id={`${props.type.toLowerCase()}-label`}
      >{`${props.type} Time`}</span>
      <div>
        <Button
          onClick={onDecrementClick}
          id={`${props.type.toLowerCase()}-decrement`}
        >
          Decrement
        </Button>
        <span id={`${props.type.toLowerCase()}-length`}>{props.time}</span>
        <Button
          onClick={onIncrementClick}
          id={`${props.type.toLowerCase()}-increment`}
        >
          Increment
        </Button>
      </div>
    </>
  );
}
