import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type { ILAttTableAddRowViewProps } from './LAttTableAddRowView/LAttTableAddRowViewType';
import type { IAttRowProps } from './LAttachmentTableRowView/LAttachmentTableRowViewType';

import type { IAttachedDocumentItem } from '../../../store/types';

export interface ILAttachmentsSectionViewProps extends IAttRowProps, ILAttTableAddRowViewProps {
  allAttachedDocuments: Array<IAttachedDocumentItem>;
}

export interface ILWApprovalSectionViewTHeaderItem {
  name: string;
  flex: number;
}

export interface ILAttConfProps {
  documentsOptions: Array<SelectBaseOption>;
  productOptions: Array<SelectBaseOption>;
  type?: string;
}
