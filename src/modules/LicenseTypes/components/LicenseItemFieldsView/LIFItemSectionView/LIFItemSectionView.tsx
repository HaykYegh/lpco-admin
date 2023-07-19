import { Controller, type UseFormReturn } from 'react-hook-form';
import type { FC } from 'react';

import TabContentSection from '../../../../../components/TabContentSection';
import SwitcherComponent from '../../../../../components/SwitcherComponent';
import type { ILIFItemSectionViewProps } from './LIFItemSectionViewType';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';
import LIFItemSectionViewTexts from './LIFItemSectionViewTexts';
import SectionBody from '../../../../../components/SectionBody';
import SectionRow from '../../../../../components/SectionRow';

import { LTypeModeItems } from '../../../store/types';

import { onOffItems } from '../../../../../constatnts';

import styles from './LIFItemSectionView.module.scss';

const LIFItemSectionView: FC<ILIFItemSectionViewProps> = ({ form }) => {
  const { type } = useTypeInPath();
  const { control } = form as UseFormReturn;
  const viewMode = type === LTypeModeItems.view;

  return (
    <TabContentSection title={LIFItemSectionViewTexts.TITLE_TEXT}>
      <SectionBody>
        <SectionRow className={styles.lif_section_row_item}>
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: LIFItemSectionViewTexts.PACKAGE_MANAGEMENT_ENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="packageManagementEnabled"
            control={control}
          />
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: LIFItemSectionViewTexts.ITEM_WEIGHT_MANAGEMENT_ENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="itemWeightManagementEnabled"
            control={control}
          />
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: LIFItemSectionViewTexts.PACKAGE_MANAGEMENT_TABLE_ENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="packageManagementTableEnabled"
            control={control}
          />
        </SectionRow>
        <SectionRow>
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: LIFItemSectionViewTexts.TREATMENT_TABLE_ENABLETEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="treatmentTableEnabled"
            control={control}
          />
        </SectionRow>
      </SectionBody>
    </TabContentSection>
  );
};

export default LIFItemSectionView;
