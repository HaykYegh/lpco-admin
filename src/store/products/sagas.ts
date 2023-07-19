import { call, type ForkEffect, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { getProductCodes } from '../../services/productsApiService';

import * as slicesActions from '../products/slices';
import type { ProductsType } from './types';
import * as actions from './actions';

function* getProductCodesApi(action: ReturnType<typeof actions.getProductCodesApi>) {
  const {
    payload: { code },
  } = action;

  try {
    const { data }: AxiosResponse<ProductsType> = yield call(getProductCodes, {
      code,
    });
    yield put(slicesActions.setProductCodes(data.resultList));
  } catch (err) {
    console.error(err);
  }
}

export function* watchProductsSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getProductCodesApi.type, getProductCodesApi);
}
