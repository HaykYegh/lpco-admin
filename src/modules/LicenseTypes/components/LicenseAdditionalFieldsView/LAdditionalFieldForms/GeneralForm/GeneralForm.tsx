import type { FC } from 'react';

import { Input, Select } from '@wf/components';

import LabelComponent from '../../../../../../components/LabelComponent';
import SectionBody from '../../../../../../components/SectionBody';
import SectionRow from '../../../../../../components/SectionRow';

import styles from './GeneralForm.module.scss';

const GeneralForm: FC = () => (
  <SectionBody>
    <SectionRow className={styles.section_row_item}>
      <Input label={<LabelComponent>Label</LabelComponent>} placeholder="Write label text" />
      <Input label={<LabelComponent>Label N.L.</LabelComponent>} placeholder="Write label n.l. text" />
    </SectionRow>
    <div className={styles.configuration_content}>
      <h2>Field Configuration</h2>
      <SectionRow>
        <Select
          label={<LabelComponent icon="il_info">Trader/Declarant Submission</LabelComponent>}
          placeholder="Choose option"
          errorMessage=""
          isClearable
        />
      </SectionRow>
      <SectionRow className={styles.section_row_item}>
        <Input label={<LabelComponent icon="il_info">OGA Process*</LabelComponent>} placeholder="Write label text" />
        <Input
          label={<LabelComponent icon="il_info">OGA Final Process*</LabelComponent>}
          placeholder="Write label n.l. text"
        />
      </SectionRow>
    </div>
  </SectionBody>
);

export default GeneralForm;
