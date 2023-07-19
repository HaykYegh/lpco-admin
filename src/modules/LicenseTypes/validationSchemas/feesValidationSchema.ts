import * as yup from 'yup';

import { mandatoryField, onlyPositive } from '../../../constatnts/errorMessages';
import { transformNaNValue } from '../../../helpers/transformNaNValue';

const feesValidationSchema = yup
  .object({
    feeCode: yup.object().nullable().required(mandatoryField),
    amount: yup
      .number()
      .transform(transformNaNValue)
      .typeError(onlyPositive)
      .integer()
      .min(1, onlyPositive)
      .required(mandatoryField),
  })
  .required();

export default feesValidationSchema;
