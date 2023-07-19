import { type FC, useEffect } from 'react';

import { Controller } from 'react-hook-form';
import classNames from 'classnames';

import { Button, Input, Select, Table } from '@wf/components';

import type { OptionsItemType } from '../../../../../../components/TableComponent/TableComponentTypes';
import TableCellWithErrorMessage from '../../../../../../components/TableCellWithErrorMessage';
import type { ILAppFeesTableAddRowViewProps } from './LFeesTableAddRowViewType';
import LFeesTableAddRowViewTexts from './LFeesTableAddRowViewTexts';

import { LTypeModeItems } from '../../../../store/types';

import { setFeesActionName } from '../../../../store/actions';

import styles from './LFeesTableAddRowView.module.scss';

const LFeesTableAddRowView: FC<ILAppFeesTableAddRowViewProps> = ({
  handleFeeInputChange,
  feeCodeValue,
  feesOptions,
  handleAddLFee,
  handleSetLicenseFeeCode,
  getLicenseFees,
  fixedMode,
  form,
  type,
}) => {
  const {
    watch,
    control,
    formState: { errors },
    clearErrors,
    handleSubmit,
  } = form;
  const viewMode = type === LTypeModeItems.view;
  const disabled = viewMode || !fixedMode;

  useEffect(() => {
    if (!fixedMode) {
      clearErrors('feeCode');
      clearErrors('amount');
    }
  }, [fixedMode, clearErrors]);

  return (
    <Table.Row className={styles.att_add_row}>
      <Table.Cell className={styles.attachment_cell}>New</Table.Cell>
      <TableCellWithErrorMessage className={styles.attachment_big_cell}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Select
              onChange={(select: OptionsItemType) => handleSetLicenseFeeCode(select, onChange)}
              placeholder={LFeesTableAddRowViewTexts.FEE_CODE_PLACEHOLDER}
              onFocus={() => getLicenseFees('', setFeesActionName)}
              errorMessage={errors?.feeCode?.message}
              onInputChange={handleFeeInputChange}
              inputValue={feeCodeValue}
              options={feesOptions}
              disabled={disabled}
              isClearable={true}
              value={value}
            />
          )}
          control={control}
          name="feeCode"
        />
      </TableCellWithErrorMessage>
      <Table.Cell className={styles.attachment_big_cell}>
        <Input
          placeholder={LFeesTableAddRowViewTexts.FEE_DESCRIPTION_PLACEHOLDER}
          value={watch('feeDescription')}
          name="feeDescription"
          disabled={true}
        />
      </Table.Cell>
      <TableCellWithErrorMessage className={styles.attachment_big_cell}>
        <Controller
          render={({ field }) => (
            <Input
              placeholder={LFeesTableAddRowViewTexts.FEE_AMOUNT_PLACEHOLDER}
              errorMessage={errors?.amount?.message}
              disabled={disabled}
              type="number"
              min="0"
              {...field}
            />
          )}
          control={control}
          name="amount"
        />
      </TableCellWithErrorMessage>
      <Table.Cell className={classNames(styles.last_item, styles.attachment_cell)}>
        <Button disabled={disabled} onClick={handleSubmit(handleAddLFee)} color="success">
          {LFeesTableAddRowViewTexts.ADD_FEE_BUTTON_TEXT}
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default LFeesTableAddRowView;
