import type { RootState } from '../../../store';

export const ministriesSelector = (state: RootState) => state.ministries;
export const ministrySelector = (state: RootState) => state.ministries.dataByCode;
export const editMinistrySelector = (state: RootState) => state.ministries.editMinistryDataByCode;
