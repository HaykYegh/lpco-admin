import { NavLink } from 'react-router-dom';
import type { FC } from 'react';

import { SideBar } from '@wf/components';

import { appPaths } from '../../../../constatnts/appPaths';
import AppMenuTexts from './AppMenuTexts';

const AppMenu: FC = () => (
  <SideBar.Content>
    <SideBar.MenuItem title="Ministries" linkComponent={NavLink} linkTo={appPaths.ministries}>
      {AppMenuTexts.MINISTRIES}
    </SideBar.MenuItem>
    <SideBar.MenuItem title="Documents" linkComponent={NavLink} linkTo={appPaths.attachedDocuments}>
      {AppMenuTexts.DOCUMENTS}
    </SideBar.MenuItem>
    <SideBar.MenuItem title="Licenses" linkComponent={NavLink} linkTo={appPaths.licenses}>
      {AppMenuTexts.LICENSES}
    </SideBar.MenuItem>
  </SideBar.Content>
);

export default AppMenu;
