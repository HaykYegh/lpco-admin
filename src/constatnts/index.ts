import type { SwitcherItemType } from '../components/SwitcherComponent/SwitcherComponentTypes';

export const APPNAME = 'LPCO';

export const DEFAULT_COUNT = 10;
export const PAGINATION_LIMIT = 10;

export const PRIMARY_COLOR = '#64b496';

export const onOffItems: Array<SwitcherItemType> = [
  {
    id: 0,
    text: 'Off',
  },
  {
    id: 1,
    text: 'On',
  },
];

export enum rolesEnums {
  ADMINISTRATOR = 'ROLE_LPCO2_ADMIN_ADMINISTRATOR',
  ADMIN_VIEWER = 'ROLE_LPCO2_ADMIN_ADMIN_VIEWER',
  MINISTRY_ADMIN_VIEWER = 'ROLE_LPCO2_ADMIN_MINISTRY_ADMIN_VIEWER',
  MINISTRY_ADMINISTRATOR = 'ROLE_LPCO2_ADMIN_MINISTRY_ADMINISTRATOR',
}
