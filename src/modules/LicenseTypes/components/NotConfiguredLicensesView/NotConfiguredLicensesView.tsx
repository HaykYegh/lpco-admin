import type { FC } from 'react';

import type { INotConfiguredLicensesViewProps } from './NotConfiguredLicensesViewPropsTypes';
import NotConfiguredLicensesTBodyView from '../NotConfiguredLicensesTBodyView';

import styles from './NotConfiguredLicensesView.module.scss';

const NotConfiguredLicensesView: FC<INotConfiguredLicensesViewProps> = ({
  title,
  data,
  dataCount,
  handlePageChange,
  tableFilterItems,
  emptyDataTitle,
  emptyDataText,
}) => (
  <div className={styles.table_container}>
    <h2>{title}</h2>
    <NotConfiguredLicensesTBodyView
      tableFilterItems={tableFilterItems}
      handlePageChange={handlePageChange}
      emptyDataTitle={emptyDataTitle}
      emptyDataText={emptyDataText}
      dataCount={dataCount}
      data={data}
    />
  </div>
);

export default NotConfiguredLicensesView;
