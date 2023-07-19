import { type PopupInfo } from '../LAdditionalFieldsRow/LAdditionalFieldsRowTypes';

import { type IAdditionalFieldItem } from '../../../store/types';

export interface IAdditionalFieldPopupViewProps {
  handleUpdateAdditionalField: (field: Partial<IAdditionalFieldItem>) => void;
  handleHidePopup: () => void;
  popupInfo: PopupInfo;
}
