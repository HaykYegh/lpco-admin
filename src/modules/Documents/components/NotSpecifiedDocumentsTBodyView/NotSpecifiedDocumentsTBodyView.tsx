import { Link } from 'react-router-dom';
import type { FC } from 'react';

import { PrivateAccess } from '@wf/keycloak-axios-provider';
import { Button, Table } from '@wf/components';

import type { INotSpecifiedDocumentsTBodyProps, ITHeaderItem } from './NotSpecifiedDocumentsTBodyViewTypes';
import NotSpecifiedDocumentsTBodyViewTexts from './NotSpecifiedDocumentsTBodyViewTexts';
import TableComponent from '../../../../components/TableComponent';

import type { NotSpecDocumentType } from '../../store/types';
import { rolesEnums } from '../../../../constatnts';

import styles from './NotSpecifiedDocumentsTBodyView.module.scss';

const tableHeaders: Array<ITHeaderItem> = [
  { name: NotSpecifiedDocumentsTBodyViewTexts.ATT_DOCUMENT_CODE, flex: 1 },
  { name: NotSpecifiedDocumentsTBodyViewTexts.ATT_DOCUMENT_NAME, flex: 1 },
  { name: NotSpecifiedDocumentsTBodyViewTexts.ATT_DOCUMENT_NAME_IN_NL, flex: 1 },
  { name: '', flex: 1 },
];

const NotSpecifiedDocumentsTBodyView: FC<INotSpecifiedDocumentsTBodyProps> = ({
  data,
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
    {data.map((item: NotSpecDocumentType) => (
      <Table.Row key={item.code}>
        <Table.Cell>{item.code}</Table.Cell>
        <Table.Cell>{item.description}</Table.Cell>
        <Table.Cell>{item.description}</Table.Cell>
        <Table.Cell className={styles.last_cell}>
          <PrivateAccess roles={{ lpco2_admin: [rolesEnums.ADMINISTRATOR] }}>
            <Link to={`specify/${item.code}`}>
              <Button color="success">{NotSpecifiedDocumentsTBodyViewTexts.SPECIFY_BUTTON_TEXT}</Button>
            </Link>
          </PrivateAccess>
        </Table.Cell>
      </Table.Row>
    ))}
  </TableComponent>
);

export default NotSpecifiedDocumentsTBodyView;
