import type { FC } from 'react';

import { Button, Select } from '@wf/components';

import type { ISpecifyDocumentViewProps } from './SpecifyDocumentViewTypes';
import SpecifyDocumentViewTexts from './SpecifyDocumentViewTexts';

import styles from './SpecifyDocumentView.module.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SpecifyDocumentView: FC<ISpecifyDocumentViewProps<any>> = ({
  handleChange,
  licenseTypeOptions,
  licenseTypeValue,
  handleMinistryChange,
  ministriesOptions,
  ministryCodeValue,
  departmentsOptions,
  departmentCodeValue,
  documentInfo,
  handleCreateLicenseType,
  specifyDocumentLoadingState,
  disabled,
}) => (
  <div className={styles.container_info}>
    <div className={styles.content}>
      <div className={styles.content_row}>
        <div className={styles.row_item}>
          <div className={styles.row_item_content}>
            <Select
              placeholder={SpecifyDocumentViewTexts.CHOOSE_LICENSE_TYPE}
              label={SpecifyDocumentViewTexts.NATUR_OF_LICENSE}
              disabled={specifyDocumentLoadingState}
              options={licenseTypeOptions}
              value={licenseTypeValue}
              onChange={handleChange}
              name="licenseType"
              isClearable
            />
          </div>
          <div className={styles.row_item_content}>
            <Select
              placeholder={SpecifyDocumentViewTexts.CHOOSE_MINISTRY_CODE}
              label={SpecifyDocumentViewTexts.MINISTRY_OWNER_CODE}
              disabled={specifyDocumentLoadingState}
              onInputChange={handleMinistryChange}
              options={ministriesOptions}
              value={ministryCodeValue}
              onChange={handleChange}
              name="ministryCode"
              errorMessage=""
              isClearable
            />
          </div>
          <div className={styles.row_item_content}>
            <Select
              label={
                <div className={styles.label_content}>
                  {SpecifyDocumentViewTexts.DEPARTMENT_OWNER_CODE}
                  <span>{SpecifyDocumentViewTexts.OPTIONAL}</span>
                </div>
              }
              placeholder={SpecifyDocumentViewTexts.CHOOSE_DEPARTMENT_CODE}
              disabled={!ministryCodeValue || specifyDocumentLoadingState}
              options={departmentsOptions}
              value={departmentCodeValue}
              onChange={handleChange}
              name="departmentCode"
              isClearable
            />
          </div>
          <p>{SpecifyDocumentViewTexts.SPECIFY_DOCUMENT_NOTE_INFO}</p>
        </div>
        <div className={styles.row_item}>
          <div className={styles.row_item_info}>
            <div>
              <label>{SpecifyDocumentViewTexts.LICENSE_TYPE_CODE}</label>
              {documentInfo?.code && <p>{`#${documentInfo.code}`}</p>}
            </div>
            <div>
              <label>{SpecifyDocumentViewTexts.LICENSE_TYPE_NAME}</label>
              <p>{documentInfo?.description}</p>
            </div>
            <div>
              <label>{SpecifyDocumentViewTexts.LICENSE_TYPE_NAME_IN_NL}</label>
              <p>{documentInfo?.descriptionTranslated}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button
          isLoading={specifyDocumentLoadingState}
          onClick={handleCreateLicenseType}
          className={styles.specify_btn}
          disabled={disabled}
          color="success"
        >
          {SpecifyDocumentViewTexts.SPECIFY_LICENSE_TYPE}
        </Button>
      </div>
    </div>
  </div>
);

export default SpecifyDocumentView;
