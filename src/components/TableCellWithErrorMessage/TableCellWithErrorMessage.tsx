import classNames from 'classnames';
import type { FC } from 'react';

import { Table } from '@wf/components';

import type { ITableCellWithErrorMessageProps } from './TableCellWithErrorMessageTypes';

import styles from './TableCellWithErrorMessage.module.scss';

const TableCellWithErrorMessage: FC<ITableCellWithErrorMessageProps> = ({ children, className }) => (
  <Table.Cell className={classNames(styles.controller_cell, className)}>{children}</Table.Cell>
);

export default TableCellWithErrorMessage;
