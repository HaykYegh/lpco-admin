import * as yup from 'yup';

import { mandatoryField } from '../../../constatnts/errorMessages';

const attachmentValidationSchema = yup
  .object({
    code: yup.object().nullable().required(mandatoryField),
    tariffListCode: yup.object().nullable().required(mandatoryField),
  })
  .required();

export default attachmentValidationSchema;
