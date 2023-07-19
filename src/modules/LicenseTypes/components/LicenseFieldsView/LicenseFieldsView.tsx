import type { UseFormReturn } from 'react-hook-form';
import type { FC } from 'react';

import TabContent from '../../../../components/TabContent';
import LFHeaderSectionView from './LFHeaderSectionView';

const LicenseFieldsView: FC<{ form?: UseFormReturn }> = ({ form }) => (
  <TabContent>
    <LFHeaderSectionView form={form} />
  </TabContent>
);

export default LicenseFieldsView;
