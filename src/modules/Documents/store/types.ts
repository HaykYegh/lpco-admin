import type { NavigateFunction } from 'react-router-dom';

import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

export type GetNotSpecifiedDocumentsApiPayload = {
  limit: number;
  offset: number;
  searchByDocumentCode: string;
  getInRim?: boolean;
};

export type GetNotSpecifiedDocumentsCodeApiPayload = {
  code: string;
};

export type GetSpecifiedDocumentsApiPayload = {
  limit: number;
  offset: number;
  searchByDocumentCode?: string;
  searchByMinistryCode?: string;
  searchByLicenseType?: string;
};

export type GetDocumentApiPayload = {
  code: string;
};

export type CreateLicenseTypeApiPayload = {
  code: string;
  ministryCode: string;
  departmentCode?: string;
  licenseTypeNature: string;
  navigate: NavigateFunction;
};

export type NotSpecDocumentType = {
  code: string;
  description: string;
};

export type DocumentType = {
  code: string;
  description: string;
  descriptionTranslated: string;
  licenseTypeNature: string;
  ministryCode: string;
  departmentCode: string;
};

export type AttachedDocumentType = {
  code: string;
  description: string;
  descriptionTranslated: string;
};

export type DocumentsType = {
  resultList: Array<DocumentType>;
  totalCount: number;
};

export type AttachedDocumentsType = {
  resultList: Array<AttachedDocumentType>;
  totalCount: number;
};

export type DocumentsState = {
  notSpecifiedDocuments: Array<AttachedDocumentType>;
  notSpecifiedDocumentsCodes: Array<GetDocumentApiPayload>;
  specifiedDocuments: Array<DocumentType>;
  documentByCode: DocumentType | null;
  notSpecifiedDocumentByCode: AttachedDocumentType | null;
  notSpecifiedDocumentsCount: number;
  specifiedDocumentsCount: number;
  notSpecifiedDocumentsLoading: boolean;
  specifiedDocumentsLoading: boolean;
  specifyDocumentLoading: boolean;
  documentCodes: Array<DocumentType>;
};

export type searchStateType = {
  documentCode: SelectBaseOption;
  licenseType: SelectBaseOption;
  ministryCode: SelectBaseOption;
};

export type selectStateType = {
  departmentCode: SelectBaseOption;
  licenseType: SelectBaseOption;
  ministryCode: SelectBaseOption;
};

export enum NatureOfLicenseItems {
  LPCO = 'LPCO',
  EPHYTO = 'EPHYTO',
  EXEMPTION = 'EXEMPTION',
}
