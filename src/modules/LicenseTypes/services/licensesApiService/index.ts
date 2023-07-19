import type { AxiosResponse } from 'axios';

import type {
  IAddConfiguredLicenseParams,
  IConfiguredLicensesParams,
  IFeesParams,
  ILicenseTypeByCodeParams,
  IUpdateConfiguredLicenseParams,
} from './licensesApiServiceTypes';
import { getFormatDateWithHours } from '../../../../helpers/getFormatDateWithHours';

import { request } from '../../../../services/requestService';

export const getConfiguredLicenses = ({
  offset,
  limit,
  licenseTypeCode,
  productListCode,
  date,
  eovOperator = 'IS_NULL',
}: IConfiguredLicensesParams): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    url: 'licenseType/search',
    data: {
      offset,
      max: limit,
      selectFields: [
        'id',
        'licenseTypeCode',
        'ministryCode',
        'licenseTypeName',
        'flow',
        'typeOfUse',
        'quotaType',
        'tariffListCode',
        'eov',
        'dov',
      ],
      restrictBy: 'AND',
      meta: {
        dateOfValidity: date ?? getFormatDateWithHours(),
      },
      restrictions: [
        {
          field: 'licenseTypeCode',
          value: licenseTypeCode,
          operator: 'STARTS_WITH',
        },
        {
          field: 'tariffListCode',
          value: productListCode,
          operator: 'STARTS_WITH',
        },
        {
          field: 'eov',
          operator: eovOperator,
        },
      ],
    },
  });

export const getConfiguredLicenseCodes = ({ licenseTypeCode }: IConfiguredLicensesParams): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    url: 'licenseType/search',
    data: {
      selectFields: ['licenseTypeCode'],
      restrictBy: 'AND',
      meta: {
        dateOfValidity: getFormatDateWithHours(),
      },
      restrictions: [
        {
          field: 'licenseTypeCode',
          value: licenseTypeCode,
          operator: 'STARTS_WITH',
        },
      ],
    },
  });

export const updateConfiguredLicense = ({ id, data }: IUpdateConfiguredLicenseParams): Promise<AxiosResponse> =>
  request({
    method: 'PUT',
    url: `licenseType/${id}`,
    data,
  });

export const addConfiguredLicense = ({ data }: IAddConfiguredLicenseParams): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    url: 'licenseType',
    data,
  });

export const getLicenseTypeByCode = ({
  url = 'licenseType',
  licenseTypeCode,
}: ILicenseTypeByCodeParams): Promise<AxiosResponse> =>
  request({
    method: 'GET',
    url: `${url}/${licenseTypeCode}`,
  });

export const getLicenseFees = ({ feeCodeValue }: IFeesParams): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    url: 'fee/search',
    data: {
      selectFields: ['feeCode', 'feeDescription'],
      restrictBy: 'AND',
      restrictions: [
        {
          field: 'feeCode',
          value: feeCodeValue,
          operator: 'STARTS_WITH',
        },
      ],
    },
  });
