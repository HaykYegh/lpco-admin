import type { FC } from 'react';

import TabContentSection from '../../../../../components/TabContentSection';
import SwitcherComponent from '../../../../../components/SwitcherComponent';
import LWInspectionSectionViewTexts from './LWInspectionSectionViewTexts';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';
import SectionBody from '../../../../../components/SectionBody';
import SectionRow from '../../../../../components/SectionRow';

import { LTypeModeItems } from '../../../store/types';
import { inspectionItems } from '../../../constants';

const LWInspectionSectionView: FC = () => {
  const { type } = useTypeInPath();
  const viewMode = type === LTypeModeItems.view;

  return (
    <TabContentSection title={LWInspectionSectionViewTexts.TITLE_TEXT}>
      <SectionBody>
        <SectionRow>
          <SwitcherComponent color="success" items={inspectionItems} disabled={viewMode} value={0} />
        </SectionRow>
      </SectionBody>
    </TabContentSection>
  );
};

export default LWInspectionSectionView;
