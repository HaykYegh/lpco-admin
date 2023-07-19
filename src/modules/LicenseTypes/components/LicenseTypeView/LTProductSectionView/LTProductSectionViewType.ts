import type { UseFormReturn } from 'react-hook-form';

import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

export interface ILTProductSectionViewProps {
  onInputChange: (value: string) => void;
  licenseTypeOptions: Array<SelectBaseOption>;
  productCodeValue: string;
  form?: UseFormReturn;
  type: string | undefined;
}
