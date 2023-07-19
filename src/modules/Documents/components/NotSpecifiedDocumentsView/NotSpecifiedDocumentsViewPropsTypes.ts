import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type { IFilterItem } from '../../../../components/TableComponent/TableComponentTypes';

import type { NotSpecDocumentType } from '../../store/types';

export interface INotSpecifiedDocumentsViewProps {
  title: string;
  data: Array<NotSpecDocumentType>;
  tableFilterItems: Array<IFilterItem<SelectBaseOption>>;
  dataCount: number;
  handlePageChange: (page: number) => void;
  emptyDataTitle: string;
  emptyDataText: string;
}
