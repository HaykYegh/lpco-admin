import type { OptionsItemType } from '../../../../../../components/TableComponent/TableComponentTypes';
import type { ILAttConfProps } from '../LAttachmentsSectionViewType';

import type { IAttachedDocumentItemForm } from '../../../../store/types';

export interface ILAttTableAddRowViewProps extends ILAttConfProps {
  handleDocInputChange: (value: string) => void;
  handleProductInputChange: (value: string) => void;
  handleAddAttachment: (data: IAttachedDocumentItemForm) => void;
  handleSetDocumentCode: (select: OptionsItemType, onChange: (select: OptionsItemType) => void) => void;
  form: Record<string, any>;
}
