import type { MouseEventHandler } from 'react';

export interface IFlexableButton {
  type: string;
  handleClick?: (() => void) | MouseEventHandler;
}

export enum buttonTypes {
  edit = 'edit',
  delete = 'delete',
  update = 'update',
  cancel = 'cancel',
}
