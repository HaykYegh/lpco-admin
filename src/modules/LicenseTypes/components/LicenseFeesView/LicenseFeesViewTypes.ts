import type { UseFormReturn } from 'react-hook-form';

export interface ILicenseFeesView {
  form?: UseFormReturn;
}

export enum licenseFeeTypes {
  APPLICATION_FEE = 'APPLICATION_FEE',
  EXTENSION_FEE = 'EXTENSION_FEE',
}
