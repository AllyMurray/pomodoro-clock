import * as React from 'react';

import IconButton from './IconButton';

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
        <IconButton
          icon="arrow-down"
          onClick={onDecrementClick}
          id={`${props.type.toLowerCase()}-decrement`}
        >
          Decrement
        </IconButton>
        <span id={`${props.type.toLowerCase()}-length`}>{props.time}</span>
        <IconButton
          icon="arrow-up"
          onClick={onIncrementClick}
          id={`${props.type.toLowerCase()}-increment`}
        >
          Increment
        </IconButton>
      </div>
    </>
  );
}
