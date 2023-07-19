import type { FC } from 'react';

import type { ISpecifiedDocumentsViewProps } from './SpecifiedDocumentsViewPropsTypes';
import SpecifiedDocumentsTBodyView from '../SpecifiedDocumentsTBodyView';

import styles from './SpecifiedDocumentsView.module.scss';

const SpecifiedDocumentsView: FC<ISpecifiedDocumentsViewProps> = ({
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
    <SpecifiedDocumentsTBodyView
      tableFilterItems={tableFilterItems}
      handlePageChange={handlePageChange}
      emptyDataTitle={emptyDataTitle}
      emptyDataText={emptyDataText}
      dataCount={dataCount}
      data={data}
    />
  </div>
);

export default SpecifiedDocumentsView;
