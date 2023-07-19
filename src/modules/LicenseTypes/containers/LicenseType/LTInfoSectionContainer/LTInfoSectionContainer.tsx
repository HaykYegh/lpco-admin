import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { FC } from 'react';

import type { DocumentType, GetDocumentApiPayload } from '../../../../Documents/store/types';
import LTInfoSectionView from '../../../components/LicenseTypeView/LTInfoSectionView';
import { documentSelector } from '../../../../Documents/store/selectors';
import { getDocumentApi } from '../../../../Documents/store/actions';

const LTInfoSectionContainer: FC = () => {
  const { code } = useParams();

  const state: DocumentType | null = useSelector(documentSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDocumentApi({ code } as GetDocumentApiPayload));
  }, [dispatch, code]);

  return (
    <LTInfoSectionView
      licenseTypeNameInNationalLang={state?.descriptionTranslated}
      licenseTypeNature={state?.licenseTypeNature}
      departmentCode={state?.departmentCode}
      licenseTypeName={state?.description}
      ministryCode={state?.ministryCode}
      licenseTypeCode={state?.code}
    />
  );
};

export default LTInfoSectionContainer;
