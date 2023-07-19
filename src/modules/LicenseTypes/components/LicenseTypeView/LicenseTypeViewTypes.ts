import type { UseFormReturn } from 'react-hook-form';

export interface ILicenseTypeViewProps {
  licenseTypeCode?: string;
  licenseTypeName?: string;
  licenseTypeNameInNationalLang?: string;
  licenseTypeNature?: string;
  ministryCode?: string;
  departmentCode?: string;
  form?: UseFormReturn;
}
