import type { FC } from 'react';

import { BeatLoader, Icon, Pagination, Table } from '@wf/components';

import type { ITableComponentProps } from './TableComponentTypes';
import THeader from './THeader';
import FItems from './FItems';

import { DEFAULT_COUNT, PAGINATION_LIMIT } from '../../constatnts';

import styles from './TableComponent.module.scss';

const TableComponent: FC<ITableComponentProps> = ({
  filterItems,
  tableHeaders,
  children,
  inner,
  withHeader = true,
  loader = false,
  dataCount,
  onPageChange,
  emptyDataTitle,
  emptyDataText,
  maxRows = 10,
}) => (
  <Table className={styles.table_content} inner={inner}>
    {filterItems && <FItems filterItems={filterItems} />}
    {withHeader && <THeader tableHeaders={tableHeaders} />}
    <Table.Body maxRows={maxRows}>{children}</Table.Body>
    {emptyDataTitle && (
      <Table.Footer>
        {dataCount ? (
          <div className={styles.footer_item}>
            <p>
              Total number of records: <span>{dataCount}</span>
            </p>
            {onPageChange && dataCount > PAGINATION_LIMIT && (
              <Pagination onPageChange={onPageChange} totalItems={(dataCount * DEFAULT_COUNT) / PAGINATION_LIMIT} />
            )}
          </div>
        ) : !loader ? (
          <div className={styles.empty_data}>
            <Icon name="ministry" size={33} />
            {emptyDataTitle && <h3>{emptyDataTitle}</h3>}
            {emptyDataText && <p>{emptyDataText}</p>}
          </div>
        ) : (
          <div className={styles.empty_data}>
            <BeatLoader />
          </div>
        )}
      </Table.Footer>
    )}
  </Table>
);

export default TableComponent;
