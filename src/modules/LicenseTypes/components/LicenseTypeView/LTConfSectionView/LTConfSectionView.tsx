import { Controller, type UseFormReturn } from 'react-hook-form';
import type { FC } from 'react';

import { Select } from '@wf/components';

import { createOptionsArrayFromData } from '../../../../../helpers/createOptionsArrayFromData';
import RightItemWithOneField from '../../../../../components/RightItemWithOneField';
import TabContentSection from '../../../../../components/TabContentSection';
import SwitcherComponent from '../../../../../components/SwitcherComponent';
import RowWithOneField from '../../../../../components/RowWithOneField';
import type { ILTConfSectionViewProps } from './LTConfSectionViewType';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';
import SectionBody from '../../../../../components/SectionBody';
import LTConfSectionViewTexts from './LTConfSectionViewTexts';
import SectionRow from '../../../../../components/SectionRow';

import { LTypeModeItems } from '../../../store/types';

import { flowItems, typeOfUseItems } from '../../../options';
import { onOffItems } from '../../../../../constatnts';

const LTConfSectionView: FC<ILTConfSectionViewProps> = ({ form }) => {
  const { type } = useTypeInPath();
  const { control } = form as UseFormReturn;
  const viewMode = type === LTypeModeItems.view;

  return (
    <TabContentSection title={LTConfSectionViewTexts.TITLE_TEXT}>
      <SectionBody>
        <RowWithOneField>
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: LTConfSectionViewTexts.COUNTRY_OF_EXPORT_OR_ENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="countryOfExportOrImportEnabled"
            control={control}
          />
        </RowWithOneField>
        <SectionRow>
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: LTConfSectionViewTexts.FLOW_ENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="flowEnabled"
            control={control}
          />
          <RightItemWithOneField>
            <Controller
              render={({ field }) => (
                <Select
                  label={
                    <div>
                      {LTConfSectionViewTexts.FLOW_TEXT}
                      <span>*</span>
                    </div>
                  }
                  options={createOptionsArrayFromData(flowItems, 'label', 'value')}
                  disabled={viewMode}
                  placeholder="Flow"
                  {...field}
                />
              )}
              control={control}
              name="flow"
            />
          </RightItemWithOneField>
        </SectionRow>
        <SectionRow>
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: LTConfSectionViewTexts.TYPE_OF_USE_ENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="typeOfUseEnabled"
            control={control}
          />
          <RightItemWithOneField>
            <Controller
              render={({ field }) => (
                <Select
                  label={
                    <div>
                      {LTConfSectionViewTexts.TYPE_OF_USE_TEXT}
                      <span>*</span>
                    </div>
                  }
                  options={createOptionsArrayFromData(typeOfUseItems, 'label', 'value')}
                  placeholder="Default Type of Use"
                  disabled={viewMode}
                  {...field}
                />
              )}
              control={control}
              name="typeOfUse"
            />
          </RightItemWithOneField>
        </SectionRow>
      </SectionBody>
    </TabContentSection>
  );
};

export default LTConfSectionView;
