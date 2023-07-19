import moment from 'moment';

import type { DatePickerType } from '../components/TableComponent/TableComponentTypes';

export function getFormatDateWithHours(date: DatePickerType = null): string {
  return moment(date ? date.toLocaleString() : Date.now()).format('YYYY-MM-DDTHH:mm:ss');
}
