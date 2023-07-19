import { Controller, type UseFormReturn } from 'react-hook-form';
import type { FC } from 'react';

import RightItemWithOneField from '../../../../../components/RightItemWithOneField';
import TabContentSection from '../../../../../components/TabContentSection';
import SwitcherComponent from '../../../../../components/SwitcherComponent';
import type { ILFHeaderSectionViewProps } from './LFHeaderSectionViewType';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';
import lFHeaderSectionViewTexts from './lFHeaderSectionViewTexts';
import SectionBody from '../../../../../components/SectionBody';
import SectionRow from '../../../../../components/SectionRow';

import { LTypeModeItems } from '../../../store/types';

import { onOffItems } from '../../../../../constatnts';

import styles from './LFHeaderSectionView.module.scss';

const LFHeaderSectionView: FC<ILFHeaderSectionViewProps> = ({ form }) => {
  const { type } = useTypeInPath();
  const { control } = form as UseFormReturn;
  const viewMode = type === LTypeModeItems.view;

  return (
    <TabContentSection title={lFHeaderSectionViewTexts.TITLE_TEXT}>
      <SectionBody>
        <SectionRow className={styles.lf_section_row_item}>
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: lFHeaderSectionViewTexts.ENTRY_EXIT_CODE_ENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="entryExitPointEnabled"
            control={control}
          />
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: lFHeaderSectionViewTexts.DEPARTMENT_OFFICE_ENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="departmentOfficeEnabled"
            control={control}
          />
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: lFHeaderSectionViewTexts.PLACE_OF_LOADING_ENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="placeOfLoadingEnabled"
            control={control}
          />
        </SectionRow>
        <SectionRow className={styles.lf_section_row_item}>
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: lFHeaderSectionViewTexts.PLACE_OF_UNLOADING_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="placeOfUnloadingEnabled"
            control={control}
          />
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: lFHeaderSectionViewTexts.TERM_OF_DELEVARY_ENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="termOfDeliveryEnabled"
            control={control}
          />
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: lFHeaderSectionViewTexts.INVOICE_VALUE_MANAGEMENT_ENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="invoiceValueManagementEnabled"
            control={control}
          />
        </SectionRow>
        <SectionRow className={styles.lf_section_row_item_last}>
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: lFHeaderSectionViewTexts.LIST_OF_BENEFICIARIES_ENABLED,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="listOfBeneficiariesEnabled"
            control={control}
          />
          <RightItemWithOneField>
            <Controller
              render={({ field: { value, onChange } }) => (
                <SwitcherComponent
                  label={{
                    text: lFHeaderSectionViewTexts.HS_CODE_ENABLED,
                    icon: 'il_info',
                  }}
                  handleChange={onChange}
                  disabled={viewMode}
                  items={onOffItems}
                  color="success"
                  value={+value}
                />
              )}
              name="hsCodeEnabled"
              control={control}
            />
          </RightItemWithOneField>
        </SectionRow>
      </SectionBody>
    </TabContentSection>
  );
};

export default LFHeaderSectionView;
