import { Link } from 'react-router-dom';
import classNames from 'classnames';
import type { FC } from 'react';

import { Checkbox, Table } from '@wf/components';

import type { IDepartmentItem } from '../DepartmentsTBodyView/DepartmentsTBodyViewTypes';
import type { IMinistryDepartmentsTBodyProps } from './MinistriesTBodyViewTypes';
import TableComponent from '../../../../components/TableComponent';

import styles from './MinistriesTBodyView.module.scss';

const MinistryDepartmentsTBodyView: FC<IMinistryDepartmentsTBodyProps> = ({ data, link, departmentTableHeaders }) => (
  <Table.Expandable.Content>
    <TableComponent tableHeaders={departmentTableHeaders} inner={true}>
      {data.map((el: IDepartmentItem) => (
        <Table.Row key={el.code}>
          <Table.Cell className={styles.dep_big_cell}>
            <Link to={`${link}/${el.code}`}>{el.description}</Link>
          </Table.Cell>
          <Table.Cell className={styles.dep_cell}>{el.code}</Table.Cell>
          <Table.Cell className={styles.dep_big_cell}>{el.address}</Table.Cell>
          <Table.Cell className={classNames(styles.specific_tb, styles.dep_cell)}>
            <div className={styles.specific_tb_item}>
              <Checkbox checked={el.import} disabled />
              <Checkbox checked={el.export} disabled />
            </div>
          </Table.Cell>
        </Table.Row>
      ))}
    </TableComponent>
  </Table.Expandable.Content>
);

export default MinistryDepartmentsTBodyView;
