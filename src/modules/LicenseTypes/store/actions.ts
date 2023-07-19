import { createAction } from '@reduxjs/toolkit';

import type {
  GetLicenseTypeApiPayload,
  GetLicenseTypesApiPayload,
  IGetSendingDataPayload,
  IUpdateLicenseTypeApiPayload,
  LicenseFeesApiPayload,
} from './types';

export const setFeesActionName = 'setFees';
export const setFeesForEditActionName = 'setFeesForEdit';
export const addLicenseFeeActionName = 'addLicenseFee';
export const updateLicenseFeeActionName = 'updateLicenseFee';
export const removeLicenseFeeActionName = 'removeLicenseFee';
export const addLicenseFeeForExtendActionName = 'addLicenseFeeForExtend';
export const updateLicenseFeeForExtendActionName = 'updateLicenseFeeForExtend';
export const removeLicenseFeeForExtendActionName = 'removeLicenseFeeForExtend';

export const getLicenseTypesApi = createAction<GetLicenseTypesApiPayload>('getLicenseTypesApi');
export const getLicenseTypeByCodeApi = createAction<GetLicenseTypeApiPayload>('getLicenseTypeByCodeApi');
export const getLicenseFeesApi = createAction<LicenseFeesApiPayload>('getLicenseFeesApi');
export const getLicenseTypeCodesApi = createAction<GetLicenseTypeApiPayload>('getLicenseTypeCodesApi');
export const getSendingData = createAction<IGetSendingDataPayload>('getSendingData');
export const updateLicenseTypeApi = createAction<IUpdateLicenseTypeApiPayload>('updateLicenseTypeApi');
export const addLicenseTypeApi = createAction<IGetSendingDataPayload>('addLicenseTypeApi');
