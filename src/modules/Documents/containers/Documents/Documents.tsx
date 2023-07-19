import { type FC, useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import { FilterItems, type IFilterItem } from '../../../../components/TableComponent/TableComponentTypes';
import { createOptionsArrayFromData } from '../../../../helpers/createOptionsArrayFromData';
import NotSpecifiedDocumentsView from '../../components/NotSpecifiedDocumentsView';
import SpecifiedDocumentsView from '../../components/SpecifiedDocumentsView';
import SpecifiedDocumentsHOC from '../../../../hoc/SpecifiedDocumentsHOC';
import ContentContainer from '../../../../components/ContentContainer';
import HeaderComponent from '../../../../components/HeaderComponent';
import { isOnlyNumbers } from '../../../../helpers/isOnlyNumbers';
import DocumentsTexts from './DocumentsTexts';

import {
  notSpecifiedDocumentsCodesSelector,
  notSpecifiedDocumentsCountSelector,
  notSpecifiedDocumentsSelector,
} from '../../store/selectors';
import { getNotSpecifiedDocumentsApi, getNotSpecifiedDocumentsCodesApi } from '../../store/actions';
import { PAGINATION_LIMIT } from '../../../../constatnts';

import styles from './Documents.module.scss';

const Documents: FC = () => {
  const dispatch = useDispatch();
  const [nSpecifiedDocSearch, setNSpecifiedDocSearch] = useState<SelectBaseOption>(null);
  const [codeSearchValue, setCodeSearchValue] = useState('');

  const notSpecifiedDocumentsState = useSelector(notSpecifiedDocumentsSelector);
  const notSpecifiedDocumentsCountState = useSelector(notSpecifiedDocumentsCountSelector);
  const notSpecifiedDocumentsCodesState = useSelector(notSpecifiedDocumentsCodesSelector);

  useEffect(() => {
    dispatch(
      getNotSpecifiedDocumentsApi({
        limit: PAGINATION_LIMIT,
        offset: 0,
        searchByDocumentCode: nSpecifiedDocSearch?.value ?? '',
      })
    );
  }, [dispatch, nSpecifiedDocSearch]);

  useEffect(() => {
    dispatch(
      getNotSpecifiedDocumentsCodesApi({
        code: codeSearchValue,
      })
    );
  }, [dispatch, codeSearchValue]);

  useEffect(
    () => () => {
      dispatch(
        getNotSpecifiedDocumentsApi({
          limit: PAGINATION_LIMIT,
          offset: 0,
          searchByDocumentCode: '',
        })
      );
    },
    [dispatch]
  );

  const handleChangeCode = useCallback(
    (value: string) => {
      if (isOnlyNumbers(value)) {
        setCodeSearchValue(value);
      }
    },
    [setCodeSearchValue]
  );

  const handleChange = useCallback(
    (option: SelectBaseOption) => {
      setNSpecifiedDocSearch(option);
    },
    [setNSpecifiedDocSearch]
  );

  const tableFilterItems: Array<IFilterItem<SelectBaseOption>> = [
    {
      field: FilterItems.select,
      placeholder: DocumentsTexts.NSPEC_DOC_SEARCH_FIELD_PLACEHOLDER,
      selectChange: handleChange,
      onInputChange: handleChangeCode,
      options: createOptionsArrayFromData(notSpecifiedDocumentsCodesState, 'code', 'code'),
      selectValue: nSpecifiedDocSearch,
      inputValue: codeSearchValue,
      name: 'documentCode',
    },
  ];

  const handlePageChange = (page: number) => {
    dispatch(
      getNotSpecifiedDocumentsApi({
        limit: PAGINATION_LIMIT,
        offset: (page - 1) * PAGINATION_LIMIT,
        searchByDocumentCode: nSpecifiedDocSearch?.value ?? '',
      })
    );
  };

  return (
    <div className={styles.container}>
      <HeaderComponent title={DocumentsTexts.HEADER_TITLE} />
      <ContentContainer>
        <NotSpecifiedDocumentsView
          emptyDataText={DocumentsTexts.NSPEC_DOC_EMPTY_DATA_DESCRIPTION}
          emptyDataTitle={DocumentsTexts.NSPEC_DOC_EMPTY_DATA_TITLE}
          dataCount={notSpecifiedDocumentsCountState}
          title={DocumentsTexts.NSPEC_DOC_TITLE}
          tableFilterItems={tableFilterItems}
          handlePageChange={handlePageChange}
          data={notSpecifiedDocumentsState}
        />
        {SpecifiedDocumentsHOC(SpecifiedDocumentsView, {
          title: DocumentsTexts.SPEC_DOC_TITLE,
          emptyDataTitle: DocumentsTexts.SPEC_DOC_EMPTY_DATA_TITLE,
          emptyDataText: DocumentsTexts.SPEC_DOC_EMPTY_DATA_DESCRIPTION,
        })}
      </ContentContainer>
    </div>
  );
};

export default Documents;
