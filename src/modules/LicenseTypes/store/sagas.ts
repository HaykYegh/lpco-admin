import { call, type ForkEffect, put, select, take, takeLatest } from 'redux-saga/effects';
import type { EntityId, EntityState } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';

import { toasterEmitter } from '@wf/components';

import { createObjectFromDataWithoutDisProps } from '../../../helpers/createObjectFromDataWithoutDisProps';
import { combineSameFieldsFromData } from '../../../helpers/combineSameFieldsFromData';
import { createArrayWithEntityIds } from '../../../helpers/createArrayWithEntityIds';
import { licenseFeeTypes } from '../components/LicenseFeesView/LicenseFeesViewTypes';
import { approvalsAdapter, documentsAdapter, feesAdapter } from './entityAdapters';
import { createArrayFromItemsArr } from '../../../helpers/createArrayFromItemsArr';
import { mutateDataFromEntities } from '../../../helpers/mutateDataFromEntities';
import { filterDataByPropName } from '../../../helpers/filterDataByPropName';
import { getErrors } from '../../../helpers/getErrors';

import {
  addConfiguredLicense,
  getConfiguredLicenseCodes,
  getConfiguredLicenses,
  getLicenseFees,
  getLicenseTypeByCode,
  updateConfiguredLicense,
} from '../services/licensesApiService';

import {
  approvalDisablePropsObj,
  attDocumentsDisablePropsObj,
  feeDisablePropsObj,
  licenseTypeDisablePropsObj,
  transitionDisablePropsObj,
} from '../constants';
import { feeMode, type IAdditionalFieldsState, stampIdPropName } from './types';

import type {
  FeesResponseType,
  IApprovalProps,
  IAprovalsEntityProps,
  IAprovalsPayload,
  IApTransitionsEntityProps,
  IAttachedDocumentItem,
  IFeatureFlagsProps,
  IFeeItem,
  ILicenseTypeByCodeProps,
  ILicenseTypeProps,
  ILTypeErrorsProps,
  ISameErrorFieldsItem,
  ISendingLicenseType,
  ITransitionItem,
  LicenseTypesType,
} from './types';
import {
  licenseErrorMessagesSelector,
  licenseTypeAprovalsByCodeSelector,
  licenseTypeApTransitionsByCodeSelector,
  licenseTypeAttDocumentsByCodeSelector,
  licenseTypeFeesByCodeSelector,
  licenseTypeFeesForExtendByCodeSelector,
  licenseTypeSelector,
  sendingDataSelector,
} from './selectors';
import {
  combineAdditionalFieldsAPIData,
  combineAdditionalFieldsStateData,
  getApprovalsWithSortParam,
} from '../helpers';
import type { IUploadsEntityProps } from '../../../store/uploads/types';
import { uploadsDataSelector } from '../../../store/uploads/selectors';
import * as uploadsSlicesActions from '../../../store/uploads/slices';
import * as slicesActions from './slices';
import * as actions from './actions';

function* getLicenseTypesApi(action: ReturnType<typeof actions.getLicenseTypesApi>) {
  const {
    payload: { id, limit, offset, licenseTypeCode, productListCode, date, eovOperator = 'IS_NULL' },
  } = action;

  try {
    const { data }: AxiosResponse<LicenseTypesType> = yield call(getConfiguredLicenses, {
      limit,
      offset,
      licenseTypeCode,
      productListCode,
      eovOperator,
      date,
    });
    const licenseTypeInfo: ILicenseTypeByCodeProps = yield select(licenseTypeSelector);

    if (id) {
      yield put(
        slicesActions.updateLicenseType({
          id,
          changes: {
            historizedData: data.resultList,
            loader: false,
          },
        })
      );
    } else {
      yield put(slicesActions.setLicenseTypesData(data.resultList));
      yield put(slicesActions.setlicenseTypesCount(data.totalCount));
    }
  } catch (err) {
    console.error(err);
  }
}

