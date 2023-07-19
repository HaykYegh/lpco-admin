import type { FC } from 'react';

// eslint-disable-next-line max-len
import LTInfoSectionContainer from '../../containers/LicenseType/LTInfoSectionContainer';
import LTProductSectionContainer from '../../containers/LicenseType/LTProductSectionContainer';
import type { ILicenseTypeViewProps } from './LicenseTypeViewTypes';
import { useTypeInPath } from '../../../../hooks/useTypeInPath';
import LTValiditySectionView from './LTValiditySectionView';
import TabContent from '../../../../components/TabContent';
import LTInfoSectionView from './LTInfoSectionView';
import LTConfSectionView from './LTConfSectionView';

import { LTypeModeItems } from '../../store/types';

const LicenseTypeView: FC<ILicenseTypeViewProps> = ({
  licenseTypeCode,
  licenseTypeName,
  licenseTypeNameInNationalLang,
  licenseTypeNature,
  ministryCode,
  departmentCode,
  form,
}) => {
  const { type } = useTypeInPath();

  return (
    <TabContent>
      {type !== LTypeModeItems.create ? (
        <LTInfoSectionView
          licenseTypeNameInNationalLang={licenseTypeNameInNationalLang}
          licenseTypeNature={licenseTypeNature}
          licenseTypeCode={licenseTypeCode}
          licenseTypeName={licenseTypeName}
          departmentCode={departmentCode}
          ministryCode={ministryCode}
        />
      ) : (
        <LTInfoSectionContainer />
      )}
      <LTConfSectionView form={form} />
      <LTProductSectionContainer form={form} />
      <LTValiditySectionView form={form} />
    </TabContent>
  );
};

export default LicenseTypeView;
