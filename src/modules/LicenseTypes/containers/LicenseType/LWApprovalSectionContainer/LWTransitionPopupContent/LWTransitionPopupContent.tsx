import { useEffect } from 'react';

import type { Dictionary, EntityId } from '@reduxjs/toolkit';
import { type FieldValues, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import type { FC } from 'react';

// eslint-disable-next-line max-len
import LWTransitionPopupContentView from '../../../../components/LicenseWorkflowView/LWApprovalSectionView/LWTransitionPopupContentView';
import transitionValidationSchema from '../../../../validationSchemas/transitionValidationSchema';
import { transitionItemParams } from '../../../../store/initialState';
import { useTypeInPath } from '../../../../../../hooks/useTypeInPath';

import { addTransitionFormDefaultValues } from '../../../../constants';

import {
  licenseTypeAprovalsByCodeSelector,
  transitionItemParamsDataPIdSelector,
  transitionItemParamsDataSelector,
  transitionItemParamsMethodSelector,
  transitionItemParamsShowSelector,
} from '../../../../store/selectors';
import type { IApprovalAdItem, ITransitionItem } from '../../../../store/types';
import * as slicesActions from '../../../../store/slices';

const LWTransitionPopupContent: FC = () => {
  const { type } = useTypeInPath();
  const dispatch = useDispatch();
  const transitionItemParamsData = useSelector(transitionItemParamsDataSelector);
  const showPopup = useSelector(transitionItemParamsShowSelector);
  const transitionItemParamsDataPId = useSelector(transitionItemParamsDataPIdSelector);
  const transitionItemChangeMethod = useSelector(transitionItemParamsMethodSelector);
  const approvalsData: Dictionary<IApprovalAdItem> = useSelector(licenseTypeAprovalsByCodeSelector).entities;

  const form = useForm({
    resolver: yupResolver(transitionValidationSchema),
    defaultValues: addTransitionFormDefaultValues as FieldValues,
  });

  const { reset } = form;

  const closeTransitionItemParams = () => {
    reset(addTransitionFormDefaultValues);
    dispatch(
      slicesActions.setTransitionItemParams({
        data: addTransitionFormDefaultValues,
        dataParentId: null,
        title: '',
        show: false,
        method: '',
      })
    );
  };

  const handleCreateTransition = (data: Record<string, keyof ITransitionItem>) => {
    dispatch(slicesActions.addTransition({ ...data, reRoute: !data.reRoute ? null : data.reRoute } as never));

    if (transitionItemParamsDataPId) {
      dispatch(
        slicesActions.updateApproval({
          id: transitionItemParamsDataPId,
          changes: {
            transitionsArr: [
              ...(approvalsData[transitionItemParamsDataPId] as Record<string, any>).transitionsArr,
              data.id as never,
            ],
          },
        })
      );
    }

    closeTransitionItemParams();
  };

  const handleUpdateTransition = (data: Record<string, keyof ITransitionItem>) => {
    const changeData = { ...data, reRoute: !data.reRoute ? null : data.reRoute } as Record<
      string,
      keyof ITransitionItem
    >;
    dispatch(slicesActions.updateTransition({ id: data.id as EntityId, changes: changeData }));
    closeTransitionItemParams();
  };

  const handleClosePopup = () => {
    dispatch(slicesActions.setTransitionItemParams(transitionItemParams));
  };

  useEffect(() => {
    reset(transitionItemParamsData as never);
  }, [reset, transitionItemParamsData]);

  return (
    <LWTransitionPopupContentView
      transitionItemChangeMethod={transitionItemChangeMethod}
      handleCreateTransition={handleCreateTransition}
      handleUpdateTransition={handleUpdateTransition}
      handleClosePopup={handleClosePopup}
      showPopup={showPopup}
      type={type}
      form={form}
    />
  );
};

export default LWTransitionPopupContent;
