import { Controller, type FieldValues, type SubmitHandler, type UseFormReturn } from 'react-hook-form';
import type { FC, MouseEventHandler } from 'react';
import type { EntityId } from '@reduxjs/toolkit';
import classNames from 'classnames';

import { Button, Icon, Select, Table } from '@wf/components';

// eslint-disable-next-line max-len
import LWTransitionPopupContent from '../../../containers/LicenseType/LWApprovalSectionContainer/LWTransitionPopupContent';
import type { ILWApprovalSectionViewProps, ILWApprovalSectionViewTHeaderItem } from './LWApprovalSectionViewType';
import type { OptionsItemType } from '../../../../../components/TableComponent/TableComponentTypes';
import TableCellWithErrorMessage from '../../../../../components/TableCellWithErrorMessage';
import { buttonTypes } from '../../../../../components/FlexableButton/FlexableButtonType';
import TabContentSection from '../../../../../components/TabContentSection';
import ErrorsComponent from '../../../../../components/ErrorsComponent';
import TableComponent from '../../../../../components/TableComponent';
import FlexableButton from '../../../../../components/FlexableButton';

import { type IApprovalProps, LTypeModeItems } from '../../../store/types';

import styles from './LWApprovalSectionView.module.scss';

const tableHeaders: Array<ILWApprovalSectionViewTHeaderItem> = [
  { name: '#', flex: 1 },
  { name: 'Ministry Code*', flex: 3, icon: 'il_info' },
  { name: 'Department Code*', flex: 3, icon: 'il_info' },
  { name: '', flex: 1 },
];

const innerTableHeaders: Array<ILWApprovalSectionViewTHeaderItem> = [
  { name: 'Level', flex: 1 },
  { name: 'Operation Name*', flex: 3 },
  { name: 'Operation Name in NL*', flex: 3 },
  { name: 'Operation Status*', flex: 3 },
  { name: 'Operation Status NL*', flex: 3 },
  { name: 'Return', flex: 3 },
  { name: 'Can Reject', flex: 3 },
  { name: '', flex: 3 },
];

