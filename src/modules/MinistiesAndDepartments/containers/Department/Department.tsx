import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import type { FC } from 'react';

import { Checkbox, Icon } from '@wf/components';

import DepartmentsTBodyView from '../../components/DepartmentsTBodyView';
import ContentContainer from '../../../../components/ContentContainer';
import HeaderComponent from '../../../../components/HeaderComponent';
import InfoContent from '../../../../components/InfoContent';
import { appPaths } from '../../../../constatnts/appPaths';
import DepartmentTexts from './DepartmentTexts';

import type { GetMinistryApiPayload, MinistryType } from '../../store/types';
import { ministrySelector } from '../../store/selectors';
import { getMinistryApi } from '../../store/actions';

import styles from './Department.module.scss';

const Department: FC = () => {
  const { code, d_code } = useParams();

  const state: MinistryType | null = useSelector(ministrySelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMinistryApi({ code } as GetMinistryApiPayload));
  }, [code, dispatch]);

  const departmentItem = state?.ministryDepartments?.filter((item) => item.code === d_code)[0];

  return (
    <div className={styles.leyout}>
      {departmentItem?.description && (
        <HeaderComponent link={code && `${appPaths.ministries}/${code}`} title={departmentItem.description} />
      )}
      <ContentContainer>
        <div className={styles.container}>
          <h2>{DepartmentTexts.DIPARTMENT_INFO}</h2>
          <InfoContent>
            <div className={styles.content}>
              <div className={styles.content_row}>
                <div className={styles.row_item}>
                  <label>{DepartmentTexts.DEPARTMENT_CODE}</label>
                  <p>{departmentItem?.code}</p>
                </div>
                <div className={styles.row_item}>
                  <label>{DepartmentTexts.PHONE}</label>
                  <p>{departmentItem?.phoneNumber}</p>
                </div>
              </div>
              <div className={styles.content_row}>
                <div className={styles.row_item}>
                  <label>{DepartmentTexts.DEPARTMENT_NAME}</label>
                  <p>{departmentItem?.description}</p>
                </div>
                <div className={styles.row_item}>
                  <label>{DepartmentTexts.ADDRESS}</label>
                  <p>{departmentItem?.address}</p>
                </div>
              </div>
              <div className={styles.content_row}>
                <div className={styles.row_item}>
                  <label>{DepartmentTexts.DEPARTMENT_NAME_IN_NL}</label>
                  <p>{departmentItem?.descriptionTranslated}</p>
                </div>
                <div className={styles.row_item}>
                  <label>{DepartmentTexts.AVAILABLE_ON_FLOW_TYPE}</label>
                  <div className={styles.flex_item}>
                    <div>
                      <span>{DepartmentTexts.IMPORT}</span>
                      <Checkbox checked={true} disabled />
                    </div>
                    <div>
                      <span>{DepartmentTexts.EXPORT}</span>
                      <Checkbox checked={true} disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles.row_item_footer}>
              <label>{DepartmentTexts.MINISTRY_DEPARTMENTS_TITLE}</label>
              {code && (
                <Link to={`${appPaths.ministries}/${code}`}>
                  <p>
                    <span>{state?.description}</span>
                    <Icon name="ic_arrow_right" size={9} />
                  </p>
                </Link>
              )}
            </div>
          </InfoContent>
        </div>
        <div className={styles.container}>
          {state?.ministryDepartments && (
            <div className={styles.dep_info}>
              <h2>{DepartmentTexts.ASSOCIATED_DEPARTMENTS_TITLE}</h2>
              {state?.ministryDepartments && (
                <DepartmentsTBodyView
                  departments={state?.ministryDepartments.filter((item) => item.code !== d_code)}
                  ministryCode={code}
                />
              )}
            </div>
          )}
        </div>
      </ContentContainer>
    </div>
  );
};

export default Department;
