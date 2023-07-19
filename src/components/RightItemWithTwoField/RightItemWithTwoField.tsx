import type { FC } from 'react';

import styles from './RightItemWithTwoField.module.scss';

const RightItemWithTwoField: FC<IWithReactChildren> = ({ children }) => (
  <div className={styles.section_row_iwtf}>{children}</div>
);

export default RightItemWithTwoField;
