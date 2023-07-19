import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { MinistriesState, MinistryType } from './types';
import { clearStore } from './actions';

const initialState = {
  data: [],
  editMinistryDataByCode: null,
  dataByCode: null,
  count: 0,
  isLoading: false,
} as MinistriesState;

export const ministries = createSlice({
  name: 'ministries',
  initialState,
  reducers: {
    setMinistries: (state: MinistriesState, { payload }: PayloadAction<Array<MinistryType>>) => {
      state.data = payload;
    },
    setMinistry: (state: MinistriesState, { payload }: PayloadAction<MinistryType | null>) => {
      state.dataByCode = payload;
    },
    setEditMinistry: (state: MinistriesState, { payload }: PayloadAction<MinistryType | null>) => {
      state.editMinistryDataByCode = payload;
    },
    setMinistriesCount: (state: MinistriesState, { payload }: PayloadAction<number>) => {
      state.count = payload;
    },
    setIsLoading: (state: MinistriesState, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  extraReducers: {
    [clearStore.type]: () => initialState,
  },
});

export const { setMinistries, setMinistriesCount, setIsLoading, setMinistry, setEditMinistry } = ministries.actions;
