import type { Dictionary, Draft, EntityId } from '@reduxjs/toolkit';
import type { UseFormReturn } from 'react-hook-form';

import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type { OptionsItemType } from '../../../components/TableComponent/TableComponentTypes';

import { type AdditionalFieldsTabs } from '../constants';

import type { setFeesActionName, setFeesForEditActionName } from './actions';

export type LicenseTypesState = {
  data: ILicenseTypeEntityProps;
  historizedLicenseTypes: ILicenseTypeEntityProps;
  licenseTypeCodes: Array<LicenseType>;
  fees: Array<FeeType>;
  feesForEdit: Array<FeeType>;
  licenseTypeByCode: ILicenseTypeByCodeProps;
  licenseTypeFeatureFlagsByCode: IFeatureFlagsProps;
  licenseTypeAprovalsByCode: IAprovalsEntityProps;
  licenseTypeApTransitionsByCode: IApTransitionsEntityProps;
  licenseTypeFeesByCode: IFeeEntityProps;
  licenseTypeFeesForExtendByCode: IFeeEntityProps;
  licenseTypeAttDocumentsByCode: IAttDocumentsEntityProps;
  licenseTypeAdditionalFieldsByCode: Nullable<IAdditionalFieldsState>;
  licenseTypeErrors: ILTypeErrorsProps;
  licenseTypesLoading: boolean;
  licenseTypesCount: number;
  transitionItemParams: ITransitionItemParams;
  sendingData: ISendingLicenseType | null;
};

export type LicenseTypesStateWithDraft = LicenseTypesState | Draft<LicenseTypesState>;

export interface ILicenseTypeEntityProps {
  entities: Dictionary<LicenseType>;
  ids: EntityId[];
}

export interface IAprovalsEntityProps {
  entities: Dictionary<IApprovalAdItem>;
  ids: EntityId[];
}

export interface IApTransitionsEntityProps {
  entities: Dictionary<ITransitionItem>;
  ids: EntityId[];
}

export interface IAttDocumentsEntityProps {
  entities: Dictionary<IAttachedDocumentItem>;
  ids: EntityId[];
}

export interface IFeeEntityProps {
  entities: Dictionary<IFeeItem>;
  ids: EntityId[];
}

export type AdditionalFields = {
  fields: Partial<IAdditionalFieldItem>[];
};

export interface IAdditionalFieldsState {
  [AdditionalFieldsTabs.HEADER]: AdditionalFields[];
  [AdditionalFieldsTabs.NAMES_AND_PARTIES]: AdditionalFields[];
  [AdditionalFieldsTabs.ITEM]: AdditionalFields[];
  [AdditionalFieldsTabs.ATTACHED_DOCUMENT]: AdditionalFields[];
  [AdditionalFieldsTabs.BENEFICIARY]: AdditionalFields[];
}

export interface ILTypeErrorsProps {
  entities: Dictionary<ISameErrorFieldsItem>;
  ids: EntityId[];
}

export interface ISameErrorFieldsItem {
  field: string;
  params: Array<IErrorItem>;
}

export interface IAprovalsPayload {
  approvalsData: Array<IApprovalProps>;
  transitions: Array<ITransitionItem>;
}

export type GetLicenseTypesApiPayload = {
  id?: EntityId;
  limit: number;
  offset: number;
  licenseTypeCode?: string;
  productListCode?: string;
  date?: string;
  eovOperator?: string;
};

export type GetLicenseTypeApiPayload = {
  licenseTypeCode: string;
  url?: string;
};

export type LicenseFeesApiPayload = {
  feeCodeValue: string;
  actionName: typeof setFeesActionName | typeof setFeesForEditActionName;
};

export interface IUpdateLicenseTypeApiPayload extends IGetSendingDataPayload {
  id?: number;
}

export interface IGetSendingDataPayload {
  dataForm: Record<string, any>;
}

export type SearchLicenseTypeshStateType = {
  licenseTypeCode: SelectBaseOption;
  productListCode: SelectBaseOption;
  date: Date | [Date | null, Date | null] | null | undefined;
};

export type LicenseType = {
  id: EntityId;
  licenseTypeCode: string;
  ministryCode: string;
  licenseTypeName: string;
  flow: string;
  typeOfUse: string;
  quotaType: string;
  tariffListCode: string;
  loader?: boolean;
  historizedData?: LicenseType[];
};

export type FeeType = {
  benCode: string;
  feeDescription: string;
  feeCode: string;
  taxDescription: string | null;
  taxCode: string | null;
  benDescription: string;
};

export type LicenseTypesType = {
  resultList: Array<LicenseType>;
  totalCount: number;
};

export type FeesResponseType = {
  resultList: Array<FeeType>;
  totalCount: number;
};

export type LicenseTypesPActionType = {
  key: keyof ILicenseTypeByCodeProps;
  value: never;
};

export type FeatureFlagsPActionType = {
  key: keyof IFeatureFlagsProps;
  value: boolean;
};

export enum LTypeModeItems {
  view = 'view',
  edit = 'edit',
  create = 'create',
}

export interface ILicenseTypeProps extends ILicenseTypeByCodeProps {
  featureFlags?: IFeatureFlagsProps;
  approvals: Array<IApprovalItem>;
  fees?: unknown;
  attachedDocuments?: unknown;
  additionalFields: IAdditionalFieldItem[];
}

