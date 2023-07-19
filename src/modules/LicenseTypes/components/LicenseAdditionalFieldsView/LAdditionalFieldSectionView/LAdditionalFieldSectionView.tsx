import { useMemo } from 'react';

import { useWatch } from 'react-hook-form';
import type { FC } from 'react';

import { Accordion } from '@wf/components';

import { type ILAddFieldSectionViewProps, type IRowContent } from './LAdditionalFieldSectionViewTypes';
import LAdditionalFieldSectionContentView from '../LAdditionalFieldSectionContentView';

import { getFieldsQuantity } from '../../../helpers';

import styles from './LAdditionalFieldSectionView.module.scss';

const LAdditionalFieldSectionView: FC<ILAddFieldSectionViewProps> = ({ title, tab }) => {
  const rows = useWatch({ name: `additionalFields.${tab}` });

  const fieldsQuantity = useMemo(() => getFieldsQuantity(rows as IRowContent[]), [rows]);

  return (
    <Accordion
      title={
        <div className={styles.section_header_content}>
          <span className={styles.primary_text}>{title}</span>
          <span className={styles.secondary_text}>{`${fieldsQuantity} field`}</span>
        </div>
      }
      defaultIsOpen={false}
    >
      <Accordion.Content>
        <LAdditionalFieldSectionContentView tab={tab} />
      </Accordion.Content>
    </Accordion>
  );
};

export default LAdditionalFieldSectionView;
