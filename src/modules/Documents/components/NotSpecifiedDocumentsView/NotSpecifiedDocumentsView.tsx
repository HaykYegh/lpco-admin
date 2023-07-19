import type { FC } from 'react';

import type { INotSpecifiedDocumentsViewProps } from './NotSpecifiedDocumentsViewPropsTypes';
import NotSpecifiedDocumentsTBodyView from '../NotSpecifiedDocumentsTBodyView';

import styles from './NotSpecifiedDocumentsView.module.scss';

const NotSpecifiedDocumentsView: FC<INotSpecifiedDocumentsViewProps> = ({
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
    <NotSpecifiedDocumentsTBodyView
      tableFilterItems={tableFilterItems}
      handlePageChange={handlePageChange}
      emptyDataTitle={emptyDataTitle}
      emptyDataText={emptyDataText}
      dataCount={dataCount}
      data={data}
    />
  </div>
);

export default NotSpecifiedDocumentsView;
