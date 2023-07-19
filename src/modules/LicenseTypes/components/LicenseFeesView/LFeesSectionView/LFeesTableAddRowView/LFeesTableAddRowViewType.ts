import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type { OptionsItemType } from '../../../../../../components/TableComponent/TableComponentTypes';
import type { ILAppFeesConfProps } from '../LFeesSectionViewType';

import type { IFeeItemForm } from '../../../../store/types';

export interface ILAppFeesTableAddRowViewProps extends ILAppFeesConfProps {
  handleFeeInputChange: (value: string) => void;
  feeCodeValue: string;
  fixedMode: boolean;
  feesOptions: Array<SelectBaseOption>;
  handleAddLFee: (data: IFeeItemForm) => void;
  handleSetLicenseFeeCode: (select: OptionsItemType, onChange: (select: OptionsItemType) => void) => void;
  form: Record<string, any>;
}
