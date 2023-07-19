import type { ISendingLicenseType } from '../../store/types';

export interface IConfiguredLicensesParams {
  offset?: number;
  limit?: number;
  licenseTypeCode?: string;
  productListCode?: string;
  date?: string;
  eovOperator?: string;
}

export interface ILicenseTypeByCodeParams {
  licenseTypeCode: string;
  url?: string;
}

export interface IFeesParams {
  feeCodeValue: string;
}

export interface IUpdateConfiguredLicenseParams extends IAddConfiguredLicenseParams {
  id: number;
}

export interface IAddConfiguredLicenseParams {
  data: ISendingLicenseType;
}
