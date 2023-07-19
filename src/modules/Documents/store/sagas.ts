import { call, type ForkEffect, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { toasterEmitter } from '@wf/components';

import { getValidFromDate } from '../../../helpers/getValidFromDate';
import { appPaths } from '../../../constatnts/appPaths';

import {
  createLicenseType,
  getAttachedDocuments,
  getAttachedDocumentsCodes,
  getDocumentByCode,
  getDocumentByCodeAndValidFromDate,
  getDocumentCodes,
  getSpecifiedDocuments,
} from '../services/documentsApiService';

import type { AttachedDocumentsType, AttachedDocumentType, DocumentsType, DocumentType } from './types';
import * as slicesActions from './slices';
import * as actions from './actions';

function* getNotSpecifiedDocumentsApi(action: ReturnType<typeof actions.getNotSpecifiedDocumentsApi>) {
  const {
    payload: { limit, offset, searchByDocumentCode, getInRim },
  } = action;

  try {
    const { data }: AxiosResponse<AttachedDocumentsType> = yield call(getAttachedDocuments, {
      limit,
      offset,
      searchByDocumentCode,
      getInRim,
    });

    yield put(slicesActions.setNotSpecifiedDocuments(data.resultList));
    yield put(slicesActions.setNotSpecifiedDocumentsCount(data.totalCount));
  } catch (err) {
    console.error(err);
  }
}

function* getNotSpecifiedDocumentsCodesApi(action: ReturnType<typeof actions.getNotSpecifiedDocumentsCodesApi>) {
  const {
    payload: { code },
  } = action;

  try {
    const { data }: AxiosResponse<AttachedDocumentsType> = yield call(getAttachedDocumentsCodes, {
      code,
    });

    yield put(slicesActions.setNotSpecifiedDocumentsCodes(data.resultList));
  } catch (err) {
    console.error(err);
  }
}

function* getNotSpecifiedDocumentApi(action: ReturnType<typeof actions.getNotSpecifiedDocumentApi>) {
  const {
    payload: { code },
  } = action;

  try {
    const validFromDate: string = getValidFromDate();

    const { data }: AxiosResponse<AttachedDocumentType> = yield call(getDocumentByCodeAndValidFromDate, {
      code,
      validFromDate,
    });

    yield put(slicesActions.setNotSpecifiedDocument(data));
  } catch (err) {
    console.error(err);
  }
}

function* getSpecifiedDocumentsApi(action: ReturnType<typeof actions.getSpecifiedDocumentsApi>) {
  const {
    payload: { limit, offset, searchByDocumentCode, searchByLicenseType, searchByMinistryCode },
  } = action;

  try {
    const { data }: AxiosResponse<DocumentsType> = yield call(getSpecifiedDocuments, {
      limit,
      offset,
      searchByDocumentCode,
      searchByLicenseType,
      searchByMinistryCode,
    });
    yield put(slicesActions.setSpecifiedDocuments(data.resultList));
    yield put(slicesActions.setSpecifiedDocumentsCount(data.totalCount));
  } catch (err) {
    console.error(err);
  }
}

function* getDocumentCodesApi(action: ReturnType<typeof actions.getDocumentCodesApi>) {
  const {
    payload: { code },
  } = action;

  try {
    const { data }: AxiosResponse<DocumentsType> = yield call(getDocumentCodes, {
      code,
    });
    yield put(slicesActions.setDocumentCodes(data.resultList));
  } catch (err) {
    console.error(err);
  }
}

function* getDocumentApi(action: ReturnType<typeof actions.getDocumentApi>) {
  const {
    payload: { code },
  } = action;

  try {
    const { data }: AxiosResponse<DocumentType> = yield call(getDocumentByCode, { code });

    yield put(slicesActions.setDocument(data));
  } catch (err) {
    console.error(err);
  }
}

function* createLicenseTypeApi(action: ReturnType<typeof actions.createLicenseTypeApi>) {
  const {
    payload: { code, ministryCode, departmentCode, licenseTypeNature, navigate },
  } = action;

  try {
    yield put(slicesActions.setSpecifyDocumentLoading(true));
    yield call(createLicenseType, {
      code,
      ministryCode,
      departmentCode,
      licenseTypeNature,
    });

    toasterEmitter({
      title: 'Info Message',
      type: 'dark',
      status: 'success',
      description: 'Data created successfully',
    });
    yield put(slicesActions.setSpecifyDocumentLoading(false));
    navigate(`${appPaths.attachedDocuments}/view/${code}`);
  } catch (errors: any) {
    yield put(slicesActions.setSpecifyDocumentLoading(false));
    errors.forEach((item: IErrorItem) => {
      toasterEmitter({
        title: 'Error Message',
        status: 'error',
        description: item.messageCode,
      });
    });
  }
}

export function* watchDocumentsSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getNotSpecifiedDocumentsApi.type, getNotSpecifiedDocumentsApi);
  yield takeLatest(actions.getNotSpecifiedDocumentsCodesApi.type, getNotSpecifiedDocumentsCodesApi);
  yield takeLatest(actions.getNotSpecifiedDocumentApi.type, getNotSpecifiedDocumentApi);
  yield takeLatest(actions.getSpecifiedDocumentsApi.type, getSpecifiedDocumentsApi);
  yield takeLatest(actions.getDocumentCodesApi.type, getDocumentCodesApi);
  yield takeLatest(actions.getDocumentApi.type, getDocumentApi);
  yield takeLatest(actions.createLicenseTypeApi.type, createLicenseTypeApi);
}
