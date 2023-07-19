import { useCallback, useEffect, useState } from 'react';

import { useForm, type UseFormReturn, type UseFormSetValue } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import type { EntityId } from '@reduxjs/toolkit';
import type { FC } from 'react';

import { feesAdapter, feesAdapterForExtend, lTypeErrorsAdapter } from '../../../store/entityAdapters';
import type { OptionsItemType } from '../../../../../components/TableComponent/TableComponentTypes';
import { createOptionsArrayFromData } from '../../../../../helpers/createOptionsArrayFromData';
import { licenseFeeTypes } from '../../../components/LicenseFeesView/LicenseFeesViewTypes';
import { getDataDependsBoolean } from '../../../../../helpers/getDataDependsBoolean';
import LFeesSectionView from '../../../components/LicenseFeesView/LFeesSectionView';
import feesValidationSchema from '../../../validationSchemas/feesValidationSchema';
import type { ILAppFeesSectionContainer } from './LFeesSectionContainerType';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';

import { feesFormDefaultValues } from '../../../constants';
import { feeMode } from '../../../store/types';

import {
  addLicenseFeeActionName,
  addLicenseFeeForExtendActionName,
  getLicenseFeesApi,
  removeLicenseFeeActionName,
  removeLicenseFeeForExtendActionName,
  setFeesActionName,
  setFeesForEditActionName,
  updateLicenseFeeActionName,
  updateLicenseFeeForExtendActionName,
} from '../../../store/actions';
import {
  feesForEditSelector,
  feesSelector,
  licenseErrorMessagesSelector,
  licenseTypeFeesByCodeSelector,
  licenseTypeFeesForExtendByCodeSelector,
} from '../../../store/selectors';
import type { IFeeItem, IFeeItemForm } from '../../../store/types';
import * as slicesActions from '../../../store/slices';

