export interface IHeaderComponent {
  title: string;
  link?: string;
  actions?: Array<ActionType> | null;
}

export type ActionType = {
  field: HeaderItems;
  text?: string;
  color?: ColorType;
  ghost?: boolean;
  name: string;
  link?: string;
  handleSubmit?: () => void;
};

export type ColorType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'caution'
  | 'typography'
  | 'background'
  | undefined;

export enum HeaderItems {
  button = 'Button',
}
