import { type FC, useCallback, useEffect, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';

import { toasterEmitter } from '@wf/components';

import LIFValidationSchema from '../../validationSchemas/LIFValidationSchema';
import LTValidationSchema from '../../validationSchemas/LTValidationSchema';
import ContentContainer from '../../../../components/ContentContainer';
import HeaderComponent from '../../../../components/HeaderComponent';
import LicenseTypeTabView from '../../components/LicenseTypeTabView';
import { getSelectValue } from '../../../../helpers/getSelectValue';
import { additionalFieldsState } from '../../store/initialState';
import { useTypeInPath } from '../../../../hooks/useTypeInPath';
import { appPaths } from '../../../../constatnts/appPaths';
import LicenseTypeTexts from './LicenseTypeTexts';

import { flowEnum, paymentFlowEnum, quotaTypeLabelsEnum, typeOfUseEnum } from '../../constants';
import { LTypeModeItems } from '../../store/types';

import {
  licenseTypeAdditionalFieldsByCodeSelector,
  licenseTypeFeatureFlagsSelector,
  licenseTypeSelector,
} from '../../store/selectors';
import { addLicenseTypeApi, getLicenseTypeByCodeApi, updateLicenseTypeApi } from '../../store/actions';
import * as uploadsSlicesActions from '../../../../store/uploads/slices';
import type { GetLicenseTypeApiPayload } from '../../store/types';
import { getLicenseTypeHeaderActions } from '../../helpers';
import * as licenseActions from '../../store/slices';

import styles from './LicenseType.module.scss';

const LicenseType: FC = () => {
  const [validationOptions, setValidation] = useState({
    ltValidation: true,
    ifValidation: true,
  });
  const { type } = useTypeInPath();
  const { code } = useParams();
  const dispatch = useDispatch();
  const createMode = type === LTypeModeItems.create;
  const viewMode = type === LTypeModeItems.view;

  const licenseTypeState = useSelector(licenseTypeSelector);
  const licenseTypeFeatureFlagsState = useSelector(licenseTypeFeatureFlagsSelector);
  const licenseTypeAdditionalFieldsState = useSelector(licenseTypeAdditionalFieldsByCodeSelector);

  const form = useForm({
    resolver: yupResolver(LTValidationSchema.concat(LIFValidationSchema)),
  });

  const {
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = form;

  const formErrorsArrLength = Object.keys(errors).length;

  const getDefaultValues = useCallback(
    () => ({
      ...licenseTypeState,
      ...licenseTypeFeatureFlagsState,
      tariffListCode: getSelectValue(licenseTypeState.tariffListCode, licenseTypeState.tariffListCode),
      flow: getSelectValue(licenseTypeState.flow, (flowEnum as never)[licenseTypeState.flow]),
      typeOfUse: getSelectValue(licenseTypeState.typeOfUse, (typeOfUseEnum as never)[licenseTypeState.typeOfUse]),
      quotaType: getSelectValue(licenseTypeState.quotaType, (quotaTypeLabelsEnum as never)[licenseTypeState.quotaType]),
      paymentFlow: getSelectValue(
        licenseTypeState.paymentFlow,
        (paymentFlowEnum as never)[licenseTypeState.paymentFlow]
      ),
      additionalFields: additionalFieldsState,
    }),
    [licenseTypeState, licenseTypeFeatureFlagsState]
  );

  useEffect(() => {
    setValue('additionalFields', licenseTypeAdditionalFieldsState);
  }, [licenseTypeAdditionalFieldsState]);

  useEffect(() => {
    const getValidityForSchemas = async () => {
      const [ltValidation, ifValidation] = await Promise.all([
        LTValidationSchema.isValid(getValues()),
        LIFValidationSchema.isValid(getValues()),
      ]);

      setValidation((state) => ({ ...state, ltValidation, ifValidation }));
    };

    getValidityForSchemas().catch(console.error);
  }, [formErrorsArrLength, getValues]);

  useEffect(() => {
    if (!createMode) {
      dispatch(
        getLicenseTypeByCodeApi({
          licenseTypeCode: code,
          url: viewMode ? 'lpco-admin' : 'licenseType',
        } as GetLicenseTypeApiPayload)
      );
    }
  }, [dispatch, code, createMode]);

  useEffect(() => {
    reset(getDefaultValues());
  }, [reset, getDefaultValues]);

  useEffect(
    () => () => {
      dispatch(uploadsSlicesActions.setAllUploads([]));
      dispatch(licenseActions.setlicenseTypeErrors([]));
      dispatch(licenseActions.initializeDefaultData());
    },
    [dispatch]
  );

  const handleUpdate = (dataForm: Record<string, any>) => {
    dispatch(updateLicenseTypeApi({ id: licenseTypeState.id, dataForm }));
  };

  const handleCreate = (dataForm: Record<string, any>) => {
    dispatch(addLicenseTypeApi({ dataForm: { ...dataForm, licenseTypeCode: code } }));
  };

  const handleCancel = () => {
    reset(getDefaultValues());
    toasterEmitter({
      title: LicenseTypeTexts.LT_CANCEL_TITLE,
      type: 'dark',
      status: 'success',
      description: LicenseTypeTexts.LT_CANCEL_DESCRIPTION,
    });
  };

  const handleErrors = () => {
    toasterEmitter({
      title: LicenseTypeTexts.LT_VALIDATION_ERRORS_TITLE,
      status: 'error',
      description: LicenseTypeTexts.LT_VALIDATION_ERRORS_DESCRIPTION,
    });
  };

  return (
    <div className={styles.container}>
      <HeaderComponent
        actions={getLicenseTypeHeaderActions({
          type,
          code: licenseTypeState.licenseTypeCode,
          eov: licenseTypeState.eov,
          handleSubmit: handleSubmit(type === LTypeModeItems.create ? handleCreate : handleUpdate, handleErrors),
          handleCancel,
        })}
        title={LicenseTypeTexts.LT_TITLE_TEXT}
        link={appPaths.licenses}
      />
      <ContentContainer>
        <FormProvider {...form}>
          <LicenseTypeTabView
            {...licenseTypeState}
            ltValidation={validationOptions.ltValidation}
            ifValidation={validationOptions.ifValidation}
            formErrorsArrLength={formErrorsArrLength}
            form={form}
          />
        </FormProvider>
      </ContentContainer>
    </div>
  );
};

export default LicenseType;
