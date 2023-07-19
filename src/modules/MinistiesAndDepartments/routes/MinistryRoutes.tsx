import { Route, Routes } from 'react-router-dom';
import type { FC } from 'react';

import { PrivateRoute } from '@wf/keycloak-axios-provider';

import Ministries from '../containers/Ministries/Ministries';
import Department from '../containers/Department/Department';
import AccessDenied from '../../../components/AccessDenied';
import { appPaths } from '../../../constatnts/appPaths';
import Ministry from '../containers/Ministry/Ministry';

const MinistryRoutes: FC = () => (
  <Routes>
    <Route path={appPaths.ministries} element={<PrivateRoute accessDeniedComponent={<AccessDenied />} />}>
      <Route element={<Ministries />} index />
      <Route path=":code" element={<Ministry />} />
      <Route path=":code/departments/:d_code" element={<Department />} />
    </Route>
  </Routes>
);

export default MinistryRoutes;
