import { useCallback, useEffect, useState } from 'react';

import { type FieldValues, useForm, type UseFormSetValue } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import type { EntityId } from '@reduxjs/toolkit';
import type { FC } from 'react';

// eslint-disable-next-line max-len
import {
  getEditMinistryApi,
  getMinistriesApi,
  getMinistryApi,
} from '../../../../MinistiesAndDepartments/store/actions';
import {
  editMinistrySelector,
  ministriesSelector,
  ministrySelector,
} from '../../../../MinistiesAndDepartments/store/selectors';
import type {
  GetMinistryApiPayload,
  MinistriesState,
  MinistryType,
} from '../../../../MinistiesAndDepartments/store/types';
import type { OptionsItemType } from '../../../../../components/TableComponent/TableComponentTypes';
import LWApprovalSectionView from '../../../components/LicenseWorkflowView/LWApprovalSectionView';
import { createOptionsArrayFromData } from '../../../../../helpers/createOptionsArrayFromData';
import workflowValidationSchema from '../../../validationSchemas/workflowValidationSchema';
import type { IAddApprovalFormDefaultValuesType } from './LWApprovalSectionContainerType';
import { approvalsAdapter, lTypeErrorsAdapter } from '../../../store/entityAdapters';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';

import { addApprovalFormDefaultValues, addTransitionFormDefaultValues } from '../../../constants';
import { transitionItemChangeMethods } from '../../../store/types';

import {
  licenseErrorMessagesSelector,
  licenseTypeAprovalsByCodeSelector,
  licenseTypeApTransitionsByCodeSelector,
} from '../../../store/selectors';
import { PAGINATION_LIMIT } from '../../../../../constatnts';
import type { IApprovalProps } from '../../../store/types';
import * as slicesActions from '../../../store/slices';

