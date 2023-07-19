import { useSelector } from 'react-redux';
import type { FC } from 'react';

import { Tabs } from '@wf/components';

import LicenseAdditionalFieldsView from '../LicenseAdditionalFieldsView';
import { lTypeErrorsAdapter } from '../../store/entityAdapters';
import LicenseItemFieldsView from '../LicenseItemFieldsView';
import LicensePrintoutView from '../LicensePrintoutView';
import LicenseWorkflowView from '../LicenseWorkflowView';
import LicenseFieldsView from '../LicenseFieldsView';
import LicenseAttDocView from '../LicenseAttDocView';
import LicenseTypeView from '../LicenseTypeView';
import LicenseFeesView from '../LicenseFeesView';

import { licenseErrorMessagesSelector } from '../../store/selectors';
import type { ILicenseTypeByCodeProps } from '../../store/types';

import styles from './LicenseTypeTabView.module.scss';

const LicenseTypeTabView: FC<ILicenseTypeByCodeProps> = ({
  licenseTypeCode,
  licenseTypeName,
  licenseTypeNameInNationalLang,
  licenseTypeNature,
  ministryCode,
  departmentCode,
  ltValidation,
  ifValidation,
  formErrorsArrLength,
  form,
}) => {
  const licenseTypeErrors = useSelector(licenseErrorMessagesSelector);
  const licenseTypeErrorsSelectors = lTypeErrorsAdapter.getSelectors();
  const licenseTypeApprovalErrors = licenseTypeErrorsSelectors.selectById(licenseTypeErrors, 'approvals');
  const licenseTypeReRouteErrors = licenseTypeErrorsSelectors.selectById(licenseTypeErrors, 'reRoute');
  const licenseTypeAppFeesErrors = licenseTypeErrorsSelectors.selectById(licenseTypeErrors, 'applicationFees');
  const licenseTypeExtFeesErrors = licenseTypeErrorsSelectors.selectById(licenseTypeErrors, 'extensionFees');
  const licenseTypeApprovalErrorsParamsLength = licenseTypeApprovalErrors?.params?.length ?? 0;
  const licenseTypeReReturnErrorsParamsLength = licenseTypeReRouteErrors?.params?.length ?? 0;
  const licenseTypeAppFeesErrorsParamsLength = licenseTypeAppFeesErrors?.params?.length ?? 0;
  const licenseTypeExtFeesErrorsParamsLength = licenseTypeExtFeesErrors?.params?.length ?? 0;
  const workFlowErrorsLength = licenseTypeApprovalErrorsParamsLength + licenseTypeReReturnErrorsParamsLength;
  const feesErrorsLength = licenseTypeAppFeesErrorsParamsLength + licenseTypeExtFeesErrorsParamsLength;
  const ltValidationHasErrors = !!(formErrorsArrLength && !ltValidation);
  const ifValidationHasErrors = !!(formErrorsArrLength && !ifValidation);

  return (
    <Tabs>
      <Tabs.TabList className={styles.tabContent}>
        <Tabs.Tab hasError={ltValidationHasErrors}>License Type</Tabs.Tab>
        <Tabs.Tab hasError={!!workFlowErrorsLength}>Workflow</Tabs.Tab>
        <Tabs.Tab>License Fields</Tabs.Tab>
        <Tabs.Tab hasError={ifValidationHasErrors}>Item Fields</Tabs.Tab>
        <Tabs.Tab>Attached Documents</Tabs.Tab>
        <Tabs.Tab hasError={!!feesErrorsLength}>Fees</Tabs.Tab>
        <Tabs.Tab>Printout</Tabs.Tab>
        <Tabs.Tab>Additional Fields</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanel>
        <LicenseTypeView
          licenseTypeNameInNationalLang={licenseTypeNameInNationalLang}
          licenseTypeNature={licenseTypeNature}
          licenseTypeCode={licenseTypeCode}
          licenseTypeName={licenseTypeName}
          departmentCode={departmentCode}
          ministryCode={ministryCode}
          form={form}
        />
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <LicenseWorkflowView form={form} />
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <LicenseFieldsView form={form} />
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <LicenseItemFieldsView form={form} />
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <LicenseAttDocView />
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <LicenseFeesView form={form} />
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <LicensePrintoutView form={form} />
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <LicenseAdditionalFieldsView />
      </Tabs.TabPanel>
    </Tabs>
  );
};

export default LicenseTypeTabView;
