import type { FC } from 'react';

import { DatePicker, Input, Select } from '@wf/components';

import LabelComponent from '../../../../../../components/LabelComponent';
import { type IFieldConfigsFormProps } from './FieldConfigsFormTypes';
import SectionBody from '../../../../../../components/SectionBody';
import SectionRow from '../../../../../../components/SectionRow';

import { AdditionalFieldsDataTypes } from '../../../../constants';

import styles from './FieldConfigsForm.module.scss';

const FieldConfigsForm: FC<IFieldConfigsFormProps> = ({ dataType }) => (
  <SectionBody className={styles.body_content}>
    <hr />
    <SectionRow className={styles.section_row_item}>
      <Select
        label={<LabelComponent>Field Length</LabelComponent>}
        placeholder="Choose field length"
        name="fieldLegth"
        errorMessage=""
        options={[]}
        isClearable
      />
      <Input label={<LabelComponent>Characters</LabelComponent>} placeholder="Write characters length" />
    </SectionRow>
    {dataType === AdditionalFieldsDataTypes.DATE && (
      <SectionRow className={styles.section_row_item}>
        <DatePicker
          label={<LabelComponent icon="il_info">Minimum Date</LabelComponent>}
          placeholderText="Choose minimum date"
          format="dd - mm - yyyy"
          onChange={() => {}}
          isClearable
        />
        <DatePicker
          label={<LabelComponent icon="il_info">Maximum Date</LabelComponent>}
          placeholderText="Choose maximum date"
          format="dd - mm - yyyy"
          onChange={() => {}}
          isClearable
        />
      </SectionRow>
    )}
    {dataType === AdditionalFieldsDataTypes.TEXTAREA && (
      <SectionRow className={styles.section_row_item}>
        <Input label={<LabelComponent>Max Length</LabelComponent>} placeholder="Write maximum length" />
        <Input label={<LabelComponent>Default Value</LabelComponent>} placeholder="Write default value" />
      </SectionRow>
    )}
    {dataType === AdditionalFieldsDataTypes.LIST && (
      <>
        <hr />
        <SectionRow>
          <Select
            label={<LabelComponent>List of Options</LabelComponent>}
            placeholder="Add options"
            name="listOptions"
            errorMessage=""
            options={[]}
            isClearable
          />
        </SectionRow>
      </>
    )}
  </SectionBody>
);

export default FieldConfigsForm;
