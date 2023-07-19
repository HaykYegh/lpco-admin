import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { FC } from 'react';

import ContentContainer from '../../../../components/ContentContainer';
import HeaderComponent from '../../../../components/HeaderComponent';
import { appPaths } from '../../../../constatnts/appPaths';
import DocumentTexts from './DocumentTexts';

import type { DocumentType, GetDocumentApiPayload } from '../../store/types';
import { documentSelector } from '../../store/selectors';
import { getDocumentApi } from '../../store/actions';
import { APPNAME } from '../../../../constatnts';

import styles from './Document.module.scss';

const Document: FC = () => {
  const { code } = useParams();

  const state: DocumentType | null = useSelector(documentSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDocumentApi({ code } as GetDocumentApiPayload));
  }, [dispatch, code]);

  return (
    <div className={styles.container}>
      {state?.description && <HeaderComponent link={appPaths.attachedDocuments} title={state.description} />}
      <ContentContainer>
        <div className={styles.container_info}>
          <h2>{DocumentTexts.LICENSE_INFO}</h2>
          <div className={styles.content}>
            <div className={styles.content_row}>
              <div className={styles.row_item}>
                <label>{APPNAME}</label>
                <p>{state?.licenseTypeNature}</p>
              </div>
              <div className={styles.row_item}>
                <label>{DocumentTexts.LICENSE_TYPE_CODE}</label>
                <p>{state?.code}</p>
              </div>
            </div>
            <div className={styles.content_row}>
              <div className={styles.row_item}>
                <label>{DocumentTexts.MINISTRY_OWNER_CODE}</label>
                <p>{state?.ministryCode}</p>
              </div>
              <div className={styles.row_item}>
                <label>{DocumentTexts.LICENSE_TYPE_NAME}</label>
                <p>{state?.description}</p>
              </div>
            </div>
            <div className={styles.content_row}>
              <div className={styles.row_item}>
                <label>{DocumentTexts.DEPARTMENT_OWNER_CODE}</label>
                <p>{state?.departmentCode}</p>
              </div>
              <div className={styles.row_item}>
                <label>{DocumentTexts.LICENSE_NAME_IN_NL}</label>
                <p>{state?.descriptionTranslated}</p>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Document;
