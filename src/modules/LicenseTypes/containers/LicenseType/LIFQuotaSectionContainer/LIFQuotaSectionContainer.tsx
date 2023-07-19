import { type FC, useCallback, useState } from 'react';

import type { UseFormReturn } from 'react-hook-form';

import { type IdType } from '@wf/components/dist/components/FormElements/Switcher/Switcher';

import LIFQuotaSectionView from '../../../components/LicenseItemFieldsView/LIFQuotaSectionView';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';

import { quotaTypeEnum } from '../../../constants';

const LIFQuotaSectionContainer: FC<{ form?: UseFormReturn }> = ({ form }) => {
  const { type } = useTypeInPath();
  const [quotaValue, setQuotaValue] = useState('');
  const { watch, setValue } = form as UseFormReturn;
  const enabledQuotas = watch('enabledQuotas');

  const handleQuotaConfigChange = useCallback(
    (option: IdType, name: string) => {
      let qConfigs: Array<string> = [...enabledQuotas];

      if (option) {
        qConfigs.push(name);
      } else {
        qConfigs = qConfigs.filter((item) => item !== name);
      }

      setValue('enabledQuotas', qConfigs);
    },
    [enabledQuotas, setValue]
  );

  const handleChangeQuotaValue = useCallback(
    (value: string) => {
      setQuotaValue(value);
    },
    [setQuotaValue]
  );

  return (
    <LIFQuotaSectionView
      grossMasEnabled={+enabledQuotas.includes(quotaTypeEnum.GROSS_MASS)}
      unlimitedEnabled={+enabledQuotas.includes(quotaTypeEnum.UNLIMITED)}
      netMassEnabled={+enabledQuotas.includes(quotaTypeEnum.NET_MASS)}
      valueEnabled={+enabledQuotas.includes(quotaTypeEnum.VALUE)}
      uomEnabled={+enabledQuotas.includes(quotaTypeEnum.UOM)}
      taxEnabled={+enabledQuotas.includes(quotaTypeEnum.TAX)}
      handleQuotaConfigChange={handleQuotaConfigChange}
      handleChangeQuotaValue={handleChangeQuotaValue}
      quotaValue={quotaValue}
      form={form}
      type={type}
    />
  );
};

export default LIFQuotaSectionContainer;
