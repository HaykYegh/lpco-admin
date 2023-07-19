import type { FC } from 'react';

import styles from './RightItemWithOneField.module.scss';

const RightItemWithOneField: FC<IWithReactChildren> = ({ children }) => (
  <div className={styles.section_row_iwof}>{children}</div>
);

export default RightItemWithOneField;
