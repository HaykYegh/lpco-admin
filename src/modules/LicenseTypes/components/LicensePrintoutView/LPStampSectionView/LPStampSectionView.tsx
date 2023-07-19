import type { FC } from 'react';

import { FileUpload } from '@wf/components';

import TabContentSection from '../../../../../components/TabContentSection';
import type { ILPStampSectionViewProps } from './LPStampSectionViewType';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';
import LPStampSectionViewTexts from './LPStampSectionViewTexts';

import { stampUploadSupportedFileTypes, stampUploadSupportedMaxFileSize } from '../../../constants';
import { LTypeModeItems } from '../../../store/types';

import styles from './LPStampSectionView.module.scss';

const LPStampSectionView: FC<ILPStampSectionViewProps> = ({
  sigAndStampsNameValue,
  singleInputRef,
  handleChange,
  handleFileDrop,
  handleChooseFile,
  handleDeleteFile,
}) => {
  const { type } = useTypeInPath();
  const viewMode = type === LTypeModeItems.view;

  return (
    <TabContentSection title={LPStampSectionViewTexts.TITLE_TEXT}>
      <div className={styles.upload_content}>
        <input ref={singleInputRef} type="file" id="input-file-upload" onChange={handleChange} disabled={viewMode} />
        <FileUpload
          className={viewMode && sigAndStampsNameValue ? styles.uploadViewMode : undefined}
          supportedMaxFileSize={stampUploadSupportedMaxFileSize}
          supportedFileTypes={stampUploadSupportedFileTypes}
          fileName={sigAndStampsNameValue}
          onChooseFile={handleChooseFile}
          onDelete={handleDeleteFile}
          onDrop={handleFileDrop}
        />
      </div>
    </TabContentSection>
  );
};

export default LPStampSectionView;
