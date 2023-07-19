// eslint-disable-next-line max-len
import type { IDepartmentItem } from '../components/DepartmentsTBodyView/DepartmentsTBodyViewTypes';

export type GetMinistriesApiPayload = {
  limit: number;
  offset: number;
  searchValue: string;
};

export type GetMinistryApiPayload = {
  code: string;
};

export type MinistryType = {
  address1: string;
  code: string;
  description: string;
  descriptionTranslated?: string;
  phoneNumber?: string;
  email?: string;
  ministryDepartments?: Array<IDepartmentItem>;
  opened?: boolean;
};

export type MinistriesType = {
  resultList: Array<MinistryType>;
  totalCount: number;
};

export type MinistriesState = {
  data: Array<MinistryType>;
  editMinistryDataByCode: MinistryType | null;
  dataByCode: MinistryType | null;
  count: number;
  isLoading: boolean;
};
