import type { EntityId } from '@reduxjs/toolkit';

import { type IdType } from '@wf/components/dist/components/FormElements/Switcher/Switcher';

import type { OptionsItemType } from '../../../../../components/TableComponent/TableComponentTypes';

export interface IDocSelectState {
  documentCodeValue: OptionsItemType | null;
  productValue: OptionsItemType | null;
}

export interface IDocSwitchState {
  isDateRequired: IdType;
  isReferenceRequired: IdType;
}

export interface IEditableData extends IDocSelectState, IDocSwitchState {
  id?: EntityId | null;
}
