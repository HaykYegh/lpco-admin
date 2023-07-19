import type { UseFormReturn } from 'react-hook-form';

import type { ITransitionItem } from '../../../../store/types';

export interface ILWTransitionPopupViewProps {
  type?: string;
  form?: UseFormReturn;
  transitionItemChangeMethod: string;
  showPopup: boolean;
  handleCreateTransition: (data: Record<string, keyof ITransitionItem>) => void;
  handleUpdateTransition: (data: Record<string, keyof ITransitionItem>) => void;
  handleClosePopup: () => void;
}
