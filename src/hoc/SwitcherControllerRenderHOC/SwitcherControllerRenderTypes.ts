import type { Size, SwitcherItemType } from '../../components/SwitcherComponent/SwitcherComponentTypes';
import type { ColorType } from '../../components/HeaderComponent/HeaderComponentTypes';

export interface ISwitcherControllerRender {
  viewMode: boolean;
  color?: ColorType;
  size?: Size;
  items?: Array<SwitcherItemType>;
  className?: string;
}
