import { Controller, type UseFormReturn } from 'react-hook-form';
import type { FC } from 'react';

import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';
import { type IdType } from '@wf/components/dist/components/FormElements/Switcher/Switcher';
import { Input, Select } from '@wf/components';

import { createOptionsArrayFromData } from '../../../../../helpers/createOptionsArrayFromData';
import RightItemWithOneField from '../../../../../components/RightItemWithOneField';
import TabContentSection from '../../../../../components/TabContentSection';
import SwitcherComponent from '../../../../../components/SwitcherComponent';
import type { ILIFQuotaSectionViewProps } from './LIFQuotaSectionViewType';
import RowWithOneField from '../../../../../components/RowWithOneField';
import LIFQuotaSectionViewTexts from './LIFQuotaSectionViewTexts';
import SectionBody from '../../../../../components/SectionBody';
import SectionRow from '../../../../../components/SectionRow';

import { quotaItems, quotaTypeEnum } from '../../../constants';
import { LTypeModeItems } from '../../../store/types';

import { onOffItems } from '../../../../../constatnts';

import styles from './LIFQuotaSectionView.module.scss';

const LIFQuotaSectionView: FC<ILIFQuotaSectionViewProps> = ({
  uomEnabled,
  valueEnabled,
  netMassEnabled,
  grossMasEnabled,
  unlimitedEnabled,
  taxEnabled,
  quotaValue,
  handleChangeQuotaValue,
  handleQuotaConfigChange,
  form,
  type,
}) => {
  const {
    control,
    formState: { errors },
  } = form as UseFormReturn;
  const viewMode = type === LTypeModeItems.view;

  return (
    <TabContentSection title={LIFQuotaSectionViewTexts.TITLE_TEXT}>
      <SectionBody>
        <SectionRow className={styles.lifquota_section_row_item}>
          <SwitcherComponent
            label={{
              text: LIFQuotaSectionViewTexts.UOM_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handleQuotaConfigChange(option, quotaTypeEnum.UOM)}
            disabled={viewMode}
            items={onOffItems}
            value={uomEnabled}
            color="success"
          />
          <SwitcherComponent
            label={{
              text: LIFQuotaSectionViewTexts.VALUE_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handleQuotaConfigChange(option, quotaTypeEnum.VALUE)}
            value={valueEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
          <SwitcherComponent
            label={{
              text: LIFQuotaSectionViewTexts.NET_MASS_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handleQuotaConfigChange(option, quotaTypeEnum.NET_MASS)}
            value={netMassEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
        </SectionRow>
        <SectionRow className={styles.lifquota_section_row_item}>
          <SwitcherComponent
            label={{
              text: LIFQuotaSectionViewTexts.GROSS_MASS_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handleQuotaConfigChange(option, quotaTypeEnum.GROSS_MASS)}
            value={grossMasEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
          <SwitcherComponent
            label={{
              text: LIFQuotaSectionViewTexts.UNLIMITED,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handleQuotaConfigChange(option, quotaTypeEnum.UNLIMITED)}
            value={unlimitedEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
          <div className={styles.tax_content}>
            <SwitcherComponent
              label={{
                text: LIFQuotaSectionViewTexts.TAX_TEXT,
                icon: 'il_info',
              }}
              handleChange={(option: IdType) => handleQuotaConfigChange(option, quotaTypeEnum.TAX)}
              disabled={viewMode}
              items={onOffItems}
              value={taxEnabled}
              color="success"
            />
            <Controller
              render={({ field }) => (
                <Input
                  errorMessage={taxEnabled ? (errors?.quotaTaxCode?.message as string) : ''}
                  placeholder={LIFQuotaSectionViewTexts.TAX_CODE_PLACEHOLDER}
                  disabled={viewMode || !taxEnabled}
                  {...field}
                />
              )}
              name="quotaTaxCode"
              control={control}
            />
          </div>
        </SectionRow>
        <SectionRow>
          <RowWithOneField>
            <Controller
              render={({ field }) => (
                <Select
                  isOptionDisabled={(option: SelectBaseOption) => option?.value === quotaTypeEnum.TAX && !taxEnabled}
                  options={createOptionsArrayFromData(quotaItems, 'label', 'value')}
                  placeholder={LIFQuotaSectionViewTexts.QUOTA_TYPE_PLACEHOLDER}
                  errorMessage={errors?.quotaType?.message as string}
                  label={LIFQuotaSectionViewTexts.QUOTA_TYPE_TEXT}
                  onInputChange={handleChangeQuotaValue}
                  inputValue={quotaValue}
                  disabled={viewMode}
                  {...field}
                />
              )}
              control={control}
              name="quotaType"
            />
          </RowWithOneField>
        </SectionRow>
        <SectionRow>
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: LIFQuotaSectionViewTexts.REQUEST_AND_APPROVED_AMOUNT_ENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="requestedAndApprovedAmountEnabled"
            control={control}
          />
          <RightItemWithOneField>
            <Controller
              render={({ field: { value, onChange } }) => (
                <SwitcherComponent
                  label={{
                    text: LIFQuotaSectionViewTexts.REMAINING_AMOUNT_ENABLED_TEXT,
                    icon: 'il_info',
                  }}
                  handleChange={onChange}
                  disabled={viewMode}
                  items={onOffItems}
                  color="success"
                  value={+value}
                />
              )}
              name="remainingAmountEnabled"
              control={control}
            />
          </RightItemWithOneField>
        </SectionRow>
      </SectionBody>
    </TabContentSection>
  );
};

export default LIFQuotaSectionView;
