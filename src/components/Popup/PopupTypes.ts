import { type ReactElement } from 'react';

export interface IPopupProps extends IWithReactChildren {
  showPopup: boolean;
  title: string | ReactElement;
  handleClosePopup: () => void;
}
