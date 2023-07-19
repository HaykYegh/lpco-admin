import type { FC } from 'react';

import type { ILAttachmentsSectionViewProps, ILWApprovalSectionViewTHeaderItem } from './LAttachmentsSectionViewType';
import TabContentSection from '../../../../../components/TabContentSection';
import TableComponent from '../../../../../components/TableComponent';
import LAttachmentTableRowView from './LAttachmentTableRowView';
import LAttTableAddRowView from './LAttTableAddRowView';

import type { IAttachedDocumentItem } from '../../../store/types';

const tableHeaders: Array<ILWApprovalSectionViewTHeaderItem> = [
  { name: '#', flex: 1 },
  { name: 'Code', flex: 3 },
  { name: 'Description', flex: 3 },
  { name: 'Product List Code', flex: 3 },
  { name: 'Date Required', flex: 3 },
  { name: 'Ref. Num. Required', flex: 3 },
  { name: '', flex: 1 },
];

const LAttachmentsSectionView: FC<ILAttachmentsSectionViewProps> = ({
  handleDocInputChange,
  handleProductInputChange,
  documentsOptions,
  productOptions,
  handleEditDocInputChange,
  handleEditProductInputChange,
  handleAddAttachment,
  handleRemoveAttachment,
  handleEditAttachment,
  handleUpdateAttachment,
  handleCancelAttachment,
  allAttachedDocuments,
  handleSetDocumentCode,
  handleSetDocumentEditCode,
  form,
  editForm,
  type,
}) => (
  <TabContentSection title="List of Attachments">
    <TableComponent
      emptyDataText="This is place holder text. The basic dialog for tables"
      emptyDataTitle="No attached document yet"
      dataCount={allAttachedDocuments.length}
      tableHeaders={tableHeaders}
    >
      <LAttTableAddRowView
        handleProductInputChange={handleProductInputChange}
        handleSetDocumentCode={handleSetDocumentCode}
        handleDocInputChange={handleDocInputChange}
        handleAddAttachment={handleAddAttachment}
        documentsOptions={documentsOptions}
        productOptions={productOptions}
        form={form}
        type={type}
      />
      {allAttachedDocuments.map((item: IAttachedDocumentItem, index: number) => (
        <LAttachmentTableRowView
          handleEditProductInputChange={handleEditProductInputChange}
          handleSetDocumentEditCode={handleSetDocumentEditCode}
          handleEditDocInputChange={handleEditDocInputChange}
          handleCancelAttachment={handleCancelAttachment}
          handleUpdateAttachment={handleUpdateAttachment}
          handleRemoveAttachment={handleRemoveAttachment}
          handleEditAttachment={handleEditAttachment}
          documentsOptions={documentsOptions}
          productOptions={productOptions}
          editForm={editForm}
          key={item.id}
          index={index}
          item={item}
          type={type}
        />
      ))}
    </TableComponent>
  </TabContentSection>
);

export default LAttachmentsSectionView;
