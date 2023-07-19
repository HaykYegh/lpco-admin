export type ProductsState = {
  data: Array<ProductType>;
  productCodes: Array<ProductType>;
  productsLoading: boolean;
  productsCount: number;
};

export type GetProductApiPayload = {
  code: string;
};

export type ProductType = {
  code: string;
  description: string;
  descriptionTranslated: string;
  tariffIntervalSelection: string;
  selectivityForVehicleList: boolean;
  listType: string;
};

export type ProductsType = {
  resultList: Array<ProductType>;
  totalCount: number;
};
