import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { ProductsState, ProductType } from './types';

const initialState = {
  data: [],
  productCodes: [],
  productsLoading: false,
  productsCount: 0,
} as ProductsState;

export const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsData: (state: ProductsState, { payload }: PayloadAction<Array<ProductType>>) => {
      state.data = payload;
    },
    setProductCodes: (state: ProductsState, { payload }: PayloadAction<Array<ProductType>>) => {
      state.productCodes = payload;
    },
    setProductsLoading: (state: ProductsState, { payload }: PayloadAction<boolean>) => {
      state.productsLoading = payload;
    },
    setProductsCount: (state: ProductsState, { payload }: PayloadAction<number>) => {
      state.productsCount = payload;
    },
  },
});

export const { setProductsData, setProductCodes, setProductsLoading, setProductsCount } = products.actions;
