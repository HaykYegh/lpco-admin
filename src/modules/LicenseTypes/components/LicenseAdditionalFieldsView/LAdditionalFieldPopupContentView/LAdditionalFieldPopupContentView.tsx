import type { FC } from 'react';

import { Button } from '@wf/components';

import { type IAdditionalFieldPopupViewProps } from './LAdditionalFieldPopupContentViewType';
import { PopupFormMethods } from '../../../../../store/popupConfigs/types';
import FieldConfigsForm from '../LAdditionalFieldForms/FieldConfigsForm';
import GeneralForm from '../LAdditionalFieldForms/GeneralForm';
import Popup from '../../../../../components/Popup';

import { AdditionalFieldsDataTypes, AdditionalFieldsTextsByDataType } from '../../../constants';

import styles from './LAdditionalFieldPopupContentView.module.scss';

const LAdditionalFieldPopupContentView: FC<IAdditionalFieldPopupViewProps> = ({
  handleUpdateAdditionalField,
  handleHidePopup,
  popupInfo,
}) => {
  const informText = popupInfo.mode === PopupFormMethods.CREATE ? 'Add' : 'Update';

  return (
    <Popup
      title={`${informText} ${
        AdditionalFieldsTextsByDataType[popupInfo.field.dataType as keyof typeof AdditionalFieldsTextsByDataType] ?? ''
      }`}
      handleClosePopup={handleHidePopup}
      showPopup
    >
      <div className={styles.content_body}>
        <GeneralForm />
        {popupInfo.field.dataType !== AdditionalFieldsDataTypes.CHECKBOX && (
          <FieldConfigsForm dataType={popupInfo.field.dataType as keyof typeof AdditionalFieldsDataTypes} />
        )}
      </div>
      <div className={styles.content_footer}>
        <Button onClick={() => handleUpdateAdditionalField({ dataType: popupInfo.field.dataType })} color="success">
          {informText}
        </Button>
      </div>
    </Popup>
  );
};

export default LAdditionalFieldPopupContentView;