function* getLicenseTypeByCodeApi(action: ReturnType<typeof actions.getLicenseTypeByCodeApi>) {
  const {
    payload: { licenseTypeCode, url },
  } = action;

  try {
    const {
      data: { featureFlags, approvals, fees, attachedDocuments, additionalFields, ...licenseTypeProps },
    }: AxiosResponse<ILicenseTypeProps> = yield call(getLicenseTypeByCode as never, {
      licenseTypeCode,
      url,
    });

    const licenseTypeByCodeParams = {
      ...licenseTypeProps,
      applicationFeeMode: licenseTypeProps.applicationFeeMode ?? feeMode.NONE,
      extensionFeeMode: licenseTypeProps.extensionFeeMode ?? feeMode.NONE,
    };

    const transitions: Array<ITransitionItem> = createArrayFromItemsArr(approvals as never, 'transitions');
    const approvalsData: Array<IApprovalProps> = createArrayWithEntityIds(approvals as never, ['transitions']);
    const feesData: Array<IFeeItem> = filterDataByPropName(fees as never, 'feeType', licenseFeeTypes.APPLICATION_FEE);
    const feesForExtendData: Array<IFeeItem> = filterDataByPropName(
      fees as never,
      'feeType',
      licenseFeeTypes.EXTENSION_FEE
    );

    yield put(slicesActions.setLicenseTypeByCode(licenseTypeByCodeParams));
    yield put(slicesActions.setLicenseTypeFeatureFlags(featureFlags as IFeatureFlagsProps));
    yield put(
      slicesActions.setAllAprovals({
        transitions,
        approvalsData,
      } as IAprovalsPayload)
    );
    yield put(slicesActions.setAllAttachedDocuments(attachedDocuments as IAttachedDocumentItem[]));
    yield put(slicesActions.setAllLicenseFees(feesData));
    yield put(slicesActions.setAllLicenseFeesForExtend(feesForExtendData));

    const fields = combineAdditionalFieldsStateData(additionalFields) as IAdditionalFieldsState;

    yield put(slicesActions.setAllAdditionalFields(fields));

    if (licenseTypeProps[stampIdPropName]) {
      yield put(
        uploadsSlicesActions.addUpload({
          fieldName: stampIdPropName,
          uploadedFileName: licenseTypeProps[stampIdPropName],
          isNotUploadedYet: true,
        })
      );
    }
  } catch (err) {
    console.error(err);
  }
}

function* getLicenseFeesApi(action: ReturnType<typeof actions.getLicenseFeesApi>) {
  const {
    payload: { feeCodeValue, actionName },
  } = action;

  try {
    const { data }: AxiosResponse<FeesResponseType> = yield call(getLicenseFees, {
      feeCodeValue,
    });

    yield put(slicesActions[actionName](data.resultList));
  } catch (err) {
    console.error(err);
  }
}

function* getLicenseTypeCodesApi(action: ReturnType<typeof actions.getLicenseTypesApi>) {
  const {
    payload: { licenseTypeCode },
  } = action;

  try {
    const { data }: AxiosResponse<LicenseTypesType> = yield call(getConfiguredLicenseCodes, {
      licenseTypeCode,
    });
    yield put(slicesActions.setLicenseTypeCodes(data.resultList));
  } catch (err) {
    console.error(err);
  }
}

