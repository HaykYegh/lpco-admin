import { Controller, type UseFormReturn } from 'react-hook-form';
import type { FC, MouseEventHandler } from 'react';

import { Button, Input } from '@wf/components';

import type { ILWTransitionPopupViewProps } from './LWTransitionPopupContentViewType';
import LWTransitionPopupContentViewTexts from './LWTransitionPopupContentViewTexts';
import SwitcherComponent from '../../../../../../components/SwitcherComponent';
import LabelComponent from '../../../../../../components/LabelComponent';
import SectionBody from '../../../../../../components/SectionBody';
import SectionRow from '../../../../../../components/SectionRow';
import Popup from '../../../../../../components/Popup';

import { LTypeModeItems, transitionItemChangeMethods } from '../../../../store/types';

import { onOffItems } from '../../../../../../constatnts';

import styles from './LWTransitionPopupContentView.module.scss';

const LWTransitionPopupContentView: FC<ILWTransitionPopupViewProps> = ({
  type,
  form,
  transitionItemChangeMethod,
  showPopup,
  handleCreateTransition,
  handleUpdateTransition,
  handleClosePopup,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form as UseFormReturn;
  const viewMode = type === LTypeModeItems.view;

  return (
    <Popup showPopup={showPopup} handleClosePopup={handleClosePopup} title="Add New Approval">
      <div className={styles.content}>
        <div className={styles.content_body}>
          <SectionBody>
            <SectionRow className={styles.lwtr_section_row_item}>
              <Input
                label={
                  <LabelComponent icon="il_info">{`${LWTransitionPopupContentViewTexts.OPERATION_NAME}*`}</LabelComponent>
                }
                errorMessage={errors?.operationName?.message as string}
                disabled={viewMode}
                {...register('operationName')}
              />
              <Input
                label={
                  <LabelComponent icon="il_info">{`${LWTransitionPopupContentViewTexts.OPERATION_NAME_IN_NL}*`}</LabelComponent>
                }
                errorMessage={errors?.operationNameInNationalLang?.message as string}
                disabled={viewMode}
                {...register('operationNameInNationalLang')}
              />
            </SectionRow>
            <SectionRow className={styles.lwtr_section_row_item}>
              <Input
                label={
                  <LabelComponent icon="il_info">{`${LWTransitionPopupContentViewTexts.OPERATION_STATUS}*`}</LabelComponent>
                }
                errorMessage={errors?.operationStatus?.message as string}
                disabled={viewMode}
                {...register('operationStatus')}
              />
              <Input
                label={
                  <LabelComponent icon="il_info">{`${LWTransitionPopupContentViewTexts.OPERATION_STATUS_IN_NL}*`}</LabelComponent>
                }
                errorMessage={errors?.operationStatusInNationalLang?.message as string}
                disabled={viewMode}
                {...register('operationStatusInNationalLang')}
              />
            </SectionRow>
            <SectionRow className={styles.lwtr_section_row_item}>
              <Input
                label={
                  <LabelComponent icon="il_info">{LWTransitionPopupContentViewTexts.OPERATION_RETURN}</LabelComponent>
                }
                placeholder={LWTransitionPopupContentViewTexts.OPERATION_RETURN_PLACEHOLDER}
                disabled={viewMode}
                {...register('reRoute')}
              />
              <Controller
                render={({ field: { onChange, value } }) => (
                  <SwitcherComponent
                    label={{
                      text: LWTransitionPopupContentViewTexts.OPERATION_CAN_REJECT,
                      icon: 'il_info',
                    }}
                    handleChange={onChange}
                    disabled={viewMode}
                    items={onOffItems}
                    color="success"
                    value={+value}
                  />
                )}
                name="isRejectOpEnabled"
                control={control}
              />
            </SectionRow>
          </SectionBody>
        </div>
        <div className={styles.content_footer}>
          <Button
            onClick={
              handleSubmit(
                transitionItemChangeMethod === transitionItemChangeMethods.EDIT
                  ? handleUpdateTransition
                  : handleCreateTransition
              ) as MouseEventHandler
            }
            color="success"
          >
            {transitionItemChangeMethod === transitionItemChangeMethods.EDIT
              ? LWTransitionPopupContentViewTexts.OPERATION_EDIT_BUTTON_TEXT
              : LWTransitionPopupContentViewTexts.OPERATION_ADD_BUTTON_TEXT}
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default LWTransitionPopupContentView;
