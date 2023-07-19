import { Link } from 'react-router-dom';
import type { FC } from 'react';

import { PrivateAccess } from '@wf/keycloak-axios-provider';
import { Button, Table } from '@wf/components';

import type { INotConfLicensesTBodyProps, INotConfLicensesTHeaderItem } from './NotConfiguredLicensesTBodyTypes';
import TableComponent from '../../../../components/TableComponent';
import type { DocumentType } from '../../../Documents/store/types';
import { appPaths } from '../../../../constatnts/appPaths';

import { rolesEnums } from '../../../../constatnts';

import styles from './NotConfiguredLicensesTBodyView.module.scss';

const tableHeaders: Array<INotConfLicensesTHeaderItem> = [
  { name: 'License Type Code', flex: 1 },
  { name: 'License Type Name', flex: 1 },
  { name: 'License Type Name in NL', flex: 1 },
  { name: 'Nature of license', flex: 1 },
  { name: 'Ministry Owner Code', flex: 1 },
  { name: 'Department Owner Code', flex: 1 },
  { name: '', flex: 1 },
];

const NotConfiguredLicensesTBodyView: FC<INotConfLicensesTBodyProps> = ({
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
    {data.map((item: DocumentType) => (
      <Table.Row key={item.code}>
        <Table.Cell>{item.code}</Table.Cell>
        <Table.Cell>{item.description}</Table.Cell>
        <Table.Cell>{item.descriptionTranslated}</Table.Cell>
        <Table.Cell>{item.licenseTypeNature}</Table.Cell>
        <Table.Cell>{item.ministryCode}</Table.Cell>
        <Table.Cell>{item.departmentCode}</Table.Cell>
        <Table.Cell className={styles.last_item}>
          <PrivateAccess roles={{ lpco2_admin: [rolesEnums.ADMINISTRATOR, rolesEnums.MINISTRY_ADMINISTRATOR] }}>
            <Link to={`${appPaths.licenses}/create/${item.code}`}>
              <Button color="success">Configurate</Button>
            </Link>
          </PrivateAccess>
        </Table.Cell>
      </Table.Row>
    ))}
  </TableComponent>
);

export default NotConfiguredLicensesTBodyView;
