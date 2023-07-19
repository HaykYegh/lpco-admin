import { Link } from 'react-router-dom';
import classNames from 'classnames';
import type { FC } from 'react';

import { Checkbox, Table } from '@wf/components';

import type { DepartmentTHeaderItemType, IDepartmentsTBodyProps } from './DepartmentsTBodyViewTypes';
import DepartmentsTBodyViewTexts from './DepartmentsTBodyViewTexts';
import TableComponent from '../../../../components/TableComponent';
import { appPaths } from '../../../../constatnts/appPaths';

import styles from './DepartmentsTBodyView.module.scss';

const tableHeaders: Array<DepartmentTHeaderItemType> = [
  { name: DepartmentsTBodyViewTexts.DIPARTMENT_NAME, flex: 2 },
  { name: DepartmentsTBodyViewTexts.DEPARTMENT_CODE, flex: 1 },
  { name: DepartmentsTBodyViewTexts.DEPARTMENT_EMAIL, flex: 2 },
  { name: 'import_export', flex: 1 },
];

const DepartmentsTBodyView: FC<IDepartmentsTBodyProps> = ({ departments, ministryCode }) => (
  <TableComponent tableHeaders={tableHeaders} dataCount={departments.length}>
    {departments.map((item) => (
      <Table.Row key={item.code}>
        <Table.Cell className={styles.dep_big_cell}>
          {ministryCode ? (
            <Link to={`${appPaths.ministries}/${ministryCode}/departments/${item.code}`}>{item.description}</Link>
          ) : (
            item.description
          )}
        </Table.Cell>
        <Table.Cell className={styles.dep_cell}>{item.code}</Table.Cell>
        <Table.Cell className={styles.dep_big_cell}>{item.email}</Table.Cell>
        <Table.Cell className={classNames(styles.specific_tb, styles.dep_cell)}>
          <div className={styles.specific_tb_item}>
            <Checkbox checked={true} disabled />
            <Checkbox checked={false} disabled />
          </div>
        </Table.Cell>
      </Table.Row>
    ))}
  </TableComponent>
);

export default DepartmentsTBodyView;
