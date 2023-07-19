import { type FC, useMemo } from 'react';

import { Controller, type UseFormReturn } from 'react-hook-form';

import type { ILAppFeesSectionViewProps, ILWApprovalSectionViewTHeaderItem } from './LFeesSectionViewType';
import TabContentSection from '../../../../../components/TabContentSection';
import SwitcherComponent from '../../../../../components/SwitcherComponent';
import ErrorsComponent from '../../../../../components/ErrorsComponent';
import TableComponent from '../../../../../components/TableComponent';
import SectionBody from '../../../../../components/SectionBody';
import LFeesSectionViewTexts from './LFeesSectionViewTexts';
import LFeesTableAddRowView from './LFeesTableAddRowView';
import { licenseFeeTypes } from '../LicenseFeesViewTypes';
import LFeesTableRowView from './LFeesTableRowView';

import { LTypeModeItems } from '../../../store/types';

import type { IFeeItem } from '../../../store/types';

const tableHeaders: Array<ILWApprovalSectionViewTHeaderItem> = [
  { name: '#', flex: 1 },
  { name: LFeesSectionViewTexts.TABLE_HEADER_CODE_TITLE, flex: 3 },
  { name: LFeesSectionViewTexts.TABLE_HEADER_DESCRIPTION_TITLE, flex: 3 },
  { name: LFeesSectionViewTexts.TABLE_HEADER_AMOUNT_TITLE, flex: 3 },
];

const fixFeeFieldName = 'applicationFeeMode';
const fixFeeForExtendFieldName = 'extensionFeeMode';

const LFeesSectionView: FC<ILAppFeesSectionViewProps> = ({
  handleFeeInputChange,
  feeCodeValue,
  editFeeCodeValue,
  feesOptions,
  feesForEditOptions,
  handleEditFeeInputChange,
  handleAddLFee,
  handleRemoveLFee,
  handleEditLFee,
  handleUpdateLFee,
  handleCancelLFee,
  handleSetLicenseFeeCode,
  handleSetLicenseFeeEditCode,
  getLicenseFees,
  allLicenseFees,
  licenseTypeForm,
  licenseFeeType,
  fixedMode,
  lTErrors,
  title,
  feeCalcTypes,
  form,
  editForm,
  type,
}) => {
  const { control } = licenseTypeForm as UseFormReturn;
  const viewMode = type === LTypeModeItems.view;

  const calcFeeParamName: string =
    licenseFeeType === licenseFeeTypes.APPLICATION_FEE ? fixFeeFieldName : fixFeeForExtendFieldName;

  const feeTableHeaders = useMemo(
    () => (viewMode ? tableHeaders : [...tableHeaders, { name: '', flex: 1 }]),
    [viewMode]
  );

  return (
    <TabContentSection title={title}>
      <ErrorsComponent errors={lTErrors} />
      <SectionBody>
        <Controller
          render={({ field: { onChange, value } }) => (
            <SwitcherComponent
              handleChange={onChange}
              items={feeCalcTypes}
              disabled={viewMode}
              color="success"
              value={value}
            />
          )}
          name={calcFeeParamName}
          control={control}
        />
      </SectionBody>
      <TableComponent
        emptyDataTitle={LFeesSectionViewTexts.TABLE_NO_DATA_TITLE}
        dataCount={allLicenseFees.length}
        tableHeaders={feeTableHeaders}
      >
        {!viewMode && (
          <LFeesTableAddRowView
            handleSetLicenseFeeCode={handleSetLicenseFeeCode}
            handleFeeInputChange={handleFeeInputChange}
            getLicenseFees={getLicenseFees}
            handleAddLFee={handleAddLFee}
            feeCodeValue={feeCodeValue}
            feesOptions={feesOptions}
            fixedMode={fixedMode}
            form={form}
            type={type}
          />
        )}
        {allLicenseFees.map((item: IFeeItem, index: number) => (
          <LFeesTableRowView
            handleSetLicenseFeeEditCode={handleSetLicenseFeeEditCode}
            handleEditFeeInputChange={handleEditFeeInputChange}
            feesForEditOptions={feesForEditOptions}
            handleCancelLFee={handleCancelLFee}
            handleUpdateLFee={handleUpdateLFee}
            handleRemoveLFee={handleRemoveLFee}
            editFeeCodeValue={editFeeCodeValue}
            getLicenseFees={getLicenseFees}
            handleEditLFee={handleEditLFee}
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
};

export default LFeesSectionView;
