import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type { AttachedDocumentType } from '../../store/types';

export interface ISpecifyDocumentViewProps<T> {
  handleChange: (option: SelectBaseOption, selected: Record<string, T>) => void;
  licenseTypeOptions: Array<SelectBaseOption>;
  licenseTypeValue: SelectBaseOption;
  handleMinistryChange: (value: string) => void;
  ministriesOptions: Array<SelectBaseOption>;
  ministryCodeValue: SelectBaseOption;
  departmentsOptions: Array<SelectBaseOption>;
  departmentCodeValue: SelectBaseOption;
  documentInfo: AttachedDocumentType | null;
  handleCreateLicenseType: () => void;
  specifyDocumentLoadingState: boolean;
  disabled: boolean;
}
