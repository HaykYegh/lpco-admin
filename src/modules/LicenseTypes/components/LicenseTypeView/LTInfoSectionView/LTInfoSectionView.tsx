import type { FC } from 'react';

import TabContentSection from '../../../../../components/TabContentSection';
import type { ILTInfoSectionView } from './LTInfoSectionViewTypes';
import InfoContent from '../../../../../components/InfoContent';
import LTInfoSectionViewTexts from './LTInfoSectionViewTexts';

import styles from './LTInfoSectionView.module.scss';

const LTInfoSectionView: FC<ILTInfoSectionView> = ({
  licenseTypeCode,
  licenseTypeName,
  licenseTypeNameInNationalLang,
  licenseTypeNature,
  ministryCode,
  departmentCode,
}) => (
  <TabContentSection title={LTInfoSectionViewTexts.TITLE_TEXT}>
    <InfoContent>
      <div className={styles.content}>
        <div className={styles.content_row}>
          <div className={styles.row_item}>
            <label>{LTInfoSectionViewTexts.LICENSE_TYPE_CODE_TEXT}</label>
            <p>{licenseTypeCode && `#${licenseTypeCode}`}</p>
          </div>
          <div className={styles.row_item}>
            <label>{LTInfoSectionViewTexts.LICENSE_TYPE_NAME_TEXT}</label>
            <p>{licenseTypeName}</p>
          </div>
          <div className={styles.row_item}>
            <label>{LTInfoSectionViewTexts.LICENSE_TYPE_NAME_IN_NATIONAL_LANGUAGE_TEXT}</label>
            <p>{licenseTypeNameInNationalLang}</p>
          </div>
        </div>
        <div className={styles.content_row}>
          <div className={styles.row_item}>
            <label>{LTInfoSectionViewTexts.LICENSE_TYPE_NATURE_TEXT}</label>
            <p>{licenseTypeNature}</p>
          </div>
          <div className={styles.row_item}>
            <label>{LTInfoSectionViewTexts.MINISTRY_CODE_TEXT}</label>
            <p>{ministryCode}</p>
          </div>
          <div className={styles.row_item}>
            <label>{LTInfoSectionViewTexts.DEPARTMENT_CODE_TEXT}</label>
            <p>{departmentCode}</p>
          </div>
        </div>
      </div>
    </InfoContent>
  </TabContentSection>
);

export default LTInfoSectionView;
