import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type { IFilterItem } from '../../../../components/TableComponent/TableComponentTypes';
import type { IDepartmentItem } from '../DepartmentsTBodyView/DepartmentsTBodyViewTypes';

import type { MinistryType } from '../../store/types';

export interface ITHeaderItem {
  name: string;
  flex: number;
}

export interface IMinistriesTBodyProps {
  data: Array<MinistryType>;
  toggleTable: (code: string) => void;
  tableFilterItems: Array<IFilterItem<SelectBaseOption>>;
  dataCount: number;
  handlePageChange: (page: number) => void;
  emptyDataTitle: string;
  emptyDataText: string;
}

export interface IMinistryDepartmentsTBodyProps {
  data: Array<IDepartmentItem>;
  opened?: boolean;
  link: string;
  departmentTableHeaders?: Array<ITHeaderItem>;
}
