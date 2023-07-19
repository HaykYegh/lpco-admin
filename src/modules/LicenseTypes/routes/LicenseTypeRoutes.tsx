import { Route, Routes } from 'react-router-dom';
import type { FC } from 'react';

import { PrivateRoute } from '@wf/keycloak-axios-provider';

import AccessDenied from '../../../components/AccessDenied';
import { appPaths } from '../../../constatnts/appPaths';
import LicenseType from '../containers/LicenseType';
import Licenses from '../containers/Licenses';

import { rolesEnums } from '../../../constatnts';

const LicenseTypeRoutes: FC = () => (
  <Routes>
    <Route path={appPaths.licenses}>
      <Route element={<Licenses />} index />
      <Route path="view/:code" element={<LicenseType />} />
    </Route>
    <Route
      element={
        <PrivateRoute
          roles={{ lpco2_admin: [rolesEnums.ADMINISTRATOR, rolesEnums.MINISTRY_ADMINISTRATOR] }}
          accessDeniedComponent={<AccessDenied />}
        />
      }
      path={appPaths.licenses}
    >
      <Route path="edit/:code" element={<LicenseType />} />
      <Route path="create/:code" element={<LicenseType />} />
    </Route>
  </Routes>
);

export default LicenseTypeRoutes;
