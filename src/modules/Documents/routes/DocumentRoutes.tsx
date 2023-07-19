import { Route, Routes } from 'react-router-dom';
import type { FC } from 'react';

import { PrivateRoute } from '@wf/keycloak-axios-provider';

import AccessDenied from '../../../components/AccessDenied';
import SpecifyDocument from '../containers/SpecifyDocument';
import { appPaths } from '../../../constatnts/appPaths';
import Documents from '../containers/Documents';
import Document from '../containers/Document';

import { rolesEnums } from '../../../constatnts';

const DocumentRoutes: FC = () => (
  <Routes>
    <Route
      element={
        <PrivateRoute
          roles={{ lpco2_admin: [rolesEnums.ADMINISTRATOR, rolesEnums.ADMIN_VIEWER] }}
          accessDeniedComponent={<AccessDenied />}
        />
      }
      path={appPaths.attachedDocuments}
    >
      <Route element={<Documents />} index />
      <Route path="view/:code" element={<Document />} />
    </Route>
    <Route
      element={
        <PrivateRoute roles={{ lpco2_admin: [rolesEnums.ADMINISTRATOR] }} accessDeniedComponent={<AccessDenied />} />
      }
      path={appPaths.attachedDocuments}
    >
      <Route path="specify/:code" element={<SpecifyDocument />} />
    </Route>
  </Routes>
);

export default DocumentRoutes;
