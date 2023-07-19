import { Controller, type UseFormReturn } from 'react-hook-form';
import type { FC } from 'react';

import { Input, Select } from '@wf/components';

import RightItemWithOneField from '../../../../../components/RightItemWithOneField';
import type { ILTProductSectionViewProps } from './LTProductSectionViewType';
import TabContentSection from '../../../../../components/TabContentSection';
import SwitcherComponent from '../../../../../components/SwitcherComponent';
import RowWithOneField from '../../../../../components/RowWithOneField';
import LTProductSectionViewTexts from './LTProductSectionViewTexts';
import SectionBody from '../../../../../components/SectionBody';
import SectionRow from '../../../../../components/SectionRow';

import { LTypeModeItems } from '../../../store/types';

import { onOffItems } from '../../../../../constatnts';

const LTProductSectionView: FC<ILTProductSectionViewProps> = ({
  onInputChange,
  licenseTypeOptions,
  productCodeValue,
  form,
  type,
}) => {
  const {
    control,
    register,
    formState: { errors },
  } = form as UseFormReturn;
  const viewMode = type === LTypeModeItems.view;

  return (
    <TabContentSection title={LTProductSectionViewTexts.TITLE_TEXT}>
      <SectionBody>
        <RowWithOneField>
          <Controller
            render={({ field }) => (
              <Select
                label={
                  <div>
                    {LTProductSectionViewTexts.TARIFF_LIST_CODE_TEXT}
                    <span>*</span>
                  </div>
                }
                errorMessage={errors?.tariffListCode?.message as string}
                disabled={viewMode}
                isClearable={true}
                {...field}
                placeholder={LTProductSectionViewTexts.TARIFF_LIST_CODE_PLACEHOLDER}
                onInputChange={onInputChange}
                inputValue={productCodeValue}
                options={licenseTypeOptions}
              />
            )}
            name="tariffListCode"
            control={control}
          />
        </RowWithOneField>
        <SectionRow>
          <Controller
            render={({ field: { value, onChange } }) => (
              <SwitcherComponent
                label={{
                  text: LTProductSectionViewTexts.RELATED_PRODUCTS_ENABLED_TEXT,
                  icon: 'il_info',
                }}
                handleChange={onChange}
                disabled={viewMode}
                items={onOffItems}
                color="success"
                value={+value}
              />
            )}
            name="relatedProductsEnabled"
            control={control}
          />
          <RightItemWithOneField>
            <Input
              placeholder={LTProductSectionViewTexts.RELATED_PRODUCTS_PLACEHOLDER}
              errorMessage={errors?.relatedProducts?.message as string}
              label={LTProductSectionViewTexts.RELATED_PRODUCTS}
              disabled={viewMode}
              {...register('relatedProducts')}
            />
          </RightItemWithOneField>
        </SectionRow>
      </SectionBody>
    </TabContentSection>
  );
};

export default LTProductSectionView;
