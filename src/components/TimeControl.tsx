/** @jsx jsx */

import { css, jsx } from '@emotion/core';

import IconButton from './IconButton';

const timeControlStyle = css`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

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
    <div css={timeControlStyle}>
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
    </div>
  );
}
