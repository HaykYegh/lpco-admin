import type { EntityId } from '@reduxjs/toolkit';

import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type { OptionsItemType } from '../../../../../../components/TableComponent/TableComponentTypes';
import type { ILAppFeesConfProps } from '../LFeesSectionViewType';

import type { IFeeItem, IFeeItemForm } from '../../../../store/types';

export interface ILFeeTableRowViewProps extends ILAppFeesRowProps, ILAppFeesConfProps {
  item: IFeeItem;
  index: number;
}

export interface ILAppFeesRowProps {
  handleEditFeeInputChange: (value: string) => void;
  editFeeCodeValue: string;
  feesForEditOptions: Array<SelectBaseOption>;
  handleRemoveLFee: (id: EntityId) => void;
  handleEditLFee: (id: EntityId) => void;
  handleCancelLFee: () => void;
  handleUpdateLFee: (data: IFeeItemForm) => void;
  handleSetLicenseFeeEditCode: (select: OptionsItemType, onChange: (select: OptionsItemType) => void) => void;
  editForm: Record<string, any>;
}
