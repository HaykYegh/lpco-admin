import { type IAdditionalFieldItem } from '../../../store/types';
import { type AdditionalFieldsTabs } from '../../../constants';

export interface ILAddFieldSectionViewProps {
  title: string;
  tab: keyof typeof AdditionalFieldsTabs;
}

export interface IRowContent {
  fields: IAdditionalFieldItem[];
}
