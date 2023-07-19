import { createSlice, type EntityId, type PayloadAction, type Update } from '@reduxjs/toolkit';

import {
  approvalsAdapter,
  documentsAdapter,
  feesAdapter,
  feesAdapterForExtend,
  historizedLTypeAdapter,
  lTypeAdapter,
  lTypeErrorsAdapter,
  transitionsAdapter,
} from './entityAdapters';
import { defaultLicenseTypeByCode, defaultLicenseTypeFeatureFlagsByCode, initialState } from './initialState';

import { type IAdditionalFieldsState, type LicenseTypesStateWithDraft } from './types';

import type {
  FeeType,
  IApprovalProps,
  IAprovalsPayload,
  IAttachedDocumentItem,
  IFeatureFlagsProps,
  IFeeItem,
  ILicenseTypeByCodeProps,
  ISameErrorFieldsItem,
  ISendingLicenseType,
  IsetLicenseTypeStateConfigs,
  ITransitionItem,
  ITransitionItemParams,
  LicenseType,
} from './types';

export const licenseTypes = createSlice({
  name: 'licenseTypes',
  initialState,
  reducers: {
    setLicenseTypesData: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<Array<LicenseType>>) => {
      lTypeAdapter.setAll(state.data, payload);
    },

    updateLicenseType: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<Update<LicenseType>>) => {
      lTypeAdapter.updateOne(state.data, payload);
    },

    addHistorizedLicenseTypes: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<Array<LicenseType>>) => {
      historizedLTypeAdapter.addMany(state.historizedLicenseTypes, payload);
    },

    setLicenseTypeCodes: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<Array<LicenseType>>) => {
      state.licenseTypeCodes = payload;
    },

    setLicenseTypeByCode: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<ILicenseTypeByCodeProps>) => {
      state.licenseTypeByCode = payload;
    },

    initializeDefaultData: (state: LicenseTypesStateWithDraft) => {
      state.licenseTypeByCode = defaultLicenseTypeByCode;
      state.licenseTypeFeatureFlagsByCode = defaultLicenseTypeFeatureFlagsByCode;
      approvalsAdapter.setAll(state.licenseTypeAprovalsByCode, []);
      transitionsAdapter.setAll(state.licenseTypeApTransitionsByCode, []);
      documentsAdapter.setAll(state.licenseTypeAttDocumentsByCode, []);
      feesAdapter.setAll(state.licenseTypeFeesByCode, []);
      feesAdapterForExtend.setAll(state.licenseTypeFeesForExtendByCode, []);
    },

    setAllAprovals: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<IAprovalsPayload>) => {
      approvalsAdapter.setAll(state.licenseTypeAprovalsByCode, payload.approvalsData);
      transitionsAdapter.setAll(state.licenseTypeApTransitionsByCode, payload.transitions);
    },

    addApproval: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<IApprovalProps>) => {
      approvalsAdapter.addOne(state.licenseTypeAprovalsByCode, payload);
    },

    updateApproval: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<Update<IApprovalProps>>) => {
      approvalsAdapter.updateOne(state.licenseTypeAprovalsByCode, payload);
    },

    removeApproval: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<EntityId>) => {
      approvalsAdapter.removeOne(state.licenseTypeAprovalsByCode, payload);
    },

    addTransition: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<ITransitionItem>) => {
      transitionsAdapter.addOne(state.licenseTypeApTransitionsByCode, payload);
    },

    updateTransition: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<Update<ITransitionItem>>) => {
      transitionsAdapter.updateOne(state.licenseTypeApTransitionsByCode, payload);
    },

    removeTransition: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<EntityId>) => {
      transitionsAdapter.removeOne(state.licenseTypeApTransitionsByCode, payload);
    },

    setAllAttachedDocuments: (
      state: LicenseTypesStateWithDraft,
      { payload }: PayloadAction<Array<IAttachedDocumentItem>>
    ) => {
      documentsAdapter.setAll(state.licenseTypeAttDocumentsByCode, payload);
    },

    addAttachment: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<IAttachedDocumentItem>) => {
      documentsAdapter.addOne(state.licenseTypeAttDocumentsByCode, payload);
    },

    removeAttachment: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<EntityId>) => {
      documentsAdapter.removeOne(state.licenseTypeAttDocumentsByCode, payload);
    },

    updateAttachment: (
      state: LicenseTypesStateWithDraft,
      { payload }: PayloadAction<Update<IAttachedDocumentItem>>
    ) => {
      documentsAdapter.updateOne(state.licenseTypeAttDocumentsByCode, payload);
    },

    setAllLicenseFees: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<Array<IFeeItem>>) => {
      feesAdapter.setAll(state.licenseTypeFeesByCode, payload);
    },

    addLicenseFee: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<IFeeItem>) => {
      feesAdapter.addOne(state.licenseTypeFeesByCode, payload);
    },

    removeLicenseFee: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<EntityId>) => {
      feesAdapter.removeOne(state.licenseTypeFeesByCode, payload);
    },

    updateLicenseFee: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<Update<IFeeItem>>) => {
      feesAdapter.updateOne(state.licenseTypeFeesByCode, payload);
    },

    setAllLicenseFeesForExtend: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<Array<IFeeItem>>) => {
      feesAdapterForExtend.setAll(state.licenseTypeFeesForExtendByCode, payload);
    },

    addLicenseFeeForExtend: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<IFeeItem>) => {
      feesAdapterForExtend.addOne(state.licenseTypeFeesForExtendByCode, payload);
    },

    removeLicenseFeeForExtend: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<EntityId>) => {
      feesAdapterForExtend.removeOne(state.licenseTypeFeesForExtendByCode, payload);
    },

    updateLicenseFeeForExtend: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<Update<IFeeItem>>) => {
      feesAdapterForExtend.updateOne(state.licenseTypeFeesForExtendByCode, payload);
    },

    setLicenseTypeFeatureFlags: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<IFeatureFlagsProps>) => {
      state.licenseTypeFeatureFlagsByCode = payload;
    },

    setLicenseTypeStateConfigs: (
      state: LicenseTypesStateWithDraft,
      { payload }: PayloadAction<IsetLicenseTypeStateConfigs>
    ) => {
      state.licenseTypeByCode = payload.licenseTypeByCode;
      state.licenseTypeFeatureFlagsByCode = payload.licenseTypeFeatureFlagsByCode;
    },

    setlicenseTypeErrors: (
      state: LicenseTypesStateWithDraft,
      { payload }: PayloadAction<Array<ISameErrorFieldsItem>>
    ) => {
      lTypeErrorsAdapter.setAll(state.licenseTypeErrors, payload);
    },

    setlicenseTypesLoading: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<boolean>) => {
      state.licenseTypesLoading = payload;
    },

    setlicenseTypesCount: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<number>) => {
      state.licenseTypesCount = payload;
    },

    setTransitionItemParams: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<ITransitionItemParams>) => {
      state.transitionItemParams = payload;
    },

    setSendingData: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<ISendingLicenseType | null>) => {
      state.sendingData = payload;
    },

    setFees: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<Array<FeeType>>) => {
      state.fees = payload;
    },

    setFeesForEdit: (state: LicenseTypesStateWithDraft, { payload }: PayloadAction<Array<FeeType>>) => {
      state.feesForEdit = payload;
    },

    setAllAdditionalFields: (
      state: LicenseTypesStateWithDraft,
      { payload }: PayloadAction<Nullable<IAdditionalFieldsState>>
    ) => {
      state.licenseTypeAdditionalFieldsByCode = payload;
    },
  },
});

export const {
  setLicenseTypesData,
  updateLicenseType,
  addHistorizedLicenseTypes,
  setLicenseTypeCodes,
  setAllAprovals,
  addApproval,
  updateApproval,
  removeApproval,
  setAllAttachedDocuments,
  addAttachment,
  updateAttachment,
  removeAttachment,
  setAllLicenseFees,
  addLicenseFee,
  removeLicenseFee,
  updateLicenseFee,
  setAllLicenseFeesForExtend,
  addLicenseFeeForExtend,
  removeLicenseFeeForExtend,
  updateLicenseFeeForExtend,
  addTransition,
  updateTransition,
  removeTransition,
  setlicenseTypeErrors,
  setlicenseTypesLoading,
  setlicenseTypesCount,
  setLicenseTypeByCode,
  setLicenseTypeFeatureFlags,
  setTransitionItemParams,
  setLicenseTypeStateConfigs,
  setSendingData,
  setFees,
  setFeesForEdit,
  setAllAdditionalFields,
  initializeDefaultData,
} = licenseTypes.actions;