function* getSendingData(action: ReturnType<typeof actions.updateLicenseTypeApi>) {
  const {
    payload: { dataForm },
  } = action;

  try {
    const approvalsAdapterSelectors = approvalsAdapter.getSelectors();
    const documentsAdapterSelectors = documentsAdapter.getSelectors();
    const feesSelectors = feesAdapter.getSelectors();
    const uploadsDataState: IUploadsEntityProps = yield select(uploadsDataSelector);
    const isNotUploadedYet = uploadsDataState?.entities?.[stampIdPropName]?.isNotUploadedYet;
    const uploadedFileName = uploadsDataState?.entities?.[stampIdPropName]?.uploadedFileName ?? null;
    const licenseTypeProps = {
      ...dataForm,
      tariffListCode: dataForm?.tariffListCode?.value,
      flow: dataForm?.flow?.value,
      typeOfUse: dataForm?.typeOfUse?.value,
      quotaType: dataForm?.quotaType?.value,
      quotaTaxCode: dataForm?.quotaTaxCode || null,
      paymentFlow: dataForm?.paymentFlow?.value,
      [stampIdPropName]: isNotUploadedYet ? null : uploadedFileName,
    };

    const licenseTypeState: Record<string, keyof ILicenseTypeByCodeProps> = yield select(licenseTypeSelector);
    const featureFlags = createObjectFromDataWithoutDisProps(dataForm as never, licenseTypeState);
    const licenseTypePropsObj: Record<string, keyof ILicenseTypeByCodeProps> = createObjectFromDataWithoutDisProps(
      licenseTypeProps as Record<string, any>,
      { ...licenseTypeDisablePropsObj, ...featureFlags }
    );

    const approvalState: IAprovalsEntityProps = yield select(licenseTypeAprovalsByCodeSelector);
    const approvalEntities: Array<IApprovalProps> = approvalsAdapterSelectors.selectAll(approvalState);
    const transitionsState: IApTransitionsEntityProps = yield select(licenseTypeApTransitionsByCodeSelector);
    const approvals = mutateDataFromEntities(approvalEntities, approvalDisablePropsObj, [
      {
        entities: transitionsState.entities,
        dataProp: 'transitionsArr',
        mutateProp: 'transitions',
        disablePropsObj: transitionDisablePropsObj,
      },
    ]);
    const approvalsWithSortParams = getApprovalsWithSortParam(approvals);
    const attachedDocumentsState: EntityState<IAttachedDocumentItem> = yield select(
      licenseTypeAttDocumentsByCodeSelector
    );
    const attachedDocumentsEntities: IAttachedDocumentItem[] =
      documentsAdapterSelectors.selectAll(attachedDocumentsState);
    const attachedDocuments = mutateDataFromEntities(attachedDocumentsEntities, attDocumentsDisablePropsObj);

    const appFeeFixedMode = dataForm?.applicationFeeMode === feeMode.FIXED;
    const feesState: EntityState<IFeeItem> = yield select(licenseTypeFeesByCodeSelector);
    const feesEntities: IFeeItem[] = feesSelectors.selectAll(feesState);
    const fees = appFeeFixedMode ? mutateDataFromEntities(feesEntities, feeDisablePropsObj) : [];

    const extFeeFixedMode = dataForm?.extensionFeeMode === feeMode.FIXED;
    const feesForExtendState: EntityState<IFeeItem> = yield select(licenseTypeFeesForExtendByCodeSelector);
    const feesForExtendEntities: IFeeItem[] = feesSelectors.selectAll(feesForExtendState);
    const feesForExtend = extFeeFixedMode ? mutateDataFromEntities(feesForExtendEntities, feeDisablePropsObj) : [];

    const additionalFields = combineAdditionalFieldsAPIData(dataForm.additionalFields as IAdditionalFieldsState);

    const sendingData = {
      ...licenseTypePropsObj,
      featureFlags,
      approvals: approvalsWithSortParams,
      attachedDocuments,
      fees: [...fees, ...feesForExtend],
      additionalFields,
    };

    yield put(slicesActions.setSendingData(sendingData as unknown as ISendingLicenseType));
  } catch (errors) {
    console.error(errors);
  }
}

