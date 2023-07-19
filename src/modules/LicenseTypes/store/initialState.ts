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

import { AdditionalFieldsTabs, MANUAL, NUM_OF_DAYS, quotaTypeEnum } from '../constants';
import { feeMode, transitionItemChangeMethods } from './types';

import type { IFeatureFlagsProps, ILicenseTypeByCodeProps, LicenseTypesState } from './types';

export const defaultLicenseTypeByCode: ILicenseTypeByCodeProps = {
  licenseTypeCode: '',
  licenseTypeName: '',
  licenseTypeNameInNationalLang: '',
  licenseTypeNature: '',
  applicationFeeMode: feeMode.NONE,
  extensionFeeMode: feeMode.NONE,
  dov: '',
  eov: null,
  ministryCode: '',
  departmentCode: '',
  tariffListCode: '',
  relatedProducts: '',
  flow: 'IM',
  paymentFlow: 'AFTER',
  typeOfUse: 'SINGLE',
  startDateValidityType: NUM_OF_DAYS,
  endDateValidityType: MANUAL,
  validityPeriod: 0,
  noOfDaysBeforeValidFrom: 0,
  noOfDaysBeforeValidTo: 0,
  noOfAllowableExtension: 0,
  maxNumOfDaysForExtension: 0,
  quotaType: '',
  quotaTaxCode: '',
  enabledQuotas: [
    quotaTypeEnum.UOM,
    quotaTypeEnum.VALUE,
    quotaTypeEnum.NET_MASS,
    quotaTypeEnum.GROSS_MASS,
    quotaTypeEnum.UNLIMITED,
  ],
  printStatuses: [],
  sigAndStampsName: null,
};

export const defaultLicenseTypeFeatureFlagsByCode: IFeatureFlagsProps = {
  flowEnabled: true,
  relatedProductsEnabled: false,
  typeOfUseEnabled: false,
  countryOfExportOrImportEnabled: true,
  termOfDeliveryEnabled: false,
  placeOfLoadingEnabled: false,
  placeOfUnloadingEnabled: false,
  departmentOfficeEnabled: false,
  entryExitPointEnabled: false,
  listOfBeneficiariesEnabled: false,
  suspendOpEnabled: true,
  cancelOpEnabled: true,
  updateApproveOpEnabled: true,
  packageManagementTableEnabled: false,
  treatmentTableEnabled: false,
  hsCodeEnabled: true,
  extendBeforeExpirationEnabled: false,
  extendAfterExpirationEnabled: false,
  fixFee: false,
  fixFeeForExtend: false,
  packageManagementEnabled: false,
  invoiceValueManagementEnabled: false,
  itemWeightManagementEnabled: false,
  addItemOnQueriedEnabled: false,
  editItemOnQueriedEnabled: false,
  deleteItemOnQueriedEnabled: false,
  addItemOnOgaEditEnabled: false,
  editItemOnOgaEditEnabled: false,
  deleteItemOnOgaEditEnabled: false,
  requestedAndApprovedAmountEnabled: false,
  remainingAmountEnabled: false,
};

export const transitionItemParams = {
  data: null,
  dataParentId: null,
  title: '',
  show: false,
  method: transitionItemChangeMethods.ADD,
  type: '',
};
export const additionalFieldsState = {
  [AdditionalFieldsTabs.HEADER]: [{ fields: [{ dataType: null, tab: AdditionalFieldsTabs.HEADER }] }],
  [AdditionalFieldsTabs.NAMES_AND_PARTIES]: [
    { fields: [{ dataType: null, tab: AdditionalFieldsTabs.NAMES_AND_PARTIES }] },
  ],
  [AdditionalFieldsTabs.ITEM]: [{ fields: [{ dataType: null, tab: AdditionalFieldsTabs.ITEM }] }],
  [AdditionalFieldsTabs.ATTACHED_DOCUMENT]: [
    { fields: [{ dataType: null, tab: AdditionalFieldsTabs.ATTACHED_DOCUMENT }] },
  ],
  [AdditionalFieldsTabs.BENEFICIARY]: [{ fields: [{ dataType: null, tab: AdditionalFieldsTabs.BENEFICIARY }] }],
};

export const licenseTypeConfigsState = {
  licenseTypeByCode: defaultLicenseTypeByCode,
  licenseTypeFeatureFlagsByCode: defaultLicenseTypeFeatureFlagsByCode,
  licenseTypeAprovalsByCode: approvalsAdapter.getInitialState(),
  licenseTypeApTransitionsByCode: transitionsAdapter.getInitialState(),
  licenseTypeFeesByCode: feesAdapter.getInitialState(),
  licenseTypeFeesForExtendByCode: feesAdapterForExtend.getInitialState(),
  licenseTypeAttDocumentsByCode: documentsAdapter.getInitialState(),
  licenseTypeAdditionalFieldsByCode: null,
};

export const initialState: LicenseTypesState = {
  data: lTypeAdapter.getInitialState(),
  historizedLicenseTypes: historizedLTypeAdapter.getInitialState(),
  licenseTypeCodes: [],
  fees: [],
  feesForEdit: [],
  licenseTypesLoading: false,
  licenseTypesCount: 0,
  transitionItemParams,
  sendingData: null,
  licenseTypeErrors: lTypeErrorsAdapter.getInitialState(),
  ...licenseTypeConfigsState,
};
