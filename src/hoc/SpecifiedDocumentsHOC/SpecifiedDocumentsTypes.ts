import type { FC } from 'react';

import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type { IFilterItem } from '../../components/TableComponent/TableComponentTypes';
import type { DocumentType } from '../../modules/Documents/store/types';

export interface ISpecifiedDocumentsCompomnentProps {
  title: string;
  data: Array<DocumentType>;
  tableFilterItems: Array<IFilterItem<SelectBaseOption>>;
  dataCount: number;
  handlePageChange: (page: number) => void;
  emptyDataTitle?: string;
  emptyDataText?: string;
}

export interface ISpecifiedDocuments {
  Component: FC<ISpecifiedDocumentsCompomnentProps>;
  data: Array<DocumentType>;
  tableFilterItems: Array<IFilterItem<SelectBaseOption>>;
  dataCount: number;
  handlePageChange: (page: number) => void;
  emptyDataTitle?: string;
  emptyDataText?: string;
}

export type SpecifiedDocumentsParamsType = {
  title: string;
  emptyDataTitle: string;
  emptyDataText: string;
  ignores?: Array<string>;
};
