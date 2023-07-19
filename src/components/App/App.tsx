import type { FC } from 'react';

import useColors from '@wf/components/dist/styles/hooks';
import { ToasterManager } from '@wf/components';

import AppLayout from '../../modules/AppLayout';
import AppRoutes from '../../routes/AppRoutes';

import { PRIMARY_COLOR } from '../../constatnts';

const App: FC = () => {
  useColors({ primary: PRIMARY_COLOR });

  return (
    <AppLayout>
      <AppRoutes />
      <ToasterManager />
    </AppLayout>
  );
};

export default App;
