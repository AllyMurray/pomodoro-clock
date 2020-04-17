import * as React from 'react';

import { MouseEventHandler, ReactNode } from 'react';

export interface IButtonProps {
  id?: string;
  onClick?: MouseEventHandler;
  children?: ReactNode;
}

export default function Button(props: IButtonProps) {
  return <button {...props}>{props.children}</button>;
}
