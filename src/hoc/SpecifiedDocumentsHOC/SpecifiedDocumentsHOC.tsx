import { type FC, useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type { ISpecifiedDocumentsCompomnentProps, SpecifiedDocumentsParamsType } from './SpecifiedDocumentsTypes';
import { getDocumentCodesApi, getSpecifiedDocumentsApi } from '../../modules/Documents/store/actions';
import { ministriesSelector } from '../../modules/MinistiesAndDepartments/store/selectors';
import type { DocumentsState, searchStateType } from '../../modules/Documents/store/types';
import type { MinistriesState } from '../../modules/MinistiesAndDepartments/store/types';
import { getMinistriesApi } from '../../modules/MinistiesAndDepartments/store/actions';
import type { IFilterItem } from '../../components/TableComponent/TableComponentTypes';
import { createOptionsArrayFromData } from '../../helpers/createOptionsArrayFromData';
import { createOptionsArrayFromEnum } from '../../helpers/createOptionsArrayFromEnum';
import { FilterItems } from '../../components/TableComponent/TableComponentTypes';
import { documentsSelector } from '../../modules/Documents/store/selectors';
import { NatureOfLicenseItems } from '../../modules/Documents/store/types';
import { isOnlyNumbers } from '../../helpers/isOnlyNumbers';

import { PAGINATION_LIMIT } from '../../constatnts';

const SpecifiedDocumentsHOC = (
  Compomnent: FC<ISpecifiedDocumentsCompomnentProps>,
  { title, emptyDataTitle, emptyDataText, ignores }: SpecifiedDocumentsParamsType
) => {
  const [searchOptions, setSearchOptions] = useState<searchStateType>({
    documentCode: null,
    licenseType: null,
    ministryCode: null,
  });
  const [codeValue, setDocumentCode] = useState('');
  const [ministrySearchValue, setMinistrySearchValue] = useState('');
  const [licenseTypeValue, setLicenseTypeValue] = useState('');
  const documentsState: DocumentsState = useSelector(documentsSelector);
  const ministriesState: MinistriesState = useSelector(ministriesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getSpecifiedDocumentsApi({
        limit: PAGINATION_LIMIT,
        offset: 0,
        searchByDocumentCode: searchOptions.documentCode?.value ?? '',
        searchByMinistryCode: searchOptions.ministryCode?.value ?? '',
        searchByLicenseType: searchOptions.licenseType?.value ?? '',
      })
    );
  }, [dispatch, searchOptions]);

  useEffect(() => {
    dispatch(getMinistriesApi({ limit: PAGINATION_LIMIT, offset: 0, searchValue: ministrySearchValue }));
  }, [dispatch, ministrySearchValue]);

  useEffect(() => {
    dispatch(getDocumentCodesApi({ code: codeValue }));
  }, [dispatch, codeValue]);

  const handleChange = useCallback(
    (option: SelectBaseOption, selected: Record<string, any>) => {
      setSearchOptions({
        ...searchOptions,
        [selected.name]: option,
      });
    },
    [searchOptions]
  );

  const handleDocumentCodeChange = useCallback(
    (value: string) => {
      if (isOnlyNumbers(value)) {
        setDocumentCode(value);
      }
    },
    [setDocumentCode]
  );

  const handleMinistryChange = useCallback(
    (value: string) => {
      setMinistrySearchValue(value);
    },
    [setMinistrySearchValue]
  );

  const handleLicenseTypeChange = useCallback(
    (value: string) => {
      setLicenseTypeValue(value);
    },
    [setLicenseTypeValue]
  );

  const tableFilterItems: Array<IFilterItem<SelectBaseOption>> = [
    {
      field: FilterItems.select,
      placeholder: 'Att Document Code',
      selectChange: handleChange,
      onInputChange: handleDocumentCodeChange,
      options: createOptionsArrayFromData(documentsState.documentCodes, 'code', 'code'),
      selectValue: searchOptions.documentCode,
      inputValue: codeValue,
      name: 'documentCode',
    },
    {
      field: FilterItems.select,
      placeholder: 'Nature of license',
      selectChange: handleChange,
      onInputChange: handleLicenseTypeChange,
      options: createOptionsArrayFromEnum(NatureOfLicenseItems),
      selectValue: searchOptions.licenseType,
      inputValue: licenseTypeValue,
      name: 'licenseType',
    },
    {
      field: FilterItems.select,
      placeholder: 'Ministry Owner Code',
      selectChange: handleChange,
      onInputChange: handleMinistryChange,
      options: createOptionsArrayFromData(ministriesState.data, 'code', 'code'),
      selectValue: searchOptions.ministryCode,
      inputValue: ministrySearchValue,
      name: 'ministryCode',
    },
  ];

  const handlePageChange = (page: number) => {
    dispatch(
      getSpecifiedDocumentsApi({
        limit: PAGINATION_LIMIT,
        offset: (page - 1) * PAGINATION_LIMIT,
        searchByDocumentCode: searchOptions.documentCode?.value ?? '',
        searchByMinistryCode: searchOptions.ministryCode?.value ?? '',
        searchByLicenseType: searchOptions.licenseType?.value ?? '',
      })
    );
  };

  return (
    <Compomnent
      tableFilterItems={tableFilterItems.filter((item) => !(ignores ?? []).includes(item.name))}
      dataCount={documentsState.specifiedDocumentsCount}
      data={documentsState.specifiedDocuments}
      handlePageChange={handlePageChange}
      emptyDataTitle={emptyDataTitle}
      emptyDataText={emptyDataText}
      title={title}
    />
  );
};

export default SpecifiedDocumentsHOC;
