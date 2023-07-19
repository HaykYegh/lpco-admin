import { createAction } from '@reduxjs/toolkit';

import type { GetMinistriesApiPayload, GetMinistryApiPayload } from './types';

export const getMinistriesApi = createAction<GetMinistriesApiPayload>('getMinistriesApi');

export const getMinistryApi = createAction<GetMinistryApiPayload>('getMinistryApi');

export const getEditMinistryApi = createAction<GetMinistryApiPayload>('getEditMinistryApi');

export const clearStore = createAction('clearStore');
