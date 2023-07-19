import axios, { type AxiosResponse } from 'axios';

import type { IMinistriesParams, IMinistryParams } from './ministriesParamsApiServiceTypes';

import { request } from '../../../../services/requestService';

import type { MinistryType } from '../../store/types';
import { RIMM_SERVER } from '../../../../config';

export const getMinistries = ({ offset, searchValue, limit }: IMinistriesParams): Promise<AxiosResponse> =>
  request({
    method: 'POST',
    baseURL: RIMM_SERVER,
    url: 'ministry/search',
    data: {
      offset,
      max: limit,
      selectFields: ['code', 'address1', 'description'],
      restrictBy: 'OR',
      restrictions: [
        {
          field: 'code',
          value: searchValue,
          operator: 'STARTS_WITH',
        },
        {
          field: 'description',
          value: searchValue,
          operator: 'STARTS_WITH',
        },
      ],
    },
  });

export const getMinistryByCode = ({ code }: IMinistryParams): Promise<AxiosResponse<MinistryType>> =>
  axios.get(`${RIMM_SERVER}/ministry/${code}`);
