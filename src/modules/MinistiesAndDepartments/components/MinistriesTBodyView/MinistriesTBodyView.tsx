import { Link } from 'react-router-dom';
import classNames from 'classnames';
import type { FC } from 'react';

import { Button, Icon, Table } from '@wf/components';

import type { IMinistriesTBodyProps, ITHeaderItem } from './MinistriesTBodyViewTypes';
import MinistryDepartmentsTBodyView from './MinistryDepartmentsTBodyView';
import TableComponent from '../../../../components/TableComponent';
import MinistriesTBodyViewTexts from './MinistriesTBodyViewTexts';

import type { MinistryType } from '../../store/types';

import styles from './MinistriesTBodyView.module.scss';

const tableHeaders: Array<ITHeaderItem> = [
  { name: MinistriesTBodyViewTexts.MINISTRY_NAME, flex: 2 },
  { name: MinistriesTBodyViewTexts.MINISTRY_CODE, flex: 1 },
  { name: MinistriesTBodyViewTexts.MINISTRY_ADDRESS, flex: 2 },
  { name: '', flex: 1 },
];

const departmentTableHeaders: Array<ITHeaderItem> = [
  { name: MinistriesTBodyViewTexts.DEPARTMENT_NAME, flex: 2 },
  { name: MinistriesTBodyViewTexts.DEPARTMENT_CODE, flex: 1 },
  { name: MinistriesTBodyViewTexts.DEPARTMENT_EMAIL, flex: 2 },
  { name: 'import_export', flex: 1 },
];

const MinistriesTBodyView: FC<IMinistriesTBodyProps> = ({
  data,
  toggleTable,
  dataCount,
  handlePageChange,
  tableFilterItems,
  emptyDataTitle,
  emptyDataText,
}) => (
  <TableComponent
    onPageChange={handlePageChange}
    emptyDataTitle={emptyDataTitle}
    filterItems={tableFilterItems}
    emptyDataText={emptyDataText}
    tableHeaders={tableHeaders}
    dataCount={dataCount}
  >
    {data.map((item: MinistryType) => (
      <Table.Expandable key={item.code}>
        <Table.Row>
          <Table.Cell className={classNames(styles.dep_big_cell, styles.with_link)}>
            <Link to={item.code}>{item.description}</Link>
          </Table.Cell>
          <Table.Cell className={styles.dep_cell}>{item.code}</Table.Cell>
          <Table.Cell className={styles.dep_big_cell}>{item.address1}</Table.Cell>
          <Table.Cell expandOnClick={true} className={classNames(styles.last_tItem, styles.dep_cell)}>
            <Button
              onClick={() => {
                toggleTable(item.code);
              }}
              rightIcon={<Icon name="ic_arrow_down" />}
              ghost={!item.opened}
              color="success"
              size="sm"
            >
              Linked Departments
            </Button>
          </Table.Cell>
        </Table.Row>
        {item.ministryDepartments && (
          <MinistryDepartmentsTBodyView
            departmentTableHeaders={departmentTableHeaders}
            link={`${item.code}/departments`}
            data={item.ministryDepartments}
            opened={item.opened}
          />
        )}
      </Table.Expandable>
    ))}
  </TableComponent>
);

export default MinistriesTBodyView;
