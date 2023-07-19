import type { OptionsItemType } from '../../../../../components/TableComponent/TableComponentTypes';

export type approvalStateType = {
  departmentCode: OptionsItemType | null;
  ministryCode: OptionsItemType | null;
};

export interface IAddApprovalFormDefaultValuesType {
  id?: number;
  departmentCode: OptionsItemType | null;
  departmentName: string;
  ministryCode: OptionsItemType | null;
  ministryName: string;
  rank: number;
}
