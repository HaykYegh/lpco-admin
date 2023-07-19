import type { Dictionary, EntityId } from '@reduxjs/toolkit';
import type { UseFormReturn } from 'react-hook-form';

import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

// eslint-disable-next-line max-len
import type { IAddApprovalFormDefaultValuesType } from '../../../containers/LicenseType/LWApprovalSectionContainer/LWApprovalSectionContainerType';
import type { OptionsItemType } from '../../../../../components/TableComponent/TableComponentTypes';

import type { IApprovalProps, ITransitionItem } from '../../../store/types';

// eslint-disable-next-line max-len

export interface ILWApprovalSectionViewProps {
  handleInputChange: (value: string) => void | undefined;
  ministriesOptions: Array<SelectBaseOption>;
  departmentsOptions: Array<SelectBaseOption>;
  editDepartmentsOptions: Array<SelectBaseOption>;
  allApprovals: Array<IApprovalProps>;
  transitionsData: Dictionary<ITransitionItem>;
  handleSetDepartmentAndMinistryNames: (select: OptionsItemType, onChange: (select: OptionsItemType) => void) => void;
  handleEditSetDepartmentAndMinistryNames: (
    select: OptionsItemType,
    onChange: (select: OptionsItemType) => void
  ) => void;
  getMinistry: (selected: OptionsItemType) => void;
  getEditMinistry: (selected: OptionsItemType) => void;
  addApproval: (data: IAddApprovalFormDefaultValuesType) => void;
  handleEditApproval: (id: EntityId) => void;
  cancelEditApproval: () => void;
  updateApproval: (data: IAddApprovalFormDefaultValuesType) => void;
  handleDeleteApproval: (id: EntityId) => void;
  editTransition: (id: EntityId) => void;
  addTransition: (parentId: EntityId) => void;
  removeTransition: (id: EntityId, parentId: EntityId) => void;
  handleSetMinistryCode: (selected: OptionsItemType, onChange: (select: OptionsItemType) => void) => void;
  handleSetEditMinistryCode: (selected: OptionsItemType, onChange: (select: OptionsItemType) => void) => void;
  editApprovalForm?: Record<string, any>;
  licenseTypeErrors: Array<IErrorItem>;
  form?: UseFormReturn;
  type?: string;
}

export interface ILWApprovalSectionViewTHeaderItem {
  name: string;
  flex: number;
  icon?: string;
}
