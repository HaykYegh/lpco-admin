import type { SwitcherItemType } from '../../components/SwitcherComponent/SwitcherComponentTypes';
import type { OptionsItemType } from '../../components/TableComponent/TableComponentTypes';

import {
  AFTERPROCESSING,
  BEFOREPROCESSING,
  EXPORT,
  IMPORRT,
  MANUAL,
  MULTIPLEOPTION,
  NUM_OF_DAYS,
  PERMANENT,
  SINGLEOPTION,
} from './constants';
import { feeMode } from './store/types';

export const flowItems: Array<OptionsItemType> = [
  {
    label: 'Import',
    value: IMPORRT,
  },
  {
    label: 'Export',
    value: EXPORT,
  },
];

export const paymentFlowItems: Array<OptionsItemType> = [
  {
    label: 'After Processing',
    value: AFTERPROCESSING,
  },
  {
    label: 'Before Processing',
    value: BEFOREPROCESSING,
  },
];

export const typeOfUseItems: Array<OptionsItemType> = [
  {
    label: 'Single Use',
    value: SINGLEOPTION,
  },
  {
    label: 'Multiple Use',
    value: MULTIPLEOPTION,
  },
];

export const startDateValidityTypeItems: Array<SwitcherItemType> = [
  {
    id: MANUAL,
    text: 'Manual',
  },
  {
    id: NUM_OF_DAYS,
    text: 'Approval Date',
  },
];

export const endDateValidityTypeItems: Array<SwitcherItemType> = [
  {
    id: MANUAL,
    text: 'Manual',
  },
  {
    id: PERMANENT,
    text: 'Permanent',
  },
  {
    id: NUM_OF_DAYS,
    text: 'Number of Days',
  },
];

export const licenseAppFeeTypeItems: Array<SwitcherItemType> = [
  {
    id: feeMode.NONE,
    text: 'No Fee',
    rIcon: 'il_info',
  },
  {
    id: feeMode.CALCULATED,
    text: 'Calculated Fee',
    rIcon: 'il_info',
  },
  {
    id: feeMode.FIXED,
    text: 'Fixed Fee',
    rIcon: 'il_info',
  },
];

export const licenseExtFeeTypeItems: Array<SwitcherItemType> = [
  {
    id: feeMode.NONE,
    text: 'No Fee',
    rIcon: 'il_info',
  },
  {
    id: feeMode.FIXED,
    text: 'Fixed Fee',
    rIcon: 'il_info',
  },
];
