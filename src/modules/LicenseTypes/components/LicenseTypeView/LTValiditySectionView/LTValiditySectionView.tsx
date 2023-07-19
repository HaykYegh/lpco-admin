import { type FC, useEffect } from 'react';

import { Controller, type UseFormReturn } from 'react-hook-form';

import { Input } from '@wf/components';

import RightItemWithOneField from '../../../../../components/RightItemWithOneField';
import RightItemWithTwoField from '../../../../../components/RightItemWithTwoField';
import type { ILTValiditySectionViewProps } from './LTValiditySectionViewType';
import TabContentSection from '../../../../../components/TabContentSection';
import SwitcherComponent from '../../../../../components/SwitcherComponent';
import LTValiditySectionViewTexts from './LTValiditySectionViewTexts';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';
import SectionBody from '../../../../../components/SectionBody';
import SectionRow from '../../../../../components/SectionRow';

import { MANUAL, NUM_OF_DAYS } from '../../../constants';
import { LTypeModeItems } from '../../../store/types';

import { endDateValidityTypeItems, startDateValidityTypeItems } from '../../../options';
import { onOffItems } from '../../../../../constatnts';

import styles from './LTValiditySectionView.module.scss';

const LTValiditySectionView: FC<ILTValiditySectionViewProps> = ({ form }) => {
  const { type } = useTypeInPath();
  const {
    watch,
    control,
    register,
    setValue,
    formState: { errors },
  } = form as UseFormReturn;
  const viewMode = type === LTypeModeItems.view;

  const extendBeforeExpirationEnabled = watch('extendBeforeExpirationEnabled');
  const extendAfterExpirationEnabled = watch('extendAfterExpirationEnabled');
  const startDateValidityType = watch('startDateValidityType');
  const endDateValidityType = watch('endDateValidityType');

  useEffect(() => {
    if (startDateValidityType === MANUAL) {
      setValue('noOfDaysBeforeValidFrom', 0);
    }
  }, [startDateValidityType, setValue]);

  useEffect(() => {
    if (endDateValidityType !== NUM_OF_DAYS) {
      setValue('validityPeriod', 0);
    }
  }, [endDateValidityType, setValue]);

  useEffect(() => {
    if (!extendBeforeExpirationEnabled) {
      setValue('noOfDaysBeforeValidTo', 0);
    }
  }, [extendBeforeExpirationEnabled, setValue]);

  useEffect(() => {
    if (!extendAfterExpirationEnabled) {
      setValue('noOfAllowableExtension', 0);
      setValue('maxNumOfDaysForExtension', 0);
    }
  }, [extendAfterExpirationEnabled, setValue]);

  const expirationDisabled = !extendAfterExpirationEnabled && !extendBeforeExpirationEnabled;

  return (
    <TabContentSection title={LTValiditySectionViewTexts.TITLE_TEXT}>
      <SectionBody>
        <SectionRow>
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: LTValiditySectionViewTexts.EXTEND_BEFORE_EXPIRATION_ENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="extendBeforeExpirationEnabled"
            control={control}
          />
          <RightItemWithOneField>
            <Input
              placeholder={LTValiditySectionViewTexts.NUMBER_OF_DAYS_BEFORE_VALID_TO_PLACEHOLDER}
              label={LTValiditySectionViewTexts.NUMBER_OF_DAYS_BEFORE_VALID_TO_TEXT}
              errorMessage={errors?.noOfDaysBeforeValidTo?.message as string}
              disabled={viewMode || !extendBeforeExpirationEnabled}
              type="number"
              min={0}
              {...register('noOfDaysBeforeValidTo')}
            />
          </RightItemWithOneField>
        </SectionRow>
        <SectionRow>
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: LTValiditySectionViewTexts.EXTEND_AFTER_EXPIRATION_ENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="extendAfterExpirationEnabled"
            control={control}
          />

          <RightItemWithTwoField>
            <Input
              placeholder={LTValiditySectionViewTexts.NUMBER_OF_ALLOWABLE_EXTENTION_PLACEHOLDER}
              label={LTValiditySectionViewTexts.NUMBER_OF_ALLOWABLE_EXTENTION_TEXT}
              errorMessage={errors?.noOfAllowableExtension?.message as string}
              disabled={viewMode || expirationDisabled}
              type="number"
              min={0}
              {...register('noOfAllowableExtension')}
            />
            <Input
              placeholder={LTValiditySectionViewTexts.MAX_NUM_OF_DAYS_FOR_EXTANTION_PLACEHOLDER}
              label={LTValiditySectionViewTexts.MAX_NUM_OF_DAYS_FOR_EXTANTION_TEXT}
              errorMessage={errors?.maxNumOfDaysForExtension?.message as string}
              disabled={viewMode || expirationDisabled}
              type="number"
              min={0}
              {...register('maxNumOfDaysForExtension')}
            />
          </RightItemWithTwoField>
        </SectionRow>
        <hr />
        <SectionRow className={styles.ltv_section_row_item}>
          <Controller
            render={({ field: { onChange, value } }) => (
              <SwitcherComponent
                label={{
                  text: LTValiditySectionViewTexts.START_DATE_VALIDITY_TEXT,
                }}
                items={startDateValidityTypeItems}
                handleChange={onChange}
                disabled={viewMode}
                color="success"
                value={value}
              />
            )}
            name="startDateValidityType"
            control={control}
          />
          <Input
            placeholder={LTValiditySectionViewTexts.NUMBER_OF_DAYS_BEFORE_VALID_FROM_PLACEHOLDER}
            label={LTValiditySectionViewTexts.NUMBER_OF_DAYS_BEFORE_VALID_FROM_TEXT}
            errorMessage={errors?.noOfDaysBeforeValidFrom?.message as string}
            disabled={viewMode || startDateValidityType !== NUM_OF_DAYS}
            type="number"
            min={0}
            {...register('noOfDaysBeforeValidFrom')}
          />
          <Controller
            render={({ field: { onChange, value } }) => (
              <SwitcherComponent
                label={{
                  text: LTValiditySectionViewTexts.END_DATE_VALIDITY_TYPE_TEXT,
                }}
                items={endDateValidityTypeItems}
                handleChange={onChange}
                disabled={viewMode}
                color="success"
                value={value}
              />
            )}
            name="endDateValidityType"
            control={control}
          />
          <Input
            placeholder={LTValiditySectionViewTexts.VALIDITY_PERIOD_PLACEHOLDER}
            disabled={viewMode || endDateValidityType !== NUM_OF_DAYS}
            errorMessage={errors?.validityPeriod?.message as string}
            label={LTValiditySectionViewTexts.VALIDITY_PERIOD_TEXT}
            type="number"
            min={0}
            {...register('validityPeriod')}
          />
        </SectionRow>
      </SectionBody>
    </TabContentSection>
  );
};

export default LTValiditySectionView;
