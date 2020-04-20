/** @jsx jsx */

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { css, jsx } from '@emotion/core';

import IconButton from './IconButton';
import ProgressRing from './ProgressRing';
import TimeControl from './TimeControl';

const timeControlStyle = css`
  display: flex;
`;

const remainingTimeStyle = css`
  font-size: 3em;
`;

export default function PomodoroClock() {
  const defaultSessionMinutes = 25;
  const defaultSessionSeconds = defaultSessionMinutes * 60;
  const defaultBreakMinutes = 5;
  const sessionType = 'Session';
  const breakType = 'Break';

  const audioElement = useRef<HTMLAudioElement>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [sessionTime, setSessionTime] = useState(defaultSessionMinutes);
  const [breakTime, setBreakTime] = useState(defaultBreakMinutes);
  const [timeInfo, setTimeInfo] = useState({
    timeType: sessionType,
    remainingSeconds: defaultSessionSeconds,
  });

  const tick = () => {
    setTimeInfo(timeInfo => {
      let newState;
      if (timeInfo.remainingSeconds === 0) {
        audioElement.current?.play();
        newState =
          timeInfo.timeType === sessionType
            ? { remainingSeconds: breakTime * 60, timeType: breakType }
            : { remainingSeconds: sessionTime * 60, timeType: sessionType };
      } else {
        newState = {
          ...timeInfo,
          remainingSeconds: timeInfo.remainingSeconds - 1,
        };
      }

      return newState;
    });
  };

  const stop = useCallback(() => {
    if (audioElement.current) {
      audioElement.current.pause();
      audioElement.current.currentTime = 0;
    }
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  }, [intervalId]);

  const onPlayClick = () => {
    setIntervalId(setInterval(tick, 100));
  };

  const onPauseClick = () => stop();

  const onResetClick = () => {
    stop();
    setSessionTime(defaultSessionMinutes);
    setBreakTime(defaultBreakMinutes);
    setTimeInfo({
      remainingSeconds: defaultSessionSeconds,
      timeType: sessionType,
    });
  };

  // Clean up on un-mount
  useEffect(
    () => () => {
      console.info('Component un-mount');
      stop();
    },
    [stop]
  );

  const formatTime = () => {
    let minutes = Math.floor(timeInfo.remainingSeconds / 60);
    let seconds = Math.floor(timeInfo.remainingSeconds % 60);

    return `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  };

  const calculateProgress = () => {
    return 100 - 100 / ((sessionTime * 60) / timeInfo.remainingSeconds);
  };

  const handleSessionChange = (time: number) => {
    setSessionTime(time);
    setTimeInfo({ ...timeInfo, remainingSeconds: time * 60 });
  };

  return (
    <div>
      <div css={timeControlStyle}>
        <TimeControl
          type="Session"
          time={sessionTime}
          setTime={handleSessionChange}
        />
        <TimeControl type="Break" time={breakTime} setTime={setBreakTime} />
      </div>
      <ProgressRing
        radius={200}
        stroke={15}
        progress={calculateProgress()}
        backgroundColor="#E0E0E0"
        foreGroundColor="#42A5F5"
      >
        <Fragment>
          <span id="timer-label">{timeInfo.timeType}</span>
          <span css={remainingTimeStyle} id="time-left">
            {formatTime()}
          </span>
        </Fragment>
      </ProgressRing>
      {intervalId ? (
        <IconButton icon="pause" onClick={onPauseClick} id="start_stop">
          Pause
        </IconButton>
      ) : (
        <IconButton icon="play" onClick={onPlayClick} id="start_stop">
          Play
        </IconButton>
      )}
      <IconButton icon="sync" onClick={onResetClick} id="reset">
        Reset
      </IconButton>
      {/* TODO: Use my own audio clip */}
      <audio
        id="beep"
        src="https://goo.gl/65cBl1"
        preload="auto"
        ref={audioElement}
      />
    </div>
  );
}
