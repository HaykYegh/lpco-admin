import type { FC } from 'react';

import { type IdType } from '@wf/components/dist/components/FormElements/Switcher/Switcher';

import TabContentSection from '../../../../../components/TabContentSection';
import SwitcherComponent from '../../../../../components/SwitcherComponent';
import type { ILPConfSectionViewProps } from './LPConfSectionViewType';
import SectionBody from '../../../../../components/SectionBody';
import LPConfSectionViewTexts from './LPConfSectionViewTexts';
import SectionRow from '../../../../../components/SectionRow';

import { LTypeModeItems } from '../../../store/types';
import { printoutConfEnum } from '../../../constants';

import { onOffItems } from '../../../../../constatnts';

import styles from './LPConfSectionView.module.scss';

const LPConfSectionView: FC<ILPConfSectionViewProps> = ({
  storedEnabled,
  queriedEnabled,
  pendingPaymentEnabled,
  requestedEnabled,
  partiallyApproveEnabled,
  approvedEnabled,
  partiallyUseEnabled,
  usedEnabled,
  suspendedEnabled,
  expiredEnabled,
  rejectedEnabled,
  canceledEnabled,
  generatedEnabled,
  handlePrintoutConfigChange,
  type,
}) => {
  const viewMode = type === LTypeModeItems.view;

  return (
    <TabContentSection title={LPConfSectionViewTexts.TITLE_TEXT}>
      <SectionBody>
        <SectionRow className={styles.lpconf_section_row_item}>
          <SwitcherComponent
            label={{
              text: LPConfSectionViewTexts.STORED_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handlePrintoutConfigChange(option, printoutConfEnum.STORED)}
            value={storedEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
          <SwitcherComponent
            label={{
              text: LPConfSectionViewTexts.QUERIED_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handlePrintoutConfigChange(option, printoutConfEnum.QUERIED)}
            value={queriedEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
          <SwitcherComponent
            label={{
              text: LPConfSectionViewTexts.PENDING_PAYMENT_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handlePrintoutConfigChange(option, printoutConfEnum.PENDING_PAYMENT)}
            value={pendingPaymentEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
        </SectionRow>
        <SectionRow className={styles.lpconf_section_row_item}>
          <SwitcherComponent
            label={{
              text: LPConfSectionViewTexts.REQUESTED_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handlePrintoutConfigChange(option, printoutConfEnum.REQUESTED)}
            value={requestedEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
          <SwitcherComponent
            label={{
              text: LPConfSectionViewTexts.PARTIALLY_APPROVED_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handlePrintoutConfigChange(option, printoutConfEnum.PARTIALLY_APPROVE)}
            value={partiallyApproveEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
          <SwitcherComponent
            label={{
              text: LPConfSectionViewTexts.APPROVED_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handlePrintoutConfigChange(option, printoutConfEnum.APPROVED)}
            value={approvedEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
        </SectionRow>
        <SectionRow className={styles.lpconf_section_row_item}>
          <SwitcherComponent
            label={{
              text: LPConfSectionViewTexts.PARTIALLY_USE_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handlePrintoutConfigChange(option, printoutConfEnum.PARTIALLY_USE)}
            value={partiallyUseEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
          <SwitcherComponent
            label={{
              text: LPConfSectionViewTexts.USED_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handlePrintoutConfigChange(option, printoutConfEnum.USED)}
            value={usedEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
          <SwitcherComponent
            label={{
              text: LPConfSectionViewTexts.SUSPENDED_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handlePrintoutConfigChange(option, printoutConfEnum.SUSPENDED)}
            value={suspendedEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
        </SectionRow>
        <SectionRow className={styles.lpconf_section_row_item}>
          <SwitcherComponent
            label={{
              text: LPConfSectionViewTexts.EXPIRED_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handlePrintoutConfigChange(option, printoutConfEnum.EXPIRED)}
            value={expiredEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
          <SwitcherComponent
            label={{
              text: LPConfSectionViewTexts.REJECTED_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handlePrintoutConfigChange(option, printoutConfEnum.REJECTED)}
            value={rejectedEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
          <SwitcherComponent
            label={{
              text: LPConfSectionViewTexts.CANCELED_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handlePrintoutConfigChange(option, printoutConfEnum.CANCELED)}
            value={canceledEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
        </SectionRow>
        <SectionRow>
          <SwitcherComponent
            label={{
              text: LPConfSectionViewTexts.GENERATE_TEXT,
              icon: 'il_info',
            }}
            handleChange={(option: IdType) => handlePrintoutConfigChange(option, printoutConfEnum.GENERATED)}
            value={generatedEnabled}
            disabled={viewMode}
            items={onOffItems}
            color="success"
          />
        </SectionRow>
      </SectionBody>
    </TabContentSection>
  );
};

export default LPConfSectionView;
