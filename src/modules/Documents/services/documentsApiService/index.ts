import type { AxiosResponse } from 'axios';

import type { IAttachedDocumentParams, IDocumentParams, IDocumentsParams } from './documentsApiParamsTypes';

import { request } from '../../../../services/requestService';

import type { GetDocumentApiPayload } from '../../store/types';
import { RIMM_SERVER } from '../../../../config';

export const getSpecifiedDocuments = ({
  offset,
  limit,
  searchByDocumentCode,
  searchByMinistryCode,
  searchByLicenseType,
}: IDocumentsParams): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    url: 'license/search',
    data: {
      offset,
      max: limit,
      selectFields: [
        'code',
        'description',
        'descriptionTranslated',
        'licenseTypeNature',
        'ministryCode',
        'departmentCode',
      ],
      restrictBy: 'AND',
      restrictions: [
        {
          field: 'code',
          value: searchByDocumentCode,
          operator: 'STARTS_WITH',
        },
        {
          field: 'ministryCode',
          value: searchByMinistryCode,
          operator: 'STARTS_WITH',
        },
        {
          field: 'licenseTypeNature',
          value: searchByLicenseType,
          operator: 'STARTS_WITH',
        },
      ],
    },
  });

export const getAttachedDocuments = ({
  offset,
  limit,
  searchByDocumentCode,
  getInRim,
}: IDocumentsParams): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    baseURL: getInRim ? RIMM_SERVER : undefined,
    url: 'attachedDocument/search',
    data: {
      offset,
      max: limit,
      selectFields: ['code', 'description'],
      restrictBy: 'AND',
      restrictions: [
        {
          field: 'code',
          value: searchByDocumentCode,
          operator: 'STARTS_WITH',
        },
      ],
    },
  });

export const getAttachedDocumentsCodes = ({ code }: GetDocumentApiPayload): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    url: 'attachedDocument/search',
    data: {
      selectFields: ['code'],
      restrictBy: 'AND',
      restrictions: [
        {
          field: 'code',
          value: code,
          operator: 'STARTS_WITH',
        },
      ],
    },
  });

export const getDocumentCodes = ({ code }: IDocumentParams): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    url: 'license/search',
    data: {
      selectFields: ['code'],
      restrictBy: 'AND',
      restrictions: [
        {
          field: 'code',
          value: code,
          operator: 'STARTS_WITH',
        },
      ],
    },
  });

export const getDocumentByCode = ({ code }: IDocumentParams): Promise<AxiosResponse> =>
  request({ method: 'GET', url: `license/${code}` });

export const getDocumentByCodeAndValidFromDate = ({
  code,
  validFromDate,
}: IAttachedDocumentParams): Promise<AxiosResponse> =>
  request({ method: 'GET', baseURL: RIMM_SERVER, url: `attachedDocument/${code}/${validFromDate}` });

export const createLicenseType = ({
  code,
  ministryCode,
  departmentCode,
  licenseTypeNature,
}: IDocumentParams): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    url: 'license',
    data: {
      code,
      ministryCode,
      departmentCode,
      licenseTypeNature,
    },
  });
