import type { FC } from 'react';

import LFeesSectionContainer from '../../containers/LicenseType/LFeesSectionContainer';
import type { ILicenseFeesView } from './LicenseFeesViewTypes';
import TabContent from '../../../../components/TabContent';
import LicenseFeesViewTexts from './LicenseFeesViewTexts';
import LFeesConfSectionView from './LFeesConfSectionView';
import { licenseFeeTypes } from './LicenseFeesViewTypes';

import { licenseAppFeeTypeItems, licenseExtFeeTypeItems } from '../../options';

const LicenseFeesView: FC<ILicenseFeesView> = ({ form }) => (
  <TabContent>
    <LFeesConfSectionView form={form} />
    <LFeesSectionContainer
      title={LicenseFeesViewTexts.APPLICATION_FEES_TITLE_TEXT}
      licenseFeeType={licenseFeeTypes.APPLICATION_FEE}
      feeCalcTypes={licenseAppFeeTypeItems}
      licenseTypeForm={form}
    />
    <LFeesSectionContainer
      title={LicenseFeesViewTexts.EXTENTION_FEES_TITLE_TEXT}
      licenseFeeType={licenseFeeTypes.EXTENSION_FEE}
      feeCalcTypes={licenseExtFeeTypeItems}
      licenseTypeForm={form}
    />
  </TabContent>
);

export default LicenseFeesView;
