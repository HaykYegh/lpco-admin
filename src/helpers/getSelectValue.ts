import type { OptionsItemType } from '../components/TableComponent/TableComponentTypes';

export function getSelectValue(
  value: string | undefined | null,
  label: string | undefined | null
): OptionsItemType | string {
  return value && label
    ? {
        label,
        value,
      }
    : '';
}
