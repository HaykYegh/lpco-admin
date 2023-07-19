import { type FC, lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from '@wf/keycloak-axios-provider';

import AccessDenied from '../components/AccessDenied';
import { appPaths } from '../constatnts/appPaths';

const MinistryRoutes = lazy(() => import('../modules/MinistiesAndDepartments/routes/MinistryRoutes' as string));
const DocumentRoutes = lazy(() => import('../modules/Documents/routes/DocumentRoutes' as string));
const LicenseTypeRoutes = lazy(() => import('../modules/LicenseTypes/routes/LicenseTypeRoutes' as string));

const AppRoutes: FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path={appPaths.indexPath} element={<PrivateRoute accessDeniedComponent={<AccessDenied />} />} />
    </Routes>
    <MinistryRoutes />
    <DocumentRoutes />
    <LicenseTypeRoutes />
  </Suspense>
);

export default AppRoutes;
