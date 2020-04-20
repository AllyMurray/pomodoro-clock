/** @jsx jsx */

import { css, jsx } from '@emotion/core';

import { MouseEventHandler } from 'react';

const buttonStyle = css`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 0.75em;
`;

export interface IButtonProps {
  id?: string;
  onClick?: MouseEventHandler;
  icon: string;
  children: string;
}

export default function IconButton(props: IButtonProps) {
  return (
    <button type="button" css={buttonStyle} {...props}>
      <i className={`fas fa-${props.icon}`}></i>
      {props.children}
    </button>
  );
}