const LFeesSectionContainer: FC<ILAppFeesSectionContainer> = ({
  licenseTypeForm,
  title,
  feeCalcTypes,
  licenseFeeType,
}) => {
  const { type } = useTypeInPath();
  const dispatch = useDispatch();
  const [feeCodeValue, setFeeCodeValue] = useState('');
  const [showAppFees, setShowAppFees] = useState(false);
  const [editFeeCodeValue, setEditFeeCodeValue] = useState('');

  const feesData = useSelector(feesSelector);
  const feesForEditData = useSelector(feesForEditSelector);
  const appLFeeBool = licenseFeeType === licenseFeeTypes.APPLICATION_FEE;

  const addFee = getDataDependsBoolean(appLFeeBool, addLicenseFeeActionName, addLicenseFeeForExtendActionName);
  const updateFee = getDataDependsBoolean(appLFeeBool, updateLicenseFeeActionName, updateLicenseFeeForExtendActionName);
  const removeFee = getDataDependsBoolean(appLFeeBool, removeLicenseFeeActionName, removeLicenseFeeForExtendActionName);

  const feesAdapterSelectors = feesAdapter.getSelectors();
  const feesForExtendAdapterSelectors = feesAdapterForExtend.getSelectors();

  const licenseFeesSelector = useSelector(licenseTypeFeesByCodeSelector);
  const allLicenseFees = feesAdapterSelectors.selectAll(licenseFeesSelector);

  const licenseFeesForExtendSelector = useSelector(licenseTypeFeesForExtendByCodeSelector);
  const allLicenseFeesForExtend = feesForExtendAdapterSelectors.selectAll(licenseFeesForExtendSelector);

  const licenseTypeErrors = useSelector(licenseErrorMessagesSelector);
  const licenseTypeErrorsSelectors = lTypeErrorsAdapter.getSelectors();
  const licenseTypeAppFeesErrors = licenseTypeErrorsSelectors.selectById(licenseTypeErrors, 'applicationFees');
  const licenseTypeExtFeesrrors = licenseTypeErrorsSelectors.selectById(licenseTypeErrors, 'extensionFees');
  const licenseTypeAppFeesErrorsParams = licenseTypeAppFeesErrors?.params ?? [];
  const licenseTypeExtFeesrrorsParams = licenseTypeExtFeesrrors?.params ?? [];
  const lTErrors = getDataDependsBoolean(appLFeeBool, licenseTypeAppFeesErrorsParams, licenseTypeExtFeesrrorsParams);

  const form = useForm({
    resolver: yupResolver(feesValidationSchema),
    defaultValues: feesFormDefaultValues,
  });

  const { watch } = licenseTypeForm as UseFormReturn;
  const applicationFeeModeWatch = getDataDependsBoolean(
    appLFeeBool,
    watch('applicationFeeMode'),
    watch('extensionFeeMode')
  );
  const fixedMode = applicationFeeModeWatch === feeMode.FIXED;

  const { reset, setValue } = form;

  const editForm = useForm({
    resolver: yupResolver(feesValidationSchema),
    defaultValues: feesFormDefaultValues,
  });
  const { reset: editReset, setValue: editSetValue } = editForm;

  useEffect(() => {
    setShowAppFees(fixedMode);
  }, [applicationFeeModeWatch, fixedMode]);

  const getLicenseFees = useCallback(
    (codeValue: string, actionName: typeof setFeesActionName | typeof setFeesForEditActionName) => {
      dispatch(getLicenseFeesApi({ feeCodeValue: codeValue, actionName }));
    },
    [dispatch]
  );

  const handleFeeInputChange = useCallback(
    (value: string) => {
      setFeeCodeValue(value);
      getLicenseFees(value, setFeesActionName);
    },
    [setFeeCodeValue, getLicenseFees]
  );

  const handleEditFeeInputChange = useCallback(
    (value: string) => {
      setEditFeeCodeValue(value);
      getLicenseFees(value, setFeesForEditActionName);
    },
    [setEditFeeCodeValue, getLicenseFees]
  );

  const handleCancelLFee = () => {
    editReset(feesFormDefaultValues);
  };

  const handleAddLFee = (data: IFeeItemForm) => {
    const licenseFee = {
      id: Date.now(),
      feeCode: data.feeCode?.label,
      feeDescription: (data.feeCode?.tag?.label as string) ?? '',
      feeType: licenseFeeType,
      benCode: data.benCode ?? '',
      benDescription: data.benDescription ?? '',
      amount: data.amount,
    };
    reset(feesFormDefaultValues);
    dispatch(slicesActions[addFee](licenseFee));
  };

  const handleUpdateLFee = (data: IFeeItemForm) => {
    const licenseFee = {
      id: data.id,
      feeCode: data.feeCode?.label,
      feeDescription: (data.feeCode?.tag?.label as string) ?? '',
      feeType: licenseFeeType,
      benCode: data.benCode ?? '',
      benDescription: data.benDescription ?? '',
      amount: data.amount,
    };
    editReset(feesFormDefaultValues);
    dispatch(slicesActions[updateFee]({ id: data.id as EntityId, changes: licenseFee as IFeeItem }));
  };

  const handleEditLFee = (id: EntityId) => {
    const licenseFee = getDataDependsBoolean(
      appLFeeBool,
      feesAdapterSelectors.selectById(licenseFeesSelector, id),
      feesForExtendAdapterSelectors.selectById(licenseFeesForExtendSelector, id)
    );
    editReset({
      id: licenseFee?.id as number,
      feeCode: {
        label: licenseFee?.feeCode,
        value: licenseFee?.feeCode,
        tag: {
          label: licenseFee?.feeDescription,
        },
      },
      feeDescription: licenseFee?.feeDescription,
      feeType: licenseFee?.feeType,
      benCode: licenseFee?.benCode,
      benDescription: licenseFee?.benDescription,
      amount: licenseFee?.amount,
    } as Record<string, any>);
  };

  const handleRemoveLFee = (id: EntityId) => {
    dispatch(slicesActions[removeFee](id));
  };

  const setLicenseFeeCode =
    (setDescription: UseFormSetValue<typeof feesFormDefaultValues>) =>
    (select: OptionsItemType, onChange: (select: OptionsItemType) => void) => {
      setDescription('feeDescription', (select?.tag?.label as string) ?? '');
      onChange(select);
    };

  const allFees = getDataDependsBoolean(appLFeeBool, allLicenseFees, allLicenseFeesForExtend);

  return (
    <LFeesSectionView
      feesForEditOptions={createOptionsArrayFromData(feesForEditData, 'feeCode', 'feeCode', 'feeDescription')}
      feesOptions={createOptionsArrayFromData(feesData, 'feeCode', 'feeCode', 'feeDescription')}
      handleSetLicenseFeeEditCode={setLicenseFeeCode(editSetValue)}
      handleSetLicenseFeeCode={setLicenseFeeCode(setValue)}
      handleEditFeeInputChange={handleEditFeeInputChange}
      handleFeeInputChange={handleFeeInputChange}
      allLicenseFees={showAppFees ? allFees : []}
      editFeeCodeValue={editFeeCodeValue}
      handleRemoveLFee={handleRemoveLFee}
      handleCancelLFee={handleCancelLFee}
      handleUpdateLFee={handleUpdateLFee}
      licenseTypeForm={licenseTypeForm}
      handleEditLFee={handleEditLFee}
      licenseFeeType={licenseFeeType}
      getLicenseFees={getLicenseFees}
      handleAddLFee={handleAddLFee}
      feeCodeValue={feeCodeValue}
      feeCalcTypes={feeCalcTypes}
      fixedMode={fixedMode}
      lTErrors={lTErrors}
      editForm={editForm}
      title={title}
      form={form}
      type={type}
    />
  );
};

export default LFeesSectionContainer;
