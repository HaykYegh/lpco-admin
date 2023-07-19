import { type PopupFormMethods } from '../../../../../store/popupConfigs/types';

import { type IAdditionalFieldItem } from '../../../store/types';

export interface ILAdditionalFieldsRowProps {
  tab: string;
  rowId: number;
  addItionalFields: IAdditionalFieldItem[];
}

export type PopupInfo = {
  id: number;
  mode: keyof typeof PopupFormMethods;
  field: IAdditionalFieldItem;
};
