import { Link } from 'react-router-dom';
import type { FC } from 'react';

import { Table } from '@wf/components';

import type { ISpecifiedDocumentsTBodyProps, ITHeaderItem } from './SpecifiedDocumentsTBodyTypes';
import SpecifiedDocumentsTBodyViewTexts from './SpecifiedDocumentsTBodyViewTexts';
import TableComponent from '../../../../components/TableComponent';

import type { DocumentType } from '../../store/types';

import styles from './SpecifiedDocumentsTBodyView.module.scss';

const tableHeaders: Array<ITHeaderItem> = [
  { name: SpecifiedDocumentsTBodyViewTexts.ATT_DOCUMENT_CODE, flex: 1 },
  { name: SpecifiedDocumentsTBodyViewTexts.ATT_DOCUMENT_NAME, flex: 1 },
  { name: SpecifiedDocumentsTBodyViewTexts.ATT_DOCUMENT_NAME_IN_NL, flex: 1 },
  { name: SpecifiedDocumentsTBodyViewTexts.NATURE_OF_LICENSE, flex: 1 },
  { name: SpecifiedDocumentsTBodyViewTexts.MINISTRY_OWNER_CODE, flex: 1 },
  { name: SpecifiedDocumentsTBodyViewTexts.DEPARTMENT_OWNER_CODE, flex: 1 },
];

const SpecifiedDocumentsTBodyView: FC<ISpecifiedDocumentsTBodyProps> = ({
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
        <Table.Cell className={styles.with_link}>
          <Link to={`view/${item.code}`}>{`#${item.code}`}</Link>
        </Table.Cell>
        <Table.Cell>{item.description}</Table.Cell>
        <Table.Cell>{item.descriptionTranslated}</Table.Cell>
        <Table.Cell>{item.licenseTypeNature}</Table.Cell>
        <Table.Cell>{item.ministryCode}</Table.Cell>
        <Table.Cell>{item.departmentCode}</Table.Cell>
      </Table.Row>
    ))}
  </TableComponent>
);

export default SpecifiedDocumentsTBodyView;
