import * as React from 'react';

import { MouseEventHandler, ReactNode } from 'react';

export interface IButtonProps {
  onClick?: MouseEventHandler;
  children?: ReactNode;
}

export default function Button(props: IButtonProps) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
