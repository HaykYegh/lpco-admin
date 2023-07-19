import moment from 'moment';

export function getValidFromDate(): string {
  return moment().format('YYYY-MM-DD');
}
