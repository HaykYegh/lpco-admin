import { useCallback, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { FC } from 'react';

import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type {
  GetMinistryApiPayload,
  MinistriesState,
  MinistryType,
} from '../../../MinistiesAndDepartments/store/types';
import { ministriesSelector, ministrySelector } from '../../../MinistiesAndDepartments/store/selectors';
import { getMinistriesApi, getMinistryApi } from '../../../MinistiesAndDepartments/store/actions';
import { createOptionsArrayFromEnum } from '../../../../helpers/createOptionsArrayFromEnum';
import { createOptionsArrayFromData } from '../../../../helpers/createOptionsArrayFromData';
import SpecifyDocumentView from '../../components/SpecifyDocumentView';
import ContentContainer from '../../../../components/ContentContainer';
import HeaderComponent from '../../../../components/HeaderComponent';
import { appPaths } from '../../../../constatnts/appPaths';
import SpecifyDocumentTexts from './SpecifyDocumentTexts';

import { NatureOfLicenseItems } from '../../store/types';

import type { AttachedDocumentType, GetDocumentApiPayload, selectStateType } from '../../store/types';
import { notSpecifiedDocumentSelector, specifyDocumentLoadingSelector } from '../../store/selectors';
import { createLicenseTypeApi, getNotSpecifiedDocumentApi } from '../../store/actions';
import { PAGINATION_LIMIT } from '../../../../constatnts';

import styles from './SpecifyDocument.module.scss';

const SpecifyDocument: FC = () => {
  const [selectOptions, setSelectOptions] = useState<selectStateType>({
    departmentCode: null,
    licenseType: null,
    ministryCode: null,
  });
  const [ministrySearchValue, setMinistrySearchValue] = useState('');

  const { code } = useParams();
  const navigate = useNavigate();

  const documentInfoState: AttachedDocumentType | null = useSelector(notSpecifiedDocumentSelector);
  const ministriesState: MinistriesState = useSelector(ministriesSelector);
  const ministryState: MinistryType | null = useSelector(ministrySelector);
  const specifyDocumentLoadingState: boolean = useSelector(specifyDocumentLoadingSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotSpecifiedDocumentApi({ code } as GetDocumentApiPayload));
  }, [dispatch, code]);

  useEffect(() => {
    dispatch(getMinistriesApi({ limit: PAGINATION_LIMIT, offset: 0, searchValue: ministrySearchValue }));
  }, [dispatch, ministrySearchValue]);

  useEffect(() => {
    dispatch(getMinistryApi({ code: selectOptions.ministryCode?.value ?? '' } as GetMinistryApiPayload));
    setSelectOptions((state) => ({
      ...state,
      departmentCode: null,
    }));
  }, [selectOptions.ministryCode, dispatch]);

  const handleChange = useCallback(
    (option: SelectBaseOption, selected: Record<string, SelectBaseOption>) => {
      setSelectOptions({
        ...selectOptions,
        [selected.name as string]: option,
      });
    },
    [selectOptions]
  );

  const handleMinistryChange = useCallback(
    (value: string) => {
      setMinistrySearchValue(value);
    },
    [setMinistrySearchValue]
  );

  const handleCreateLicenseType = () => {
    if (!code || !selectOptions.ministryCode || !selectOptions.licenseType) {
      return;
    }

    dispatch(
      createLicenseTypeApi({
        code,
        ministryCode: selectOptions.ministryCode.value ?? '',
        departmentCode: selectOptions.departmentCode?.value,
        licenseTypeNature: selectOptions.licenseType.value ?? '',
        navigate,
      })
    );
  };

  const disabled = !(selectOptions.licenseType && selectOptions.ministryCode) || specifyDocumentLoadingState;

  return (
    <div className={styles.container}>
      <HeaderComponent link={appPaths.attachedDocuments} title={SpecifyDocumentTexts.SPECIFY_DOCUMENT_TITLE} />
      <ContentContainer>
        <SpecifyDocumentView
          departmentsOptions={
            ministryState?.ministryDepartments
              ? createOptionsArrayFromData(ministryState.ministryDepartments, 'code', 'code')
              : []
          }
          ministriesOptions={createOptionsArrayFromData(ministriesState.data, 'code', 'code')}
          licenseTypeOptions={createOptionsArrayFromEnum(NatureOfLicenseItems)}
          specifyDocumentLoadingState={specifyDocumentLoadingState}
          departmentCodeValue={selectOptions.departmentCode}
          handleCreateLicenseType={handleCreateLicenseType}
          ministryCodeValue={selectOptions.ministryCode}
          licenseTypeValue={selectOptions.licenseType}
          handleMinistryChange={handleMinistryChange}
          documentInfo={documentInfoState}
          handleChange={handleChange}
          disabled={disabled}
        />
      </ContentContainer>
    </div>
  );
};

export default SpecifyDocument;
