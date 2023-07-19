// eslint-disable-next-line max-len
import type { EntityId } from '@reduxjs/toolkit';

import type { OptionsItemType } from '../../../../../../components/TableComponent/TableComponentTypes';
import type { ILAttConfProps } from '../LAttachmentsSectionViewType';

import type { IAttachedDocumentItem, IAttachedDocumentItemForm } from '../../../../store/types';

export interface ILAttachmentTableRowViewProps extends IAttRowProps, ILAttConfProps {
  item: IAttachedDocumentItem;
  index: number;
}

export interface IAttRowProps {
  handleEditDocInputChange: (value: string) => void;
  handleEditProductInputChange: (value: string) => void;
  handleRemoveAttachment: (id: EntityId) => void;
  handleEditAttachment: (id: EntityId) => void;
  handleCancelAttachment: () => void;
  handleUpdateAttachment: (data: IAttachedDocumentItemForm) => void;
  handleSetDocumentEditCode: (select: OptionsItemType, onChange: (select: OptionsItemType) => void) => void;
  editForm: Record<string, any>;
}
