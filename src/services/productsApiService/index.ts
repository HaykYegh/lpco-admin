import type { AxiosResponse } from 'axios';

import type { IProductsParams } from './productsApiServiceParamsTypes';

import { request } from '../requestService';

import { RIMM_SERVER } from '../../config';

export const getProductCodes = ({ code }: IProductsParams): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    baseURL: RIMM_SERVER,
    url: 'standardTariffList/search',
    data: {
      selectFields: ['code'],
      restrictBy: 'AND',
      restrictions: [
        {
          field: 'code',
          value: code,
          operator: 'STARTS_WITH',
        },
      ],
    },
  });
