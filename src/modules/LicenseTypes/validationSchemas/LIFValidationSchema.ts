import * as yup from 'yup';

import { mandatoryField } from '../../../constatnts/errorMessages';
import { taxCodeErrorField } from '../constants/errorMessages';

import { quotaTypeEnum } from '../constants';

const LIFValidationSchema = yup
  .object({
    quotaType: yup.object().nullable().required(mandatoryField),
    quotaTaxCode: yup
      .string()
      .trim()
      .when('enabledQuotas', (enabledQuotas: Array<string>, schema: yup.StringSchema) =>
        enabledQuotas?.includes(quotaTypeEnum.TAX) ? schema.min(1, taxCodeErrorField).max(3, taxCodeErrorField) : schema
      )
      .nullable(),
  })
  .required();

export default LIFValidationSchema;
