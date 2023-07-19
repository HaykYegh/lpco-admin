import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { FC } from 'react';

import DepartmentsTBodyView from '../../components/DepartmentsTBodyView';
import ContentContainer from '../../../../components/ContentContainer';
import HeaderComponent from '../../../../components/HeaderComponent';
import InfoContent from '../../../../components/InfoContent';
import { appPaths } from '../../../../constatnts/appPaths';
import MinistryTexts from './MinistryTexts';

import type { GetMinistryApiPayload, MinistryType } from '../../store/types';
import { ministrySelector } from '../../store/selectors';
import { getMinistryApi } from '../../store/actions';

import styles from './Ministry.module.scss';

const Ministry: FC = () => {
  const { code } = useParams();

  const state: MinistryType | null = useSelector(ministrySelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMinistryApi({ code } as GetMinistryApiPayload));
  }, [dispatch, code]);

  return (
    <div className={styles.container}>
      {state?.description && <HeaderComponent link={appPaths.ministries} title={state.description} />}
      <ContentContainer>
        <div className={styles.container_info}>
          <h2>{MinistryTexts.MINISTRY_INFO}</h2>
          <InfoContent>
            <div className={styles.content}>
              <div className={styles.content_row}>
                <div className={styles.row_item}>
                  <label>{MinistryTexts.MINISTRY_CODE}</label>
                  <p>{state?.code}</p>
                </div>
                <div className={styles.row_item}>
                  <label>{MinistryTexts.PHONE}</label>
                  <p>{state?.phoneNumber}</p>
                </div>
              </div>
              <div className={styles.content_row}>
                <div className={styles.row_item}>
                  <label>{MinistryTexts.MINISTRY_NAME}</label>
                  <p>{state?.description}</p>
                </div>
                <div className={styles.row_item}>
                  <label>{MinistryTexts.DEPARTMENT_ADDRESS}</label>
                  <p>{state?.address1}</p>
                </div>
              </div>
              <div className={styles.content_row}>
                <div className={styles.row_item}>
                  <label>{MinistryTexts.MINISTRY_NAME_IN_NL}</label>
                  <p>{state?.descriptionTranslated}</p>
                </div>
                <div className={styles.row_item}>
                  <label>{MinistryTexts.EMAEL}</label>
                  <p>{state?.email}</p>
                </div>
              </div>
            </div>
          </InfoContent>
          {state?.ministryDepartments && (
            <div className={styles.dep_info}>
              <h2 className={styles.dep_title}>Associated Departments</h2>
              {state?.ministryDepartments && (
                <DepartmentsTBodyView ministryCode={code} departments={state?.ministryDepartments} />
              )}
            </div>
          )}
        </div>
      </ContentContainer>
    </div>
  );
};

export default Ministry;
