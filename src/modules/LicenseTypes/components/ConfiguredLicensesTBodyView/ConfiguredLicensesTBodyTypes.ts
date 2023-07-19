import { type Dictionary, type EntityId } from '@reduxjs/toolkit';

import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type { IFilterItem } from '../../../../components/TableComponent/TableComponentTypes';

import { type ILicenseTypeEntityProps, type LicenseType } from '../../store/types';

export interface IConfLicensesTHeaderItem {
  name: string;
  flex: number;
}

export interface IConfLicensesTBodyProps {
  data: ILicenseTypeEntityProps;
  handleOpen: (id: EntityId, dataEntities: Dictionary<LicenseType>) => void;
  tableFilterItems: Array<IFilterItem<SelectBaseOption>>;
  dataCount: number;
  handlePageChange: (page: number) => void;
  emptyDataTitle?: string;
  emptyDataText?: string;
}
