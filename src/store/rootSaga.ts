import { all, fork } from 'redux-saga/effects';

import { watchMinistriesSaga } from '../modules/MinistiesAndDepartments';
import { watchLicenseTypesSaga } from '../modules/LicenseTypes';
import { watchDocumentsSaga } from '../modules/Documents';

import { watchProductsSaga } from './products/sagas';
import { watchUploadsSaga } from './uploads/sagas';

export default function* rootSaga() {
  yield all([
    fork(watchMinistriesSaga),
    fork(watchDocumentsSaga),
    fork(watchLicenseTypesSaga),
    fork(watchProductsSaga),
    fork(watchUploadsSaga),
  ]);
}
