import type { FC } from 'react';

import { Icon } from '@wf/components';

import type { ILabelComponentProps } from './LabelComponentType';

import styles from './LabelComponent.module.scss';

const LabelComponent: FC<ILabelComponentProps> = ({ children, icon }) => (
  <div className={styles.content}>
    {children}
    {icon && <Icon name={icon} />}
  </div>
);

export default LabelComponent;