const LWApprovalSectionView: FC<ILWApprovalSectionViewProps> = ({
  handleInputChange,
  ministriesOptions,
  departmentsOptions,
  editDepartmentsOptions,
  allApprovals,
  transitionsData,
  handleSetDepartmentAndMinistryNames,
  handleEditSetDepartmentAndMinistryNames,
  addApproval,
  handleEditApproval,
  cancelEditApproval,
  editTransition,
  addTransition,
  removeTransition,
  updateApproval,
  handleDeleteApproval,
  handleSetMinistryCode,
  handleSetEditMinistryCode,
  editApprovalForm,
  licenseTypeErrors,
  form,
  type,
}) => {
  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = form as UseFormReturn;

  const {
    watch: editWatch,
    control: editControl,
    formState: { errors: editErrors },
    handleSubmit: handleEditSubmit,
  } = editApprovalForm as UseFormReturn;

  const viewMode = type === LTypeModeItems.view;

  return (
    <TabContentSection title="Approval Process Workflow">
      <ErrorsComponent errors={licenseTypeErrors} />
      <TableComponent
        emptyDataText="This is place holder text. The basic dialog for tables"
        emptyDataTitle="No approval data yet"
        dataCount={allApprovals.length}
        tableHeaders={tableHeaders}
      >
        <Table.Row className={styles.approval_add_row}>
          <Table.Cell className={styles.approval_cell}>New</Table.Cell>
          <TableCellWithErrorMessage className={styles.approval_big_cell}>
            <Controller
              render={({ field: { value, onChange } }) => (
                <Select
                  onChange={(selected: OptionsItemType) => handleSetMinistryCode(selected, onChange)}
                  errorMessage={errors?.ministryCode?.message as string}
                  onInputChange={handleInputChange}
                  placeholder="Choose a ministry"
                  options={ministriesOptions}
                  disabled={viewMode}
                  isClearable={true}
                  value={value}
                />
              )}
              name="ministryCode"
              control={control}
            />
          </TableCellWithErrorMessage>
          <TableCellWithErrorMessage className={styles.approval_big_cell}>
            <Controller
              render={({ field: { value, onChange } }) => (
                <Select
                  onChange={(selected: OptionsItemType) => handleSetDepartmentAndMinistryNames(selected, onChange)}
                  errorMessage={errors?.departmentCode?.message as string}
                  disabled={viewMode || !watch('ministryCode')}
                  placeholder="Choose a deparment"
                  options={departmentsOptions}
                  isClearable={true}
                  value={value}
                />
              )}
              name="departmentCode"
              control={control}
            />
          </TableCellWithErrorMessage>
          <Table.Cell className={classNames(styles.last_item, styles.approval_cell)}>
            <Button
              onClick={handleSubmit(addApproval as SubmitHandler<FieldValues>) as MouseEventHandler}
              disabled={viewMode}
              color="success"
            >
              Add
            </Button>
          </Table.Cell>
        </Table.Row>
        {allApprovals.map((item: IApprovalProps, index: number) => (
          <Table.Expandable key={item.id} isOpen>
            <Table.Row
              className={classNames(styles.approval_row, {
                [styles.approval_row_with_err as string]:
                  Object.keys(errors as Record<string, unknown>).length && editWatch('id') === item.id,
              })}
            >
              <Table.Cell className={classNames(styles.first_item, styles.approval_cell)}>{index + 1}</Table.Cell>
              <TableCellWithErrorMessage className={styles.approval_big_cell}>
                <Controller
                  render={({ field: { value, onChange } }) => (
                    <Select
                      className={classNames({
                        [styles.approval_none_content as string]: editWatch('id') !== item.id,
                      })}
                      onChange={(selected: OptionsItemType) => handleSetEditMinistryCode(selected, onChange)}
                      errorMessage={editErrors?.ministryCode?.message as string}
                      onInputChange={handleInputChange}
                      placeholder="Choose a ministry"
                      options={ministriesOptions}
                      disabled={viewMode}
                      isClearable={true}
                      value={value}
                    />
                  )}
                  control={editControl}
                  name="ministryCode"
                />
                {editWatch('id') !== item.id && item.ministryName}
              </TableCellWithErrorMessage>
              <TableCellWithErrorMessage className={styles.approval_big_cell}>
                <Controller
                  render={({ field: { value, onChange } }) => (
                    <Select
                      className={classNames({
                        [styles.approval_none_content as string]: editWatch('id') !== item.id,
                      })}
                      onChange={(selected: OptionsItemType) =>
                        handleEditSetDepartmentAndMinistryNames(selected, onChange)
                      }
                      errorMessage={editErrors?.departmentCode?.message as string}
                      disabled={viewMode || !editWatch('ministryCode')}
                      placeholder="Choose a department"
                      options={editDepartmentsOptions}
                      isClearable={true}
                      value={value}
                    />
                  )}
                  control={editControl}
                  name="departmentCode"
                />
                {editWatch('id') !== item.id && item.departmentName}
              </TableCellWithErrorMessage>
              <Table.Cell className={classNames(styles.last_item, styles.approval_cell)}>
                {editWatch('id') === item.id ? (
                  <>
                    <FlexableButton type={buttonTypes.cancel} handleClick={cancelEditApproval} />
                    <FlexableButton
                      handleClick={handleEditSubmit(updateApproval as SubmitHandler<FieldValues>) as MouseEventHandler}
                      type={buttonTypes.update}
                    />
                  </>
                ) : (
                  type !== LTypeModeItems.view && (
                    <>
                      <FlexableButton
                        handleClick={() => handleDeleteApproval(item.id as EntityId)}
                        type={buttonTypes.delete}
                      />
                      <FlexableButton
                        handleClick={() => handleEditApproval(item.id as EntityId)}
                        type={buttonTypes.edit}
                      />
                    </>
                  )
                )}
              </Table.Cell>
            </Table.Row>
            <Table.Expandable.Content>
              <TableComponent inner={true} tableHeaders={innerTableHeaders} dataCount={2}>
                {item.transitionsArr?.map((trId: number, ind: number) => (
                  <Table.Row key={trId}>
                    <Table.Cell className={classNames(styles.first_item, styles.approval_cell)}>
                      {`${index + 1}.${ind + 1}`}
                    </Table.Cell>
                    <Table.Cell className={styles.approval_big_cell}>{transitionsData[trId]?.operationName}</Table.Cell>
                    <Table.Cell className={styles.approval_big_cell}>
                      {transitionsData[trId]?.operationNameInNationalLang}
                    </Table.Cell>
                    <Table.Cell className={styles.approval_big_cell}>
                      {transitionsData[trId]?.operationStatus}
                    </Table.Cell>
                    <Table.Cell className={styles.approval_big_cell}>
                      {transitionsData[trId]?.operationStatusInNationalLang}
                    </Table.Cell>
                    <Table.Cell className={styles.approval_big_cell}>
                      {transitionsData[trId]?.reRoute ?? '_'}
                    </Table.Cell>
                    <Table.Cell className={styles.approval_big_cell}>
                      {transitionsData[trId]?.isRejectOpEnabled ? 'Yes' : 'No'}
                    </Table.Cell>
                    <Table.Cell className={classNames(styles.last_item, styles.approval_big_cell)}>
                      {type !== LTypeModeItems.view && (
                        <>
                          <FlexableButton
                            handleClick={() => removeTransition(trId as EntityId, item.id as EntityId)}
                            type={buttonTypes.delete}
                          />
                          <FlexableButton
                            handleClick={() => editTransition(trId as EntityId)}
                            type={buttonTypes.edit}
                          />
                        </>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
                <Table.Row>
                  <Table.Cell className={styles.last_item}>
                    <Button
                      onClick={() => addTransition(item.id as EntityId)}
                      disabled={viewMode}
                      color="success"
                      size="sm"
                      outlined
                      ghost
                    >
                      <div className={styles.add_but_content}>
                        <Icon name="ic_add" />
                        Add Approval
                      </div>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </TableComponent>
            </Table.Expandable.Content>
          </Table.Expandable>
        ))}
      </TableComponent>
      <LWTransitionPopupContent />
    </TabContentSection>
  );
};

export default LWApprovalSectionView;