const LWApprovalSectionContainer: FC = () => {
  const { type } = useTypeInPath();
  const form = useForm({
    resolver: yupResolver(workflowValidationSchema),
    defaultValues: addApprovalFormDefaultValues as FieldValues,
  });

  const editApprovalForm = useForm({
    resolver: yupResolver(workflowValidationSchema),
    defaultValues: { ...addApprovalFormDefaultValues, id: null },
  });

  const { setValue, reset } = form;
  const { setValue: editSetValue, reset: editReset } = editApprovalForm;
  const dispatch = useDispatch();
  const approvalsAdapterSelectors = approvalsAdapter.getSelectors();
  const approvalsData = useSelector(licenseTypeAprovalsByCodeSelector);
  const transitionsData = useSelector(licenseTypeApTransitionsByCodeSelector);
  const allApprovals = approvalsAdapterSelectors.selectAll(approvalsData);
  const [ministrySearchValue, setMinistrySearchValue] = useState('');
  const ministriesState: MinistriesState = useSelector(ministriesSelector);
  const ministryState: MinistryType | null = useSelector(ministrySelector);
  const editMinistryState: MinistryType | null = useSelector(editMinistrySelector);
  const licenseTypeErrors = useSelector(licenseErrorMessagesSelector);
  const licenseTypeErrorsSelectors = lTypeErrorsAdapter.getSelectors();
  const licenseTypeApprovalErrors = licenseTypeErrorsSelectors.selectById(licenseTypeErrors, 'approvals');
  const licenseTypeReRouteErrors = licenseTypeErrorsSelectors.selectById(licenseTypeErrors, 'reRoute');
  const licenseTypeApprovalErrorsParams = licenseTypeApprovalErrors?.params ?? [];
  const licenseTypeReReturnErrorsParams = licenseTypeReRouteErrors?.params ?? [];

  useEffect(() => {
    dispatch(getMinistriesApi({ limit: PAGINATION_LIMIT, offset: 0, searchValue: ministrySearchValue }));
  }, [dispatch, ministrySearchValue]);

  const setDepAndMinistryNames = (selected: OptionsItemType) => {
    const departmentItem = ministryState?.ministryDepartments?.filter((item) => item.code === selected?.value)[0];
    setValue('departmentName', departmentItem?.description as string);
    setValue('ministryName', (ministryState as MinistryType)?.description);
  };

  const editSetDepAndMinistryNames = (selected: OptionsItemType) => {
    const departmentItem = editMinistryState?.ministryDepartments?.filter((item) => item.code === selected?.value)[0];
    editSetValue('departmentName', departmentItem?.description as string);
    editSetValue('ministryName', (editMinistryState as MinistryType)?.description);
  };

  const getMinistry = (selected: OptionsItemType) => {
    dispatch(getMinistryApi({ code: selected?.label } as GetMinistryApiPayload));
  };

  const getEditMinistry = (selected: OptionsItemType) => {
    dispatch(getEditMinistryApi({ code: selected?.label } as GetMinistryApiPayload));
  };

  const handleInputChange = useCallback(
    (value: string) => {
      setMinistrySearchValue(value);
    },
    [setMinistrySearchValue]
  );

  const getApproval = (data: IAddApprovalFormDefaultValuesType) => ({
    ...data,
    ministryCode: data.ministryCode?.label as string,
    ministryName: data.ministryName,
    departmentCode: data.departmentCode?.label as string,
    departmentName: data.departmentName,
  });

  const addApproval = (data: IAddApprovalFormDefaultValuesType) => {
    const approval: IApprovalProps = { ...getApproval(data), id: Date.now() };
    dispatch(slicesActions.addApproval(approval));
    reset(addApprovalFormDefaultValues);
  };

  const handleEditApproval = (id: EntityId) => {
    const data = approvalsAdapterSelectors.selectById(approvalsData, id);
    getEditMinistry({
      label: data?.ministryCode as string,
      value: data?.ministryCode as string,
    });
    const approval = {
      id: data?.id,
      ministryCode: {
        label: data?.ministryCode,
        value: data?.ministryCode,
      },
      departmentCode: {
        label: data?.departmentCode,
        value: data?.departmentCode,
      },
      ministryName: data?.ministryName,
      departmentName: data?.departmentName,
      rank: data?.rank as number,
      transitionsArr: data?.transitionsArr,
    };
    editReset(approval as never);
  };

  const cancelEditApproval = () => {
    editReset({ ...addApprovalFormDefaultValues, id: null });
  };

  const handleDeleteApproval = (id: EntityId) => {
    dispatch(slicesActions.removeApproval(id));
  };

  const updateApproval = (data: IAddApprovalFormDefaultValuesType) => {
    const approval: IApprovalProps = getApproval(data);
    dispatch(slicesActions.updateApproval({ id: data.id as EntityId, changes: approval }));
    editReset({ ...addApprovalFormDefaultValues, id: null });
  };

  const editTransition = (id: EntityId) => {
    const data = transitionsData.entities[id] as never;
    dispatch(
      slicesActions.setTransitionItemParams({
        data,
        title: '',
        dataParentId: null,
        show: true,
        method: transitionItemChangeMethods.EDIT,
      })
    );
  };

  const addTransition = (parentId: EntityId) => {
    const data = { ...addTransitionFormDefaultValues, id: Date.now() };
    dispatch(
      slicesActions.setTransitionItemParams({
        data,
        title: '',
        dataParentId: parentId,
        show: true,
        method: transitionItemChangeMethods.ADD,
      })
    );
  };

  const removeTransition = (id: EntityId, parentId: EntityId) => {
    dispatch(slicesActions.removeTransition(id));
    dispatch(
      slicesActions.updateApproval({
        id: parentId,
        changes: {
          transitionsArr: (approvalsData.entities[parentId] as Record<string, any>).transitionsArr.filter(
            (item: EntityId) => item !== id
          ),
        },
      })
    );
  };

  const setMinistryCode =
    (setDepartmentCode: UseFormSetValue<any>, getApprovalMinistry: (selected: OptionsItemType) => void) =>
    (select: OptionsItemType, onChange: (select: OptionsItemType) => void) => {
      getApprovalMinistry(select);
      onChange(select);
      setDepartmentCode('departmentCode', null);
    };

  const editDepartmentCode =
    (setDepartmentAndMinistryName: (selected: OptionsItemType) => void) =>
    (select: OptionsItemType, onChange: (select: OptionsItemType) => void) => {
      onChange(select);
      setDepartmentAndMinistryName(select);
    };

  return (
    <LWApprovalSectionView
      editDepartmentsOptions={
        editMinistryState?.ministryDepartments
          ? createOptionsArrayFromData(editMinistryState.ministryDepartments, 'code', 'code')
          : []
      }
      departmentsOptions={
        ministryState?.ministryDepartments
          ? createOptionsArrayFromData(ministryState.ministryDepartments, 'code', 'code')
          : []
      }
      licenseTypeErrors={[...licenseTypeApprovalErrorsParams, ...licenseTypeReReturnErrorsParams]}
      handleEditSetDepartmentAndMinistryNames={editDepartmentCode(editSetDepAndMinistryNames)}
      ministriesOptions={createOptionsArrayFromData(ministriesState.data, 'code', 'code')}
      handleSetDepartmentAndMinistryNames={editDepartmentCode(setDepAndMinistryNames)}
      handleSetEditMinistryCode={setMinistryCode(editSetValue, getEditMinistry)}
      handleSetMinistryCode={setMinistryCode(setValue, getMinistry)}
      handleDeleteApproval={handleDeleteApproval}
      transitionsData={transitionsData.entities}
      handleEditApproval={handleEditApproval}
      cancelEditApproval={cancelEditApproval}
      handleInputChange={handleInputChange}
      editApprovalForm={editApprovalForm}
      removeTransition={removeTransition}
      getEditMinistry={getEditMinistry}
      updateApproval={updateApproval}
      editTransition={editTransition}
      addTransition={addTransition}
      allApprovals={allApprovals}
      getMinistry={getMinistry}
      addApproval={addApproval}
      form={form}
      type={type}
    />
  );
};

export default LWApprovalSectionContainer;
