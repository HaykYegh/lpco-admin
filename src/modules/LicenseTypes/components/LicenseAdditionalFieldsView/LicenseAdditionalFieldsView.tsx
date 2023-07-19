import type { FC } from 'react';

import LAdditionalFieldSectionView from './LAdditionalFieldSectionView';

import { AdditionalFieldsTabs } from '../../constants';

import styles from './LicenseAdditionalFieldsView.module.scss';

const LicenseAdditionalFieldsView: FC = () => (
  <div className={styles.sections_content}>
    <LAdditionalFieldSectionView tab={AdditionalFieldsTabs.HEADER} title="Headers" />
    <LAdditionalFieldSectionView tab={AdditionalFieldsTabs.NAMES_AND_PARTIES} title="Names & Parties" />
    <LAdditionalFieldSectionView title="Items" tab={AdditionalFieldsTabs.ITEM} />
    <LAdditionalFieldSectionView tab={AdditionalFieldsTabs.ATTACHED_DOCUMENT} title="Attached Documents" />
    <LAdditionalFieldSectionView tab={AdditionalFieldsTabs.BENEFICIARY} title="Beneficiaries" />
  </div>
);

export default LicenseAdditionalFieldsView;
