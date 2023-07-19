import type { FC } from 'react';

import styles from './InfoContent.module.scss';

const InfoContent: FC<IWithReactChildren> = ({ children }) => <div className={styles.container}>{children}</div>;

export default InfoContent;
