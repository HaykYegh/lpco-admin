import type { UseFormReturn } from 'react-hook-form';

import { type IdType } from '@wf/components/dist/components/FormElements/Switcher/Switcher';

export interface ILIFQuotaSectionViewProps {
  uomEnabled: number;
  valueEnabled: number;
  netMassEnabled: number;
  grossMasEnabled: number;
  unlimitedEnabled: number;
  taxEnabled: number;
  quotaValue: string;
  handleQuotaConfigChange: (option: IdType, name: string) => void;
  handleChangeQuotaValue: (value: string) => void;
  form?: UseFormReturn;
  type?: string;
}
