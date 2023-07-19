import { createAction } from '@reduxjs/toolkit';

import type { GetProductApiPayload } from './types';

export const getProductCodesApi = createAction<GetProductApiPayload>('getProductCodesApi');
