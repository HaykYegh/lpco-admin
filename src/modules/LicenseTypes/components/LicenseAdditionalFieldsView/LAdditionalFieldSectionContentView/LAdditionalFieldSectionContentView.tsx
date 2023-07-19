import { useFieldArray, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { FC } from 'react';

import { Button, ConfirmationModal, ConfirmationModalType } from '@wf/components';

import { type ILAdditionalFieldSectionContentViewProps } from './LAdditionalFieldSectionContentViewTypes';
import { popupConfigsDataSelector } from '../../../../../store/popupConfigs/selectors';
import { removePopupConfig } from '../../../../../store/popupConfigs/slices';
import { PopupNames } from '../../../../../store/popupConfigs/types';
import LAdditionalFieldsRow from '../LAdditionalFieldsRow';

import { AdditionalFieldsDataTypes, withSeparator } from '../../../constants';

import styles from './LAdditionalFieldSectionContentView.module.scss';

const LAdditionalFieldSectionContentView: FC<ILAdditionalFieldSectionContentViewProps> = ({ tab }) => {
  const dispatch = useDispatch();
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `additionalFields.${tab}`,
  });

  const popupConfigsData = useSelector(popupConfigsDataSelector);
  const confirmationPopupInfo = popupConfigsData.entities[PopupNames.DELETE_CONFIRMATION];

  const handleAddRow = (isSeparator = false) => {
    append({ fields: [{ dataType: isSeparator ? AdditionalFieldsDataTypes.SEPARATOR : null }] });
  };

  const handleCancel = () => {
    dispatch(removePopupConfig(PopupNames.DELETE_CONFIRMATION));
  };

  const handleAccept = () => {
    remove(confirmationPopupInfo?.data.rowId as number);
    handleCancel();
  };

  return (
    <div className={styles.container}>
      <div className={styles.rows_content}>
        {fields.map((item: Record<string, any>, index) => (
          <LAdditionalFieldsRow addItionalFields={item.fields} key={item.id} tab={tab} rowId={index} />
        ))}
      </div>
      <div className={styles.configs_content}>
        <Button onClick={() => handleAddRow(false)} color="typography" secondary>
          Add Row
        </Button>
        {withSeparator && (
          <Button onClick={() => handleAddRow(true)} color="typography" secondary>
            Add Separator
          </Button>
        )}
      </div>
      {tab === confirmationPopupInfo?.data.tab && (
        <ConfirmationModal
          title={confirmationPopupInfo?.title ?? ''}
          type={ConfirmationModalType.Deletion}
          isOpen={!!confirmationPopupInfo}
          onAccept={handleAccept}
          onCancel={handleCancel}
          id="deletion-modal"
        >
          {confirmationPopupInfo?.data?.message ?? ''}
        </ConfirmationModal>
      )}
    </div>
  );
};

export default LAdditionalFieldSectionContentView;
