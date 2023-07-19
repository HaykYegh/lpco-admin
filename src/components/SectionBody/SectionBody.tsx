import classNames from 'classnames';
import type { FC } from 'react';

import { type ISectionBodyProps } from './SectionBodyTypes';

import styles from './SectionBody.module.scss';

const SectionBody: FC<ISectionBodyProps> = ({ children, className }) => (
  <div className={classNames(styles.section_body, className)}>{children}</div>
);

export default SectionBody;
