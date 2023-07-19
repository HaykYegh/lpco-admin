import { useMemo, useState } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import type { FC } from 'react';

import { Button, ConfirmationModal, ConfirmationModalType, Icon, Popover } from '@wf/components';
import { type IdType } from '@wf/components/dist/components/FormElements/Switcher/Switcher';

import { type ILAdditionalFieldsRowProps, type PopupInfo } from './LAdditionalFieldsRowTypes';
import { PopupFormMethods, PopupNames } from '../../../../../store/popupConfigs/types';
import LAdditionalFieldPopupContentView from '../LAdditionalFieldPopupContentView';
import SwitcherComponent from '../../../../../components/SwitcherComponent';
import { addPopupConfig } from '../../../../../store/popupConfigs/slices';
import LAdditionalField from '../LAdditionalField';

import { type IAdditionalFieldItem } from '../../../store/types';
import { AdditionalFieldsDataTypes } from '../../../constants';

import { getAddedFields, getRemovedFieldsIds, getSumOfRowFields } from '../../../helpers';

import styles from './LAdditionalFieldsRow.module.scss';

const LAdditionalFieldsRow: FC<ILAdditionalFieldsRowProps> = ({ tab, rowId, addItionalFields }) => {
  const dispatch = useDispatch();
  const columnType = addItionalFields[0]?.dataType;
  const isSeparator = columnType === AdditionalFieldsDataTypes.SEPARATOR;
  const [confirmationPopupId, setConfirmationPopupId] = useState<Nullable<number>>(null);
  const [popupInfo, setPopupInfo] = useState<Nullable<PopupInfo>>(null);
  const { control } = useFormContext();

  const { fields, update, append, remove } = useFieldArray({
    control,
    name: `additionalFields.${tab}.${rowId}.fields`,
  });

  const handleOpenDeleteRowConfirmationModal = () => {
    dispatch(
      addPopupConfig({
        name: PopupNames.DELETE_CONFIRMATION,
        data: {
          tab,
          rowId,
          message: 'Are you sure you want to delete the row?',
        },
        title: 'Delete Row',
        method: PopupFormMethods.DELETE_ROW,
      })
    );
  };

  const handleChange = (id: IdType) => {
    const index = id as number;

    if (index > fields.length) {
      append(getAddedFields(index, fields));
    } else {
      remove(getRemovedFieldsIds(index, fields));
    }
  };

  const handleShowPopup = (info: PopupInfo) => {
    setPopupInfo(info);
  };

  const handleHidePopup = () => {
    setPopupInfo(null);
  };

  const handleOpenDeleteColumnConfirmationModal = (columnId: number) => {
    setConfirmationPopupId(columnId);
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationPopupId(null);
  };

  const handleDeleteAdditionalField = () => {
    update(confirmationPopupId as number, { dataType: null });
    handleCloseConfirmationModal();
  };

  const handleUpdateAdditionalField = (field: Partial<IAdditionalFieldItem>) => {
    update(popupInfo?.id as number, { ...field });
    handleHidePopup();
  };

  const getItems = useMemo(() => {
    const sumOfRowFields = getSumOfRowFields(fields);

    const items = [];

    for (let i = 1; i <= 3; i++) {
      if (sumOfRowFields <= i) {
        items.push({
          id: i,
          text: <Icon name={`ic_${i}_culumn`} />,
        });
      }
    }

    return items;
  }, [fields]);

  return (
    <div className={styles.row}>
      <div
        className={classNames(styles.row_configs, {
          [styles.row_configs_wsp as string]: isSeparator,
        })}
      >
        <Button color="typography" isSquare ghost>
          <Icon name="ic_reorder" />
        </Button>
        {columnType !== AdditionalFieldsDataTypes.SEPARATOR && (
          <Popover>
            <Popover.Target>
              <Button color="typography" isSquare ghost>
                <Icon name="ic_settings" />
              </Button>
            </Popover.Target>
            <Popover.Content>
              <SwitcherComponent
                className={styles.columns_setter}
                handleChange={handleChange}
                value={fields.length}
                items={getItems}
                color="success"
              />
            </Popover.Content>
          </Popover>
        )}
      </div>
      <div className={styles.columns_content}>
        {fields.map((item: Record<string, any>, index) => (
          <LAdditionalField
            handleOpenDeleteColumnConfirmationModal={handleOpenDeleteColumnConfirmationModal}
            handleShowPopup={handleShowPopup}
            key={item.id}
            index={index}
            item={item}
          />
        ))}
        {!!popupInfo && (
          <LAdditionalFieldPopupContentView
            handleUpdateAdditionalField={handleUpdateAdditionalField}
            handleHidePopup={handleHidePopup}
            popupInfo={popupInfo}
          />
        )}
        {confirmationPopupId !== null && (
          <ConfirmationModal
            onCancel={handleCloseConfirmationModal}
            onAccept={handleDeleteAdditionalField}
            type={ConfirmationModalType.Deletion}
            title="Delete Column"
            id="deletion-modal"
            isOpen
          >
            Are you sure you want to delete the column?
          </ConfirmationModal>
        )}
      </div>
      <div
        className={classNames(styles.row_configs_right, {
          [styles.row_configs_right_wsp as string]: isSeparator,
        })}
      >
        <Button onClick={handleOpenDeleteRowConfirmationModal} color="error" isSquare ghost>
          <Icon name="ic_delete" />
        </Button>
      </div>
    </div>
  );
};

export default LAdditionalFieldsRow;
