import { type FC, useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import type { UseFormReturn } from 'react-hook-form';

import { createOptionsArrayFromData } from '../../../../../helpers/createOptionsArrayFromData';
import LTProductSectionView from '../../../components/LicenseTypeView/LTProductSectionView';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';

import { getProductCodesApi } from '../../../../../store/products/actions';
import { productsSelector } from '../../../../../store/products/selectors';
import type { ProductsState } from '../../../../../store/products/types';

const LTProductSectionContainer: FC<{ form?: UseFormReturn }> = ({ form }) => {
  const { type } = useTypeInPath();
  const [productCodeValue, setProductCodeValue] = useState('');

  const productsState: ProductsState = useSelector(productsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductCodesApi({ code: productCodeValue }));
  }, [dispatch, productCodeValue]);

  const handleProductCodeChange = useCallback(
    (value: string) => {
      setProductCodeValue(value);
    },
    [setProductCodeValue]
  );

  return (
    <LTProductSectionView
      licenseTypeOptions={createOptionsArrayFromData(productsState.productCodes, 'code', 'code')}
      onInputChange={handleProductCodeChange}
      productCodeValue={productCodeValue}
      form={form}
      type={type}
    />
  );
};

export default LTProductSectionContainer;
