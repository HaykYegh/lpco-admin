// eslint-disable-next-line max-len
import type { ILFeeCalcItem } from '../../../containers/LicenseType/LFeesSectionContainer/LFeesSectionContainerType';
import type { ILAppFeesTableAddRowViewProps } from './LFeesTableAddRowView/LFeesTableAddRowViewType';
import type { ILAppFeesRowProps } from './LFeesTableRowView/LFeesTableRowViewType';

import type { setFeesActionName, setFeesForEditActionName } from '../../../store/actions';
import type { IFeeItem } from '../../../store/types';

export interface ILAppFeesSectionViewProps extends ILAppFeesRowProps, ILAppFeesTableAddRowViewProps {
  allLicenseFees: Array<IFeeItem>;
  licenseTypeForm?: Record<string, any>;
  lTErrors: Array<IErrorItem>;
  title: string;
  feeCalcTypes: Array<ILFeeCalcItem>;
  licenseFeeType: string;
}

export interface ILWApprovalSectionViewTHeaderItem {
  name: string;
  flex: number;
}

export interface ILAppFeesConfProps {
  type?: string;
  getLicenseFees: (codeValue: string, actionName: typeof setFeesActionName | typeof setFeesForEditActionName) => void;
}
