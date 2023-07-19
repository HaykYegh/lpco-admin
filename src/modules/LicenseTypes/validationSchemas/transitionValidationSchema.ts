import * as yup from 'yup';

import { mandatoryField } from '../../../constatnts/errorMessages';

const transitionValidationSchema = yup
  .object({
    operationName: yup.string().required(mandatoryField),
    operationNameInNationalLang: yup.string().required(mandatoryField),
    operationStatus: yup.string().required(mandatoryField),
    operationStatusInNationalLang: yup.string().required(mandatoryField),
  })
  .required();

export default transitionValidationSchema;
