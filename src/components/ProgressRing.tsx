/** @jsx jsx */

import { css, jsx } from '@emotion/core';

const circleStyle = css`
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;

const contentStyle = css`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export interface IProgressRingProps {
  backgroundColor: string;
  foreGroundColor: string;
  radius: number;
  stroke: number;
  progress: number;
  children?: React.ReactNode;
}

// This component is based off the component created by Jeremias Menichelli
// https://css-tricks.com/building-progress-ring-quickly/
export default function ProgressRing(props: IProgressRingProps) {
  const { radius, stroke, progress, backgroundColor, foreGroundColor } = props;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          css={circleStyle}
          stroke={backgroundColor}
          fill="transparent"
          strokeWidth={stroke - 1}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          css={circleStyle}
          stroke={foreGroundColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div css={contentStyle}>{props.children}</div>
    </div>
  );
}
