import { Controller, type UseFormReturn } from 'react-hook-form';
import type { FC } from 'react';

import TabContentSection from '../../../../../components/TabContentSection';
import SwitcherComponent from '../../../../../components/SwitcherComponent';
import type { ILWConfSectionViewProps } from './LWConfSectionViewType';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';
import SectionBody from '../../../../../components/SectionBody';
import LWConfSectionViewTexts from './LWConfSectionViewTexts';
import SectionRow from '../../../../../components/SectionRow';

import { LTypeModeItems } from '../../../store/types';

import { onOffItems } from '../../../../../constatnts';

import styles from './LWConfSectionView.module.scss';

const LWConfSectionView: FC<ILWConfSectionViewProps> = ({ form }) => {
  const { type } = useTypeInPath();
  const { control } = form as UseFormReturn;
  const viewMode = type === LTypeModeItems.view;

  return (
    <TabContentSection title={LWConfSectionViewTexts.TITLE_TEXT}>
      <SectionBody>
        <SectionRow className={styles.lwconf_section_row_item}>
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: LWConfSectionViewTexts.UPDATE_APPROVE_OPENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="updateApproveOpEnabled"
            control={control}
          />
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: LWConfSectionViewTexts.SUSPEND_OPENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="suspendOpEnabled"
            control={control}
          />
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: LWConfSectionViewTexts.CANCEL_OPENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="cancelOpEnabled"
            control={control}
          />
        </SectionRow>
      </SectionBody>
    </TabContentSection>
  );
};

export default LWConfSectionView;
