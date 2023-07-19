import { type PopupInfo } from '../LAdditionalFieldsRow/LAdditionalFieldsRowTypes';

export interface ILAdditionalFieldProps {
  item: Record<string, any>;
  index: number;
  handleShowPopup: (info: PopupInfo) => void;
  handleOpenDeleteColumnConfirmationModal: (columnId: number) => void;
}
