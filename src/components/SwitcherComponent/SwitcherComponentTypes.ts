import { type ReactElement } from 'react';

import { type IdType } from '@wf/components/dist/components/FormElements/Switcher/Switcher';

import type { ColorType } from '../HeaderComponent/HeaderComponentTypes';

export type Size = 'sm' | 'md' | 'lg' | 'auto';

export interface ISwitcherComponentProps {
  className?: string;
  size?: Size;
  color?: ColorType;
  label?: SwitcherLabelType;
  handleChange?: (option: IdType) => void;
  value?: IdType;
  viewModeValue?: string;
  items: Array<SwitcherItemType>;
  disabled?: boolean;
}

export type SwitcherLabelType = {
  text?: string;
  icon?: string;
};

export type SwitcherItemType = {
  id: IdType;
  text: string | ReactElement;
  rIcon?: string;
};
