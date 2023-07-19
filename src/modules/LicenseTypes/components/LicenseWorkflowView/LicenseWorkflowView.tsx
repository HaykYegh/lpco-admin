import type { UseFormReturn } from 'react-hook-form';
import type { FC } from 'react';

import LWApprovalSectionContainer from '../../containers/LicenseType/LWApprovalSectionContainer';
import LWInspectionSectionView from './LWInspectionSectionView';
import TabContent from '../../../../components/TabContent';
import LWConfSectionView from './LWConfSectionView';

const LicenseWorkflowView: FC<{ form?: UseFormReturn }> = ({ form }) => (
  <TabContent>
    <LWApprovalSectionContainer />
    <LWConfSectionView form={form} />
    <LWInspectionSectionView />
  </TabContent>
);

export default LicenseWorkflowView;
