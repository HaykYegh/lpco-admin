import type { OptionsItemType } from '../components/TableComponent/TableComponentTypes';

export function getSelectValueFromArray(arr: Array<OptionsItemType>, value: string): OptionsItemType | undefined {
  return arr.filter((item) => item?.value === value)[0];
}
