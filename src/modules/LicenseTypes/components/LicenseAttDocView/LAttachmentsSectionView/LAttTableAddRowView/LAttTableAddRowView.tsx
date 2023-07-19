import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import type { FC } from 'react';

import { Button, Input, Select, Table } from '@wf/components';

import type { OptionsItemType } from '../../../../../../components/TableComponent/TableComponentTypes';
import TableCellWithErrorMessage from '../../../../../../components/TableCellWithErrorMessage';
import SwitcherControllerRenderHOC from '../../../../../../hoc/SwitcherControllerRenderHOC';
import type { ILAttTableAddRowViewProps } from './LAttTableAddRowViewType';

import { LTypeModeItems } from '../../../../store/types';

import styles from './LAttTableAddRowView.module.scss';

const LAttTableAddRowView: FC<ILAttTableAddRowViewProps> = ({
  handleDocInputChange,
  handleProductInputChange,
  documentsOptions,
  productOptions,
  handleAddAttachment,
  handleSetDocumentCode,
  form,
  type,
}) => {
  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = form;
  const viewMode = type === LTypeModeItems.view;
  const render = SwitcherControllerRenderHOC({ viewMode });

  return (
    <Table.Row className={styles.att_add_row}>
      <Table.Cell className={styles.attachment_cell}>New</Table.Cell>
      <TableCellWithErrorMessage className={styles.attachment_big_cell}>
        <Controller
          render={({ field: { value, onChange } }) => (
            <Select
              onChange={(select: OptionsItemType) => handleSetDocumentCode(select, onChange)}
              errorMessage={errors?.code?.message}
              onInputChange={handleDocInputChange}
              placeholder="Choose a code"
              options={documentsOptions}
              disabled={viewMode}
              isClearable={true}
              value={value}
            />
          )}
          control={control}
          name="code"
        />
      </TableCellWithErrorMessage>
      <Table.Cell className={styles.attachment_big_cell}>
        <Input
          placeholder="Document Description"
          value={watch('description')}
          name="docDescriptionValue"
          disabled={true}
        />
      </Table.Cell>
      <TableCellWithErrorMessage className={styles.attachment_big_cell}>
        <Controller
          render={({ field }) => (
            <Select
              errorMessage={errors?.tariffListCode?.message}
              onInputChange={handleProductInputChange}
              placeholder="Choose a product"
              options={productOptions}
              disabled={viewMode}
              isClearable={true}
              {...field}
            />
          )}
          name="tariffListCode"
          control={control}
        />
      </TableCellWithErrorMessage>
      <Table.Cell className={styles.attachment_big_cell}>
        <Controller control={control} name="isDateRequired" render={render} />
      </Table.Cell>
      <Table.Cell className={styles.attachment_big_cell}>
        <Controller control={control} name="isReferenceRequired" render={render} />
      </Table.Cell>
      <Table.Cell className={classNames(styles.last_item, styles.attachment_cell)}>
        <Button disabled={viewMode} onClick={handleSubmit(handleAddAttachment)} color="success">
          Add
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default LAttTableAddRowView;