export interface ILicenseTypeByCodeProps {
  id?: number;
  licenseTypeCode: string;
  licenseTypeName?: string;
  licenseTypeNameInNationalLang?: string;
  licenseTypeNature?: string;
  applicationFeeMode: string;
  extensionFeeMode: string;
  dov?: string;
  eov?: string | null;
  ministryCode?: string;
  departmentCode?: string;
  tariffListCode: string;
  relatedProducts: string;
  flow: string;
  paymentFlow: string;
  typeOfUse: string;
  startDateValidityType: string;
  endDateValidityType: string;
  validityPeriod: number | null;
  noOfDaysBeforeValidFrom: number | null;
  noOfDaysBeforeValidTo: number | null;
  noOfAllowableExtension: number | null;
  maxNumOfDaysForExtension: number | null;
  quotaType: string;
  quotaTaxCode: string;
  enabledQuotas: Array<string>;
  printStatuses: Array<string>;
  sigAndStampsName: string | null;
  ltValidation?: boolean;
  ifValidation?: boolean;
  formErrorsArrLength?: number;
  form?: UseFormReturn;
}

export interface IFeatureFlagsProps {
  flowEnabled: boolean;
  relatedProductsEnabled: boolean;
  typeOfUseEnabled: boolean;
  countryOfExportOrImportEnabled: boolean;
  termOfDeliveryEnabled: boolean;
  placeOfLoadingEnabled: boolean;
  placeOfUnloadingEnabled: boolean;
  departmentOfficeEnabled: boolean;
  entryExitPointEnabled: boolean;
  listOfBeneficiariesEnabled: boolean;
  suspendOpEnabled: boolean;
  cancelOpEnabled: boolean;
  updateApproveOpEnabled: boolean;
  packageManagementTableEnabled: boolean;
  treatmentTableEnabled: boolean;
  hsCodeEnabled: boolean;
  extendBeforeExpirationEnabled: boolean;
  extendAfterExpirationEnabled: boolean;
  fixFee: boolean;
  fixFeeForExtend: boolean;
  packageManagementEnabled: boolean;
  invoiceValueManagementEnabled: boolean;
  itemWeightManagementEnabled: boolean;
  addItemOnQueriedEnabled: boolean;
  editItemOnQueriedEnabled: boolean;
  deleteItemOnQueriedEnabled: boolean;
  addItemOnOgaEditEnabled: boolean;
  editItemOnOgaEditEnabled: boolean;
  deleteItemOnOgaEditEnabled: boolean;
  requestedAndApprovedAmountEnabled: boolean;
  remainingAmountEnabled: boolean;
}

export interface IsetLicenseTypeStateConfigs {
  licenseTypeByCode: ILicenseTypeByCodeProps;
  licenseTypeFeatureFlagsByCode: IFeatureFlagsProps;
}

export interface ITransitionItem {
  id?: number;
  departmentLevel: number;
  operationName: string;
  operationNameInNationalLang: string;
  operationStatus: string;
  operationStatusInNationalLang: string;
  reRoute: null;
  isManualAssignment: boolean;
  isRejectOpEnabled: boolean;
}

export interface IApprovalProps {
  id?: number;
  rank: number;
  ministryCode: string;
  ministryName?: string;
  departmentCode: string;
  departmentName?: string;
  transitionsArr?: Array<number>;
  transitions?: Array<ITransitionItem>;
}

export interface IApprovalItem extends IApprovalProps {
  transitions: Array<ITransitionItem>;
}

export interface IApprovalAdItem extends IApprovalProps {
  transitionsArr?: Array<number>;
}

export interface IAttachedDocumentItemForm {
  code: null | OptionsItemType;
  description?: string;
  id?: null | number;
  isDateRequired: boolean;
  isReferenceRequired: boolean;
  tariffListCode: null | OptionsItemType;
}

export interface IAttachedDocumentItem {
  code: string;
  description?: string;
  id?: number;
  isDateRequired: boolean;
  isReferenceRequired: boolean;
  tariffListCode: string;
}

export interface IFeeItemForm {
  id?: null | number;
  feeCode: OptionsItemType;
  feeDescription: string;
  benCode?: string;
  benDescription?: string;
  amount: number;
  feeType: string;
}

export interface IFeeItem {
  id?: number;
  feeCode: string;
  feeDescription?: string;
  benCode?: string;
  benDescription?: string;
  amount: number;
  feeType: string;
}

export interface IAdditionalFieldItem {
  id?: number;
  dataType: Nullable<string>;
  positionInRow: number;
  rowNumber: number;
  tab?: string;
  englishLabel?: string;
  nationalLanguageLabel?: string;
  config?: string;
  englishPlaceHolder?: string;
  nationalLanguagePlaceHolder?: string;
  listOfOptions?: string;
  fieldUILength?: number;
  textAreaHeight?: number;
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;
  minDate?: number;
  maxDate?: number;
  fieldUILengt?: number;
}

export interface IAdditionalFieldRow {
  id: EntityId;
  culumns: (EntityId | null)[];
}

export interface ISendingLicenseType extends ILicenseTypeByCodeProps {
  featureFlags: IFeatureFlagsProps;
  approvals: Array<IApprovalProps>;
  attachedDocuments: Array<IAttachedDocumentItem>;
  fees: Array<IFeeItem>;
  additionalFields: Array<IAdditionalFieldItem>;
}

export interface ITransitionItemParams {
  data: Record<string, unknown> | null;
  dataParentId: EntityId | null;
  title: string;
  show: boolean;
  method: string;
}

export enum transitionItemChangeMethods {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

export const stampIdPropName = 'sigAndStampsName';

export enum feeMode {
  NONE = 'NONE',
  CALCULATED = 'CALCULATED',
  FIXED = 'FIXED',
}
