/** @jsx jsx */

import { Fragment, useCallback, useEffect, useState } from 'react';
import { css, jsx } from '@emotion/core';

import Button from './Button';
import ProgressRing from './ProgressRing';

// let intervalId: NodeJS.Timeout | undefined;

const remainingTimeStyle = css`
  font-size: 3em;
`;

export default function PomodoroClock() {
  const defaultSessionTime = 25 * 60;
  const defaultBreakTime = 5 * 60;
  const sessionType = 'Session';
  const breakType = 'Break';

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [progress, setProgress] = useState(0);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [remainingTime, setRemainingTime] = useState(defaultSessionTime);
  const [timeType, setTimeType] = useState(sessionType);
  // const [breakTime, setBreakTime] = useState(5);

  const tick = () => {
    setProgress(progress => progress + 1);
    setRemainingTime(remainingTime => remainingTime - 1);
  };

  const stop = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  }, [intervalId]);

  const onPlayClick = () => {
    setIntervalId(setInterval(tick, 1000));
  };

  const onPauseClick = () => stop();

  const onResetClick = () => {
    stop();
    setProgress(0);
    setRemainingTime(defaultSessionTime);
    setTimeType(sessionType);
  };

  // Clean up on un-mount
  useEffect(
    () => () => {
      console.log('Component unmount');
      stop();
    },
    [stop]
  );

  const formatTime = () => {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = Math.floor(remainingTime % 60);

    return `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  };

  const calculateProgress = () => {
    return 100 - 100 / (sessionTime / remainingTime);
  };

  return (
    <div>
      <ProgressRing
        radius={200}
        stroke={15}
        progress={calculateProgress()}
        backgroundColor="#E0E0E0"
        foreGroundColor="#42A5F5"
      >
        <Fragment>
          <span>{sessionType}</span>
          <span css={remainingTimeStyle}>{formatTime()}</span>
        </Fragment>
      </ProgressRing>
      {intervalId ? (
        <Button onClick={onPauseClick}>Pause</Button>
      ) : (
        <Button onClick={onPlayClick}>Play</Button>
      )}
      <Button onClick={onResetClick}>Reset</Button>
    </div>
  );
}
