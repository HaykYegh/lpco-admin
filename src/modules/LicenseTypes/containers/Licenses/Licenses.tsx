import { type FC, useCallback, useEffect, useState } from 'react';

import { type Dictionary, type EntityId } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';
import { useKeycloakContext } from '@wf/keycloak-axios-provider';

import { FilterItems, type IFilterItem } from '../../../../components/TableComponent/TableComponentTypes';
import { createOptionsArrayFromData } from '../../../../helpers/createOptionsArrayFromData';
import ConfiguredLicensesTBodyView from '../../components/ConfiguredLicensesTBodyView';
import { getFormatDateWithHours } from '../../../../helpers/getFormatDateWithHours';
import NotConfiguredLicensesView from '../../components/NotConfiguredLicensesView';
import SpecifiedDocumentsHOC from '../../../../hoc/SpecifiedDocumentsHOC';
import ContentContainer from '../../../../components/ContentContainer';
import HeaderComponent from '../../../../components/HeaderComponent';
import { isOnlyNumbers } from '../../../../helpers/isOnlyNumbers';

import { type LicenseType } from '../../store/types';

import type { LicenseTypesState, SearchLicenseTypeshStateType } from '../../store/types';
import { getLicenseTypeCodesApi, getLicenseTypesApi } from '../../store/actions';
import { getProductCodesApi } from '../../../../store/products/actions';
import { productsSelector } from '../../../../store/products/selectors';
import { PAGINATION_LIMIT, rolesEnums } from '../../../../constatnts';
import type { ProductsState } from '../../../../store/products/types';
import { licenseTypesSelector } from '../../store/selectors';
import * as slicesActions from '../../store/slices';

import styles from './Licenses.module.scss';

const Licenses: FC = () => {
  const user = useKeycloakContext()?.getUserData();
  const roles = user?.roles?.lpco2_admin;
  const hasAccess = roles.includes(rolesEnums.ADMINISTRATOR) || roles.includes(rolesEnums.MINISTRY_ADMINISTRATOR);
  const [searchOptions, setSearchOptions] = useState<SearchLicenseTypeshStateType>({
    licenseTypeCode: null,
    productListCode: null,
    date: null,
  });
  const [licenseTypeCodeValue, setLicenseTypeCode] = useState('');
  const [productCodeValue, setProductCode] = useState('');
  const dispatch = useDispatch();

  const licenseTypesState: LicenseTypesState = useSelector(licenseTypesSelector);
  const productsState: ProductsState = useSelector(productsSelector);

  useEffect(() => {
    dispatch(
      getLicenseTypesApi({
        limit: PAGINATION_LIMIT,
        offset: 0,
        licenseTypeCode: searchOptions.licenseTypeCode?.value ?? '',
        productListCode: searchOptions.productListCode?.value ?? '',
        date: getFormatDateWithHours(searchOptions.date),
      })
    );
  }, [dispatch, searchOptions]);

  useEffect(() => {
    dispatch(getLicenseTypeCodesApi({ licenseTypeCode: licenseTypeCodeValue }));
  }, [dispatch, licenseTypeCodeValue]);

  useEffect(() => {
    dispatch(getProductCodesApi({ code: productCodeValue }));
  }, [dispatch, productCodeValue]);

  const handleLicenseTypeCodeChange = useCallback(
    (value: string) => {
      if (isOnlyNumbers(value)) {
        setLicenseTypeCode(value);
      }
    },
    [setLicenseTypeCode]
  );

  const handleProductCodeChange = useCallback(
    (value: string) => {
      setProductCode(value ?? '');
    },
    [setProductCode]
  );

  const handleChange = useCallback(
    (option: SelectBaseOption, selected: Record<string, SelectBaseOption>) => {
      setSearchOptions({
        ...searchOptions,
        [selected.name as string]: option,
      });
    },
    [searchOptions]
  );

  const handleDatePickerChange = useCallback(
    (date: Date | null) => {
      setSearchOptions({
        ...searchOptions,
        date,
      });
    },
    [searchOptions]
  );

  const tableFilterItems: Array<IFilterItem<SelectBaseOption>> = [
    {
      field: FilterItems.select,
      placeholder: 'License Type Code',
      selectChange: handleChange,
      onInputChange: handleLicenseTypeCodeChange,
      options: createOptionsArrayFromData(licenseTypesState.licenseTypeCodes, 'licenseTypeCode', 'licenseTypeCode'),
      selectValue: searchOptions.licenseTypeCode,
      inputValue: licenseTypeCodeValue,
      name: 'licenseTypeCode',
    },
    {
      field: FilterItems.select,
      placeholder: 'Product List Code',
      selectChange: handleChange,
      onInputChange: handleProductCodeChange,
      options: createOptionsArrayFromData(productsState.productCodes, 'code', 'code'),
      selectValue: searchOptions.productListCode,
      inputValue: productCodeValue,
      name: 'productListCode',
    },
    {
      field: FilterItems.datepicker,
      placeholder: 'Date of Validity',
      datePickerChange: handleDatePickerChange,
      datePickerValue: searchOptions.date,
      name: 'date',
    },
  ];

  const handlePageChange = (page: number) => {
    dispatch(
      getLicenseTypesApi({
        limit: PAGINATION_LIMIT,
        offset: (page - 1) * PAGINATION_LIMIT,
        licenseTypeCode: searchOptions.licenseTypeCode?.value ?? '',
        productListCode: searchOptions.productListCode?.value ?? '',
        date: searchOptions.date?.toLocaleString(),
      })
    );
  };

  const handleOpen = (id: EntityId, dataEntities: Dictionary<LicenseType>) => {
    dispatch(
      slicesActions.updateLicenseType({
        id,
        changes: {
          loader: !dataEntities?.[id]?.loader,
        },
      })
    );
    dispatch(
      getLicenseTypesApi({
        id,
        limit: 1000,
        offset: 0,
        licenseTypeCode: dataEntities?.[id]?.licenseTypeCode ?? '',
        productListCode: searchOptions.productListCode?.value ?? '',
        date: searchOptions.date?.toLocaleString(),
        eovOperator: 'IS_NOT_NULL',
      })
    );
  };

  return (
    <div className={styles.container}>
      <HeaderComponent title="License Types" />
      <ContentContainer>
        {hasAccess &&
          SpecifiedDocumentsHOC(NotConfiguredLicensesView, {
            title: 'Not Configured License Types',
            emptyDataTitle: 'No license data yet',
            emptyDataText: 'This is place holder text. The basic dialog for tables',
            ignores: ['licenseType', 'ministryCode'],
          })}
        <div className={styles.table_container}>
          <h2>Configured Licenses</h2>
          <ConfiguredLicensesTBodyView
            emptyDataText="This is place holder text. The basic dialog for tables"
            dataCount={licenseTypesState.licenseTypesCount}
            emptyDataTitle="No license data yet"
            handlePageChange={handlePageChange}
            tableFilterItems={tableFilterItems}
            data={licenseTypesState.data}
            handleOpen={handleOpen}
          />
        </div>
      </ContentContainer>
    </div>
  );
};

export default Licenses;
