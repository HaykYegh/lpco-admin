import type { EntityId } from '@reduxjs/toolkit';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import type { FC } from 'react';

import { Input, Select, Table } from '@wf/components';

import type { OptionsItemType } from '../../../../../../components/TableComponent/TableComponentTypes';
import TableCellWithErrorMessage from '../../../../../../components/TableCellWithErrorMessage';
import { buttonTypes } from '../../../../../../components/FlexableButton/FlexableButtonType';
import FlexableButton from '../../../../../../components/FlexableButton';
import type { ILFeeTableRowViewProps } from './LFeesTableRowViewType';
import LFeesTableRowViewTexts from './LFeesTableRowViewTexts';

import { LTypeModeItems } from '../../../../store/types';

import { setFeesForEditActionName } from '../../../../store/actions';

import styles from './LFeesTableRowView.module.scss';

const LFeesTableRowView: FC<ILFeeTableRowViewProps> = ({
  item,
  index,
  type,
  feesForEditOptions,
  handleEditFeeInputChange,
  handleCancelLFee,
  handleUpdateLFee,
  handleRemoveLFee,
  handleEditLFee,
  handleSetLicenseFeeEditCode,
  getLicenseFees,
  editFeeCodeValue,
  editForm,
}) => {
  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = editForm;
  const watchId = watch('id');
  const watchFeeDesc = watch('feeDescription');
  const viewMode = type === LTypeModeItems.view;
  const showEditableMode: boolean = watchId === item.id;

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
          render={({ field: { onChange, value } }) => (
            <Select
              className={classNames({
                [styles.att_none_content as string]: !showEditableMode,
              })}
              onChange={(select: OptionsItemType) => handleSetLicenseFeeEditCode(select, onChange)}
              onFocus={() => getLicenseFees('', setFeesForEditActionName)}
              placeholder={LFeesTableRowViewTexts.FEE_CODE_PLACEHOLDER}
              onInputChange={handleEditFeeInputChange}
              errorMessage={errors?.feeCode?.message}
              inputValue={editFeeCodeValue}
              options={feesForEditOptions}
              disabled={viewMode}
              isClearable={true}
              value={value}
            />
          )}
          control={control}
          name="feeCode"
        />
        {!showEditableMode && item.feeCode}
      </TableCellWithErrorMessage>
      <Table.Cell className={styles.att_row_big_cell}>
        <Input
          className={classNames({
            [styles.att_none_content as string]: !showEditableMode,
          })}
          placeholder={LFeesTableRowViewTexts.FEE_DESCRIPTION_PLACEHOLDER}
          value={watchFeeDesc}
          disabled={true}
        />
        {!showEditableMode && item.feeDescription}
      </Table.Cell>
      <TableCellWithErrorMessage className={styles.att_row_big_cell}>
        <Controller
          render={({ field }) => (
            <Input
              className={classNames({
                [styles.att_none_content as string]: !showEditableMode,
              })}
              placeholder={LFeesTableRowViewTexts.FEE_AMOUNT_PLACEHOLDER}
              errorMessage={errors?.amount?.message}
              disabled={viewMode}
              type="number"
              {...field}
            />
          )}
          control={control}
          name="amount"
        />
        {!showEditableMode && item.amount}
      </TableCellWithErrorMessage>
      {!viewMode && (
        <Table.Cell className={classNames(styles.last_item, styles.att_row_cell)}>
          {showEditableMode ? (
            <>
              <FlexableButton type={buttonTypes.cancel} handleClick={handleCancelLFee} />
              <FlexableButton type={buttonTypes.update} handleClick={handleSubmit(handleUpdateLFee)} />
            </>
          ) : (
            !showEditableMode && (
              <>
                <FlexableButton type={buttonTypes.delete} handleClick={() => handleRemoveLFee(item.id as EntityId)} />
                <FlexableButton type={buttonTypes.edit} handleClick={() => handleEditLFee(item.id as EntityId)} />
              </>
            )
          )}
        </Table.Cell>
      )}
    </Table.Row>
  );
};

export default LFeesTableRowView;
