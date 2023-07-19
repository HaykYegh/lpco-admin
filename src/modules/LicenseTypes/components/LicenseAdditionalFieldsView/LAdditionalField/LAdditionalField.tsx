import { Fragment } from 'react';

import classNames from 'classnames';
import type { FC } from 'react';

import { Button, Icon, Popover } from '@wf/components';

import { PopupFormMethods } from '../../../../../store/popupConfigs/types';
import { type ILAdditionalFieldProps } from './LAdditionalFieldTypes';

import { AdditionalFieldsDataTypes, AdditionalFieldsTextsByDataType } from '../../../constants';
import { type IAdditionalFieldItem } from '../../../store/types';

import styles from './LAdditionalField.module.scss';

const LAdditionalField: FC<ILAdditionalFieldProps> = ({
  item,
  index,
  handleShowPopup,
  handleOpenDeleteColumnConfirmationModal,
}) => (
  <Fragment key={item.id}>
    {!!index && <div className={styles.separator} />}
    {item.dataType === null ? (
      <div key={index} className={styles.column}>
        <Popover>
          <Popover.Target>
            <Button leftIcon={<Icon name="ic_add" />} color="primary" ghost>
              Add Field
            </Button>
          </Popover.Target>
          <Popover.Content className={styles.popover_content}>
            {Object.keys(AdditionalFieldsDataTypes)
              .filter((el) => el !== AdditionalFieldsDataTypes.SEPARATOR)
              .map((el) => (
                <Button
                  onClick={() =>
                    handleShowPopup({
                      id: index,
                      mode: PopupFormMethods.CREATE,
                      field: { ...item, dataType: el } as IAdditionalFieldItem,
                    })
                  }
                  color="typography"
                  key={el}
                  ghost
                >
                  {AdditionalFieldsTextsByDataType[el as keyof typeof AdditionalFieldsTextsByDataType]}
                </Button>
              ))}
          </Popover.Content>
        </Popover>
      </div>
    ) : (
      <div className={styles.column}>
        {item?.dataType === AdditionalFieldsDataTypes.SEPARATOR ? (
          <hr className={styles.separator_field} />
        ) : (
          <div className={styles.field}>
            <div className={styles.field_content}>
              <div className={styles.primary_text} />
              <div className={styles.secondary_text}>{item?.dataType}</div>
            </div>
            <div className={styles.field_configs}>
              <Popover placement="bottom-end">
                <Popover.Target>
                  <Button color="primary" isSquare ghost>
                    <Icon name="ic_menu_vert" />
                  </Button>
                </Popover.Target>
                <Popover.Content className={classNames(styles.popover_content, styles.popover_content_small)}>
                  <Button
                    onClick={() =>
                      handleShowPopup({
                        id: index,
                        mode: PopupFormMethods.UPDATE,
                        field: item as IAdditionalFieldItem,
                      })
                    }
                    color="typography"
                    ghost
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleOpenDeleteColumnConfirmationModal(index)} color="typography" ghost>
                    Delete
                  </Button>
                </Popover.Content>
              </Popover>
            </div>
          </div>
        )}
      </div>
    )}
  </Fragment>
);

export default LAdditionalField;
