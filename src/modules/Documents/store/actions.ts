import { createAction } from '@reduxjs/toolkit';

import type {
  CreateLicenseTypeApiPayload,
  GetDocumentApiPayload,
  GetNotSpecifiedDocumentsApiPayload,
  GetNotSpecifiedDocumentsCodeApiPayload,
  GetSpecifiedDocumentsApiPayload,
} from './types';

export const getNotSpecifiedDocumentsApi =
  createAction<GetNotSpecifiedDocumentsApiPayload>('getNotSpecifiedDocumentsApi');

export const getNotSpecifiedDocumentsCodesApi = createAction<GetNotSpecifiedDocumentsCodeApiPayload>(
  'getNotSpecifiedDocumentsCodesApi'
);

export const getNotSpecifiedDocumentApi = createAction<GetDocumentApiPayload>('getNotSpecifiedDocumentApi');

export const getSpecifiedDocumentsApi = createAction<GetSpecifiedDocumentsApiPayload>('getSpecifiedDocumentsApi');

export const getDocumentApi = createAction<GetDocumentApiPayload>('getDocumentApi');

export const createLicenseTypeApi = createAction<CreateLicenseTypeApiPayload>('createLicenseTypeApi');

export const getDocumentCodesApi = createAction<GetDocumentApiPayload>('getDocumentCodesApi');
