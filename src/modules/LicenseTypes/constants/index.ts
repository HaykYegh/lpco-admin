import type { SwitcherItemType } from '../../../components/SwitcherComponent/SwitcherComponentTypes';
import type { OptionsItemType } from '../../../components/TableComponent/TableComponentTypes';

import { fileTypesEnum } from '../../../store/uploads/types';

export const IMPORRT = 'IM';
export const EXPORT = 'EX';
export const SINGLEOPTION = 'SINGLE';
export const MULTIPLEOPTION = 'MULTIPLE';
export const MANUAL = 'MANUAL';
export const NUM_OF_DAYS = 'NUM_OF_DAYS';
export const PERMANENT = 'PERMANENT';
export const AFTERPROCESSING = 'AFTER';
export const BEFOREPROCESSING = 'BEFORE';
export const CALCULATEDFEE = 'CALCULATEDFEE';
export const FIXEDFEE = 'FIXEDFEE';
export const NOFEE = 'NOFEE';

export const inspectionItems: Array<SwitcherItemType> = [
  {
    id: 0,
    text: 'No Inspection',
    rIcon: 'il_info',
  },
  {
    id: 1,
    text: 'Importer / Declarant',
    rIcon: 'il_info',
  },
];

export enum quotaTypeEnum {
  UOM = 'UOM',
  VALUE = 'VALUE',
  NET_MASS = 'NET_MASS',
  GROSS_MASS = 'GROSS_MASS',
  UNLIMITED = 'UNLIMITED',
  TAX = 'TAX',
}

export enum quotaTypeLabelsEnum {
  UOM = 'Unit of Measurement',
  VALUE = 'FOB Value',
  NET_MASS = 'Net Mass',
  GROSS_MASS = 'Gross Mass',
  UNLIMITED = 'Unlimited',
  TAX = 'Tax',
}

export const quotaItems: Array<OptionsItemType> = [
  {
    label: quotaTypeLabelsEnum.UOM,
    value: quotaTypeEnum.UOM,
  },
  {
    label: quotaTypeLabelsEnum.VALUE,
    value: quotaTypeEnum.VALUE,
  },
  {
    label: quotaTypeLabelsEnum.NET_MASS,
    value: quotaTypeEnum.NET_MASS,
  },
  {
    label: quotaTypeLabelsEnum.GROSS_MASS,
    value: quotaTypeEnum.GROSS_MASS,
  },
  {
    label: quotaTypeLabelsEnum.UNLIMITED,
    value: quotaTypeEnum.UNLIMITED,
  },
  {
    label: quotaTypeLabelsEnum.TAX,
    value: quotaTypeEnum.TAX,
  },
];

export enum printoutConfEnum {
  STORED = 'STORED',
  QUERIED = 'QUERIED',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  REQUESTED = 'REQUESTED',
  PARTIALLY_APPROVE = 'PARTIALLY_APPROVED',
  APPROVED = 'APPROVED',
  PARTIALLY_USE = 'PARTIALLY_USE',
  USED = 'USED',
  SUSPENDED = 'SUSPENDED',
  EXPIRED = 'EXPIRED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
  GENERATED = 'GENERATE',
}

export const licenseTypeDisablePropsObj = {
  id: true,
  licenseTypeName: true,
  licenseTypeNameInNationalLang: true,
  licenseTypeNature: true,
  dov: true,
  eov: true,
};

export const approvalDisablePropsObj = {
  id: true,
  ministryName: true,
  departmentName: true,
  transitionsArr: true,
};

export const transitionDisablePropsObj = {
  id: true,
};

export const attDocumentsDisablePropsObj = {
  id: true,
  description: true,
};

export const feeDisablePropsObj = {
  id: true,
  feeDescription: true,
  benCode: true,
  benDescription: true,
};

export const additionalFieldDisablePropsObj = {
  id: true,
};

export enum flowEnum {
  IM = 'Import',
  EX = 'Export',
}

export enum paymentFlowEnum {
  AFTER = 'AFTER',
  BEFORE = 'BEFORE',
}

export enum typeOfUseEnum {
  SINGLE = 'Single Use',
  MULTIPLE = 'Multiple Use',
}

export const addApprovalFormDefaultValues = {
  ministryCode: null,
  ministryName: '',
  departmentCode: null,
  departmentName: '',
  rank: null,
  transitionsArr: [],
};

export const attachmentFormDefaultValues = {
  id: null,
  code: null,
  description: '',
  tariffListCode: null,
  isDateRequired: false,
  isReferenceRequired: false,
};

export const feesFormDefaultValues = {
  id: 0,
  feeCode: null,
  amount: '',
  feeType: '',
  feeDescription: '',
  benCode: '',
  benDescription: '',
};

export const addTransitionFormDefaultValues = {
  id: null,
  operationName: '',
  operationNameInNationalLang: '',
  operationStatus: '',
  operationStatusInNationalLang: '',
  reRoute: null,
  isRejectOpEnabled: false,
};

export const stampUploadSupportedFileTypes = [
  fileTypesEnum.JPG,
  fileTypesEnum.JPEG,
  fileTypesEnum.PNG,
  fileTypesEnum.GIF,
];

export const stampUploadSupportedMaxFileSize = '2MB';

export enum AdditionalFieldsDataTypes {
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
  INTEGER = 'INTEGER',
  DECIMAL = 'DECIMAL',
  TEXT = 'TEXT',
  TEXTAREA = 'TEXTAREA',
  LIST = 'LIST',
  SEPARATOR = 'SEPARATOR',
}

export enum AdditionalFieldsTabs {
  HEADER = 'HEADER',
  NAMES_AND_PARTIES = 'NAMES_AND_PARTIES',
  CONSIGNMENT = 'CONSIGNMENT',
  BENEFICIARY = 'BENEFICIARY',
  ITEM = 'ITEM',
  FEES = 'FEES',
  ATTACHED_DOCUMENT = 'ATTACHED_DOCUMENT',
}

export enum AdditionalFieldsTextsByDataType {
  CHECKBOX = 'Checkbox',
  DATE = 'Date',
  INTEGER = 'Integer',
  DECIMAL = 'Decimal',
  MONETARY = 'Monetary',
  QUANTITY = 'Quantity',
  TEXT = 'Text',
  TEXTAREA = 'Textarea',
  LABEL = 'Label',
  LIST = 'List',
  OPTIONS_FROM_DATABASE = 'Options From Database',
  SEPARATOR = 'Separator',
}

export const withSeparator = false;
