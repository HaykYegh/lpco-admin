import type { UseFormReturn } from 'react-hook-form';
import type { FC } from 'react';

import LIFQuotaSectionContainer from '../../containers/LicenseType/LIFQuotaSectionContainer';
import LIFItemOperationSectionView from './LIFItemOperationSectionView';
import TabContent from '../../../../components/TabContent';
import LIFItemSectionView from './LIFItemSectionView';

const LicenseItemFieldsView: FC<{ form?: UseFormReturn }> = ({ form }) => (
  <TabContent>
    <LIFItemSectionView form={form} />
    <LIFQuotaSectionContainer form={form} />
    <LIFItemOperationSectionView form={form} />
  </TabContent>
);

export default LicenseItemFieldsView;
