import { type AdditionalFieldsDataTypes } from '../../../../constants';

export interface IFieldConfigsFormProps {
  dataType: keyof typeof AdditionalFieldsDataTypes;
}
