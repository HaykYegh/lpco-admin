import { type IdType } from '@wf/components/dist/components/FormElements/Switcher/Switcher';

export interface ILPConfSectionViewProps {
  storedEnabled: number;
  queriedEnabled: number;
  pendingPaymentEnabled: number;
  requestedEnabled: number;
  partiallyApproveEnabled: number;
  approvedEnabled: number;
  partiallyUseEnabled: number;
  usedEnabled: number;
  suspendedEnabled: number;
  expiredEnabled: number;
  rejectedEnabled: number;
  canceledEnabled: number;
  generatedEnabled: number;
  handlePrintoutConfigChange: (option: IdType, name: string) => void;
  type?: string;
}