function* updateLicenseTypeApi(action: ReturnType<typeof actions.updateLicenseTypeApi>) {
  const {
    payload: { id, dataForm },
  } = action;

  try {
    const licenseTypeErrors: ILTypeErrorsProps = yield select(licenseErrorMessagesSelector);
    yield put(actions.getSendingData({ dataForm }));
    yield take(slicesActions.setSendingData.type);
    const sendingData: ISendingLicenseType = yield select(sendingDataSelector);
    yield put(slicesActions.setAllAdditionalFields(dataForm.additionalFields));

    const {
      data: {
        featureFlags: featureFlagsOpt,
        approvals: approvalsOpt,
        fees: feesOpt,
        attachedDocuments: attachedDocumentsOpt,
        additionalFields: additionalFieldsOpt,
        ...licenseTypeConfigs
      },
    }: AxiosResponse<ILicenseTypeProps> = yield call(updateConfiguredLicense, {
      id: id as number,
      data: sendingData,
    });

    const uploadParams = {
      fieldName: stampIdPropName,
      uploadedFileName: licenseTypeConfigs[stampIdPropName] as string,
      isNotUploadedYet: true,
    };
    yield put(uploadsSlicesActions.updateUpload({ id: stampIdPropName as EntityId, changes: uploadParams }));

    yield put(slicesActions.setSendingData(null));

    toasterEmitter({
      title: 'Info Message',
      type: 'dark',
      status: 'success',
      description: 'Data updated successfully',
    });

    if (licenseTypeErrors.ids.length) {
      yield put(slicesActions.setlicenseTypeErrors([]));
    }
  } catch (errors) {
    const lTypeErrors = combineSameFieldsFromData(errors as never, 'field') as ISameErrorFieldsItem[];
    yield put(slicesActions.setlicenseTypeErrors(lTypeErrors));
    getErrors(errors as Array<IErrorItem>);
    console.error(errors);
  }
}

function* addLicenseTypeApi(action: ReturnType<typeof actions.updateLicenseTypeApi>) {
  const {
    payload: { dataForm },
  } = action;

  try {
    const licenseTypeErrors: ILTypeErrorsProps = yield select(licenseErrorMessagesSelector);
    yield put(actions.getSendingData({ dataForm }));
    yield take(slicesActions.setSendingData.type);
    const sendingData: ISendingLicenseType = yield select(sendingDataSelector);
    yield put(slicesActions.setAllAdditionalFields(dataForm.additionalFields));

    const {
      data: {
        featureFlags: featureFlagsOpt,
        approvals: approvalsOpt,
        fees: feesOpt,
        attachedDocuments: attachedDocumentsOpt,
        additionalFields: additionalFieldsOpt,
        ...licenseTypeConfigs
      },
    }: AxiosResponse<ILicenseTypeProps> = yield call(addConfiguredLicense, {
      data: sendingData,
    });

    yield put(slicesActions.setSendingData(null));

    toasterEmitter({
      title: 'Info Message',
      type: 'dark',
      status: 'success',
      description: 'Data created successfully',
    });

    if (licenseTypeErrors.ids.length) {
      yield put(slicesActions.setlicenseTypeErrors([]));
    }
  } catch (errors) {
    const lTypeErrors = combineSameFieldsFromData(errors as never, 'field') as ISameErrorFieldsItem[];
    yield put(slicesActions.setlicenseTypeErrors(lTypeErrors));
    getErrors(errors as Array<IErrorItem>);
    console.error(errors);
  }
}

export function* watchLicenseTypesSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getLicenseTypesApi.type, getLicenseTypesApi);
  yield takeLatest(actions.getLicenseTypeByCodeApi.type, getLicenseTypeByCodeApi);
  yield takeLatest(actions.getLicenseFeesApi.type, getLicenseFeesApi);
  yield takeLatest(actions.getLicenseTypeCodesApi.type, getLicenseTypeCodesApi);
  yield takeLatest(actions.getSendingData.type, getSendingData);
  yield takeLatest(actions.updateLicenseTypeApi.type, updateLicenseTypeApi);
  yield takeLatest(actions.addLicenseTypeApi.type, addLicenseTypeApi);
}
