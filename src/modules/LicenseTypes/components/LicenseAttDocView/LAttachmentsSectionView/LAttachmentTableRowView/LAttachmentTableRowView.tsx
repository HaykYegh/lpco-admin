import type { EntityId } from '@reduxjs/toolkit';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import type { FC } from 'react';

import { Input, Select, Table } from '@wf/components';

import type { OptionsItemType } from '../../../../../../components/TableComponent/TableComponentTypes';
import TableCellWithErrorMessage from '../../../../../../components/TableCellWithErrorMessage';
import { buttonTypes } from '../../../../../../components/FlexableButton/FlexableButtonType';
import SwitcherControllerRenderHOC from '../../../../../../hoc/SwitcherControllerRenderHOC';
import { getOnOfDependsParam } from '../../../../../../helpers/getOnOffDependsParam';
import type { ILAttachmentTableRowViewProps } from './LAttachmentTableRowViewType';
import FlexableButton from '../../../../../../components/FlexableButton';

import { LTypeModeItems } from '../../../../store/types';

import styles from './LAttachmentTableRowView.module.scss';

const LAttachmentTableRowView: FC<ILAttachmentTableRowViewProps> = ({
  item,
  index,
  type,
  documentsOptions,
  handleEditDocInputChange,
  productOptions,
  handleEditProductInputChange,
  handleCancelAttachment,
  handleUpdateAttachment,
  handleRemoveAttachment,
  handleEditAttachment,
  handleSetDocumentEditCode,
  editForm,
}) => {
  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = editForm;
  const showEditableMode: boolean = watch('id') === item.id;
  const viewMode = type === LTypeModeItems.view;
  const render = SwitcherControllerRenderHOC({
    viewMode,
    className: classNames({
      [styles.att_none_content as string]: !showEditableMode,
    }),
  });

  return (
    <Table.Row
      className={classNames(styles.att_row, {
        [styles.att_row_with_err as string]: Object.keys(errors as Record<string, unknown>).length && showEditableMode,
      })}
      key={item.id}
    >
      <Table.Cell className={styles.att_row_cell}>{index + 1}</Table.Cell>
      <TableCellWithErrorMessage className={styles.att_row_big_cell}>
        <Controller
          render={({ field: { value, onChange } }) => (
            <Select
              className={classNames({
                [styles.att_none_content as string]: !showEditableMode,
              })}
              onChange={(select: OptionsItemType) => handleSetDocumentEditCode(select, onChange)}
              onInputChange={handleEditDocInputChange}
              errorMessage={errors?.code?.message}
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
        {watch('id') !== item.id && item.code}
      </TableCellWithErrorMessage>
      <Table.Cell className={styles.att_row_big_cell}>
        <Input
          className={classNames({
            [styles.att_none_content as string]: !showEditableMode,
          })}
          placeholder="Document Description"
          value={watch('description')}
          disabled={true}
        />
        {watch('id') !== item.id && item.description}
      </Table.Cell>
      <TableCellWithErrorMessage className={styles.att_row_big_cell}>
        <Controller
          render={({ field }) => (
            <Select
              className={classNames({
                [styles.att_none_content as string]: !showEditableMode,
              })}
              errorMessage={errors?.tariffListCode?.message}
              onInputChange={handleEditProductInputChange}
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
        {watch('id') !== item.id && item.tariffListCode}
      </TableCellWithErrorMessage>
      <Table.Cell className={styles.att_row_big_cell}>
        <Controller control={control} name="isDateRequired" render={render} />
        {watch('id') !== item.id && getOnOfDependsParam(item.isDateRequired)}
      </Table.Cell>
      <Table.Cell className={styles.att_row_big_cell}>
        <Controller control={control} name="isReferenceRequired" render={render} />
        {watch('id') !== item.id && getOnOfDependsParam(item.isReferenceRequired)}
      </Table.Cell>
      <Table.Cell className={classNames(styles.last_item, styles.att_row_cell)}>
        {watch('id') === item.id ? (
          <>
            <FlexableButton type={buttonTypes.cancel} handleClick={() => handleCancelAttachment()} />
            <FlexableButton type={buttonTypes.update} handleClick={handleSubmit(handleUpdateAttachment)} />
          </>
        ) : (
          type !== LTypeModeItems.view && (
            <>
              <FlexableButton
                handleClick={() => handleRemoveAttachment(item.id as EntityId)}
                type={buttonTypes.delete}
              />
              <FlexableButton type={buttonTypes.edit} handleClick={() => handleEditAttachment(item.id as EntityId)} />
            </>
          )
        )}
      </Table.Cell>
    </Table.Row>
  );
};

export default LAttachmentTableRowView;
