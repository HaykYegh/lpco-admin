import { type EntityId } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import type { FC } from 'react';

import { PrivateAccess } from '@wf/keycloak-axios-provider';
import { Icon, Table } from '@wf/components';

import type { IConfLicensesTBodyProps, IConfLicensesTHeaderItem } from './ConfiguredLicensesTBodyTypes';
import TableComponent from '../../../../components/TableComponent';

import { type LicenseType } from '../../store/types';

import { rolesEnums } from '../../../../constatnts';

import styles from './ConfiguredLicensesTBodyView.module.scss';

const tableHeaders: Array<IConfLicensesTHeaderItem> = [
  { name: 'License Code', flex: 2 },
  { name: 'Ministry Owner Code', flex: 2 },
  { name: 'License Name', flex: 2 },
  { name: 'Flow', flex: 1 },
  { name: 'Default Type of Use', flex: 2 },
  { name: 'Default Quota Type', flex: 2 },
  { name: 'Product List Code', flex: 2 },
  { name: '', flex: 1 },
];

const ConfiguredLicensesTBodyView: FC<IConfLicensesTBodyProps> = ({
  data,
  handleOpen,
  dataCount,
  handlePageChange,
  tableFilterItems,
  emptyDataTitle,
  emptyDataText,
}) => {
  const dataIds = data.ids;
  const dataEntities = data.entities;

  return (
    <TableComponent
      onPageChange={handlePageChange}
      emptyDataTitle={emptyDataTitle}
      filterItems={tableFilterItems}
      emptyDataText={emptyDataText}
      tableHeaders={tableHeaders}
      dataCount={dataCount}
    >
      {dataIds.map((id: EntityId) => (
        <Table.Expandable key={id}>
          <Table.Row>
            <Table.Cell className={classNames(styles.first_item, styles.license_big_cell)}>
              {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
              <Link to={`view/${dataEntities[id]?.id}`}>{dataEntities[id]?.licenseTypeCode}</Link>
            </Table.Cell>
            <Table.Cell className={styles.license_big_cell}>{dataEntities[id]?.ministryCode}</Table.Cell>
            <Table.Cell className={styles.license_big_cell}>{dataEntities[id]?.licenseTypeName}</Table.Cell>
            <Table.Cell className={styles.license_cell}>{dataEntities[id]?.flow}</Table.Cell>
            <Table.Cell className={styles.license_big_cell}>{dataEntities[id]?.typeOfUse}</Table.Cell>
            <Table.Cell className={styles.license_big_cell}>{dataEntities[id]?.quotaType}</Table.Cell>
            <Table.Cell className={styles.license_big_cell}>{dataEntities[id]?.tariffListCode}</Table.Cell>
            <Table.Cell
              className={classNames(styles.last_item, styles.license_cell)}
              onClick={() => handleOpen(id, dataEntities)}
              expandOnClick
            >
              <PrivateAccess roles={{ lpco2_admin: [rolesEnums.ADMINISTRATOR, rolesEnums.MINISTRY_ADMINISTRATOR] }}>
                {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
                <Link to={`edit/${dataEntities[id]?.licenseTypeCode}`}>
                  <Icon name="ic_edit" size={17} />
                </Link>
              </PrivateAccess>
              <Icon name="ic_arrow_down" size={17} />
            </Table.Cell>
          </Table.Row>
          <Table.Expandable.Content>
            <TableComponent
              dataCount={dataEntities?.[id]?.historizedData?.length}
              emptyDataTitle="No historized data yet"
              loader={dataEntities[id]?.loader}
              withHeader={false}
              maxRows={5}
              inner
            >
              {dataEntities?.[id]?.historizedData &&
                dataEntities?.[id]?.historizedData?.map((item: LicenseType) => (
                  <Table.Row key={item.id}>
                    <Table.Cell className={classNames(styles.first_item, styles.license_big_cell)}>
                      {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
                      <Link to={`view/${item.id}`}>{item?.licenseTypeCode}</Link>
                    </Table.Cell>
                    <Table.Cell className={styles.license_big_cell}>{item?.ministryCode}</Table.Cell>
                    <Table.Cell className={styles.license_big_cell}>{item?.licenseTypeName}</Table.Cell>
                    <Table.Cell className={styles.license_cell}>{item?.flow}</Table.Cell>
                    <Table.Cell className={styles.license_big_cell}>{item?.typeOfUse}</Table.Cell>
                    <Table.Cell className={styles.license_big_cell}>{item?.quotaType}</Table.Cell>
                    <Table.Cell className={styles.license_big_cell}>{item?.tariffListCode}</Table.Cell>
                    <Table.Cell className={classNames(styles.last_item, styles.license_cell)}></Table.Cell>
                  </Table.Row>
                ))}
            </TableComponent>
          </Table.Expandable.Content>
        </Table.Expandable>
      ))}
    </TableComponent>
  );
};

export default ConfiguredLicensesTBodyView;
