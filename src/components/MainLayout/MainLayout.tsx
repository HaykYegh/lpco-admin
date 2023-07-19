import type { FC } from 'react';

import styles from './MainLayout.module.scss';

const MainLayout: FC<IWithReactChildren> = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.content}>{children}</div>
  </div>
);

export default MainLayout;
