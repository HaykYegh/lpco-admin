import { Controller, type UseFormReturn } from 'react-hook-form';
import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { Select } from '@wf/components';

import { createOptionsArrayFromData } from '../../../../../helpers/createOptionsArrayFromData';
import TabContentSection from '../../../../../components/TabContentSection';
import type { ILTConfSectionViewProps } from './LFeesConfSectionViewType';
import RowWithOneField from '../../../../../components/RowWithOneField';
import LFeesConfSectionViewTexts from './LFeesConfSectionViewTexts';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';
import SectionBody from '../../../../../components/SectionBody';
import { feesAdapter } from '../../../store/entityAdapters';

import { feeMode, LTypeModeItems } from '../../../store/types';

import { licenseTypeFeesByCodeSelector } from '../../../store/selectors';
import { paymentFlowItems } from '../../../options';

const LFeesConfSectionView: FC<ILTConfSectionViewProps> = ({ form }) => {
  const { type } = useTypeInPath();
  const { control, watch } = form as UseFormReturn;

  const feesAdapterSelectors = feesAdapter.getSelectors();
  const licenseFeesSelector = useSelector(licenseTypeFeesByCodeSelector);
  const allAppFees = feesAdapterSelectors.selectAll(licenseFeesSelector);

  const viewMode = type === LTypeModeItems.view;
  const appFeesWatchMode = watch('applicationFeeMode');
  const noFeeMode = appFeesWatchMode === feeMode.NONE;
  const fixedMode = appFeesWatchMode === feeMode.FIXED;
  const disabled = viewMode || noFeeMode || (!allAppFees.length && fixedMode);

  return (
    <TabContentSection title={LFeesConfSectionViewTexts.TITLE_TEXT}>
      <SectionBody>
        <RowWithOneField>
          <Controller
            render={({ field }) => (
              <Select
                label={
                  <div>
                    {LFeesConfSectionViewTexts.PAYMENT_FLOW_TEXT}
                    <span>*</span>
                  </div>
                }
                options={createOptionsArrayFromData(paymentFlowItems, 'label', 'value')}
                placeholder={LFeesConfSectionViewTexts.PAYMENT_FLOW_PLACHOLDER_TEXT}
                disabled={disabled}
                {...field}
              />
            )}
            name="paymentFlow"
            control={control}
          />
        </RowWithOneField>
      </SectionBody>
    </TabContentSection>
  );
};

export default LFeesConfSectionView;
