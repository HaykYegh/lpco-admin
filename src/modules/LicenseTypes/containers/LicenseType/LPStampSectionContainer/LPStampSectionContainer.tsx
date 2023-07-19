import React, { type FC, useCallback, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import LPStampSectionView from '../../../components/LicensePrintoutView/LPStampSectionView';

import { stampIdPropName } from '../../../store/types';

import { uploadsDataSelector } from '../../../../../store/uploads/selectors';
import { getUploadParams } from '../../../../../store/uploads/actions';
import * as slicesActions from '../../../../../store/uploads/slices';

const LPStampSectionContainer: FC = () => {
  const dispatch = useDispatch();
  const singleInputRef = useRef<HTMLInputElement>(null);
  const uploadsDataState = useSelector(uploadsDataSelector);
  const sigAndStampsNameValue = uploadsDataState.entities?.[stampIdPropName]?.uploadedFileName ?? '';

  const handleChooseFile = useCallback(() => {
    singleInputRef?.current?.click();
  }, []);

  const uploadFile = useCallback(
    (files: FileList | null) => {
      if (files?.[0]) {
        const formData = new FormData();
        formData.append('file', files[0]);
        dispatch(getUploadParams({ url: 'stamp', fieldName: stampIdPropName, formData }));
      }
    },
    [dispatch]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      uploadFile(e.target.files);
    },
    [uploadFile]
  );

  const handleDeleteFile = useCallback(() => {
    dispatch(slicesActions.removeUpload(stampIdPropName));
  }, [dispatch]);

  const handleFileDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      uploadFile(e.dataTransfer.files);
    },
    [uploadFile]
  );

  return (
    <LPStampSectionView
      sigAndStampsNameValue={sigAndStampsNameValue}
      handleChooseFile={handleChooseFile}
      handleDeleteFile={handleDeleteFile}
      singleInputRef={singleInputRef}
      handleFileDrop={handleFileDrop}
      handleChange={handleChange}
    />
  );
};

export default LPStampSectionContainer;
