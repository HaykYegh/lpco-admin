import { type FC, useCallback } from 'react';

import type { UseFormReturn } from 'react-hook-form';

import { type IdType } from '@wf/components/dist/components/FormElements/Switcher/Switcher';

import LPConfSectionView from '../../../components/LicensePrintoutView/LPConfSectionView';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';

import { printoutConfEnum } from '../../../constants';

const LPConfSectionContainer: FC<{ form?: UseFormReturn }> = ({ form }) => {
  const { type } = useTypeInPath();

  const { watch, setValue } = form as UseFormReturn;
  const printStatuses = watch('printStatuses');

  const handlePrintoutConfigChange = useCallback(
    (option: IdType, name: string) => {
      let pConfigs: Array<string> = [...printStatuses];

      if (option) {
        pConfigs.push(name);
      } else {
        pConfigs = pConfigs.filter((item) => item !== name);
      }

      setValue('printStatuses', pConfigs);
    },
    [printStatuses, setValue]
  );

  return (
    <LPConfSectionView
      partiallyApproveEnabled={+printStatuses.includes(printoutConfEnum.PARTIALLY_APPROVE)}
      pendingPaymentEnabled={+printStatuses.includes(printoutConfEnum.PENDING_PAYMENT)}
      partiallyUseEnabled={+printStatuses.includes(printoutConfEnum.PARTIALLY_USE)}
      requestedEnabled={+printStatuses.includes(printoutConfEnum.REQUESTED)}
      suspendedEnabled={+printStatuses.includes(printoutConfEnum.SUSPENDED)}
      generatedEnabled={+printStatuses.includes(printoutConfEnum.GENERATED)}
      approvedEnabled={+printStatuses.includes(printoutConfEnum.APPROVED)}
      rejectedEnabled={+printStatuses.includes(printoutConfEnum.REJECTED)}
      canceledEnabled={+printStatuses.includes(printoutConfEnum.CANCELED)}
      queriedEnabled={+printStatuses.includes(printoutConfEnum.QUERIED)}
      expiredEnabled={+printStatuses.includes(printoutConfEnum.EXPIRED)}
      storedEnabled={+printStatuses.includes(printoutConfEnum.STORED)}
      usedEnabled={+printStatuses.includes(printoutConfEnum.USED)}
      handlePrintoutConfigChange={handlePrintoutConfigChange}
      type={type}
    />
  );
};

export default LPConfSectionContainer;
