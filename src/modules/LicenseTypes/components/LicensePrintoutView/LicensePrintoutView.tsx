import type { UseFormReturn } from 'react-hook-form';
import type { FC } from 'react';

import LPStampSectionContainer from '../../containers/LicenseType/LPStampSectionContainer';
import LPConfSectionContainer from '../../containers/LicenseType/LPConfSectionContainer';
import TabContent from '../../../../components/TabContent';

const LicensePrintoutView: FC<{ form?: UseFormReturn }> = ({ form }) => (
  <TabContent>
    <LPConfSectionContainer form={form} />
    <LPStampSectionContainer />
  </TabContent>
);

export default LicensePrintoutView;
