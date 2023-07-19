import * as yup from 'yup';

import {
  countLessCharacter,
  countMoreCharacter,
  mandatoryField,
  zeroOrPositive,
} from '../../../constatnts/errorMessages';
import { transformNaNValue } from '../../../helpers/transformNaNValue';

const LTValidationSchema = yup
  .object({
    tariffListCode: yup.object().nullable().required(mandatoryField),
    relatedProducts: yup.string().trim().min(1, countMoreCharacter(1)).max(255, countLessCharacter(255)),
    noOfDaysBeforeValidTo: yup.number().transform(transformNaNValue).integer().min(0, zeroOrPositive),
    noOfAllowableExtension: yup
      .number()
      .transform(transformNaNValue)
      .typeError(zeroOrPositive)
      .integer()
      .min(0, zeroOrPositive),
    maxNumOfDaysForExtension: yup
      .number()
      .transform(transformNaNValue)
      .typeError(zeroOrPositive)
      .integer()
      .min(0, zeroOrPositive),
    noOfDaysBeforeValidFrom: yup
      .number()
      .transform(transformNaNValue)
      .typeError(zeroOrPositive)
      .integer()
      .min(0, zeroOrPositive),
    validityPeriod: yup
      .number()
      .transform(transformNaNValue)
      .integer()
      .typeError(zeroOrPositive)
      .min(0, zeroOrPositive),
  })
  .required();

export default LTValidationSchema;
