import type { FC } from 'react';

import { getErrorDescription } from '../../helpers/getErrorDescription';

import styles from './ErrorsComponent.module.scss';

const ErrorsComponent: FC<{ errors: Array<IErrorItem> }> = ({ errors }) =>
  errors.length ? (
    <ul className={styles.errors_content}>
      {errors.map((item, index) => (
        <li key={`${item.field}_${index}`}>{getErrorDescription(item)}</li>
      ))}
    </ul>
  ) : null;

export default ErrorsComponent;
