import { type ReactElement } from 'react';

import { type IdType } from '@wf/components/dist/components/FormElements/Switcher/Switcher';

export interface ILAppFeesSectionContainer {
  licenseTypeForm?: Record<string, any>;
  title: string;
  feeCalcTypes: Array<ILFeeCalcItem>;
  licenseFeeType: string;
}

export interface ILFeeCalcItem {
  id: IdType;
  text: string | ReactElement;
  rIcon?: string;
}
