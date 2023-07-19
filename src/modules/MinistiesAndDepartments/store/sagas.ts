import { call, type ForkEffect, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { getMinistries, getMinistryByCode } from '../services/ministriesAndDepartmentsApiService';

import type { MinistriesType, MinistryType } from './types';
import { ministriesCollector } from '../helpers';
import * as slicesActions from './slices';
import * as actions from './actions';

function* getMinistriesApi(action: ReturnType<typeof actions.getMinistriesApi>) {
  const {
    payload: { limit, offset, searchValue },
  } = action;

  try {
    const { data }: AxiosResponse<MinistriesType> = yield call(getMinistries, { offset, searchValue, limit });
    const ministriesData: Array<MinistryType> = ministriesCollector(data.resultList);
    yield put(slicesActions.setMinistries(ministriesData));
    yield put(slicesActions.setMinistriesCount(data.totalCount));
  } catch (err) {
    console.error(err);
  }
}

function* getMinistryApi(action: ReturnType<typeof actions.getMinistryApi>) {
  const {
    payload: { code },
  } = action;

  try {
    if (code) {
      const { data }: AxiosResponse<MinistryType> = yield call(getMinistryByCode, { code });
      yield put(slicesActions.setMinistry(data));
    } else {
      yield put(slicesActions.setMinistry(null));
    }
  } catch (err) {
    yield put(slicesActions.setMinistry(null));
    console.error(err);
  }
}

function* getEditMinistryApi(action: ReturnType<typeof actions.getMinistryApi>) {
  const {
    payload: { code },
  } = action;

  try {
    if (code) {
      const { data }: AxiosResponse<MinistryType> = yield call(getMinistryByCode, { code });
      yield put(slicesActions.setEditMinistry(data));
    } else {
      yield put(slicesActions.setEditMinistry(null));
    }
  } catch (err) {
    yield put(slicesActions.setEditMinistry(null));
    console.error(err);
  }
}

export function* watchMinistriesSaga(): Generator<ForkEffect> {
  yield takeLatest(actions.getMinistriesApi.type, getMinistriesApi);
  yield takeLatest(actions.getMinistryApi.type, getMinistryApi);
  yield takeLatest(actions.getEditMinistryApi.type, getEditMinistryApi);
}
