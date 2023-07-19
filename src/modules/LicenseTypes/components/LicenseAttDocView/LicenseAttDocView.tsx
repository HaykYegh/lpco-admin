import type { FC } from 'react';

import LAttachmentsSectionContainer from '../../containers/LicenseType/LAttachmentsSectionContainer';
import TabContent from '../../../../components/TabContent';

const LicenseAttDocView: FC = () => (
  <TabContent>
    <LAttachmentsSectionContainer />
  </TabContent>
);

export default LicenseAttDocView;
