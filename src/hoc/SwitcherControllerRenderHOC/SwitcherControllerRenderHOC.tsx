import type { ISwitcherControllerRender } from './SwitcherControllerRenderTypes';
import SwitcherComponent from '../../components/SwitcherComponent';
import type { IControllerField } from '../../@types/formTypes';

import { onOffItems } from '../../constatnts';

const SwitcherControllerRenderHOC = ({
  viewMode,
  color = 'success',
  size = 'md',
  items = onOffItems,
  className,
}: ISwitcherControllerRender) => {
  const SwitcherRender = ({ field: { onChange, value } }: { field: IControllerField }) => (
    <SwitcherComponent
      handleChange={onChange}
      className={className}
      disabled={viewMode}
      value={+value}
      color={color}
      items={items}
      size={size}
    />
  );
  const switchPropsObj = {
    viewMode,
    color,
    size,
    items,
    className,
  };
  SwitcherRender.displayName = `SwitcherControllerRenderHOC(${JSON.stringify(switchPropsObj)})`;

  return SwitcherRender;
};

export default SwitcherControllerRenderHOC;
