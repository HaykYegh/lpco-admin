import { combineReducers } from '@reduxjs/toolkit';

import { ministries } from '../modules/MinistiesAndDepartments';
import { licenseTypes } from '../modules/LicenseTypes';
import { popupConfigs } from './popupConfigs/slices';
import { documents } from '../modules/Documents';

import { products } from './products/slices';
import { uploads } from './uploads/slices';

export default combineReducers({
  [ministries.name]: ministries.reducer,
  [documents.name]: documents.reducer,
  [licenseTypes.name]: licenseTypes.reducer,
  [products.name]: products.reducer,
  [uploads.name]: uploads.reducer,
  [popupConfigs.name]: popupConfigs.reducer,
});
