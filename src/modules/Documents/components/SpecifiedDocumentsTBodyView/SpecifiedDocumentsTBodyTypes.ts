import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type { IFilterItem } from '../../../../components/TableComponent/TableComponentTypes';

import type { DocumentType } from '../../store/types';

export interface ITHeaderItem {
  name: string;
  flex: number;
}

export interface ISpecifiedDocumentsTBodyProps {
  data: Array<DocumentType>;
  tableFilterItems: Array<IFilterItem<SelectBaseOption>>;
  dataCount: number;
  handlePageChange: (page: number) => void;
  emptyDataTitle?: string;
  emptyDataText?: string;
}
