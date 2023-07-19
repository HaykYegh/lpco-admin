import * as yup from 'yup';

import { mandatoryField } from '../../../constatnts/errorMessages';

const workflowValidationSchema = yup
  .object({
    ministryCode: yup.object().nullable().required(mandatoryField),
    departmentCode: yup.object().nullable().required(mandatoryField),
  })
  .required();

export default workflowValidationSchema;
