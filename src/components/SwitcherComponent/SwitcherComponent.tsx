import type { FC } from 'react';

import { type IdType } from '@wf/components/dist/components/FormElements/Switcher/Switcher';
import { Icon, Switcher } from '@wf/components';

import type { ISwitcherComponentProps, SwitcherItemType } from './SwitcherComponentTypes';

import styles from './SwitcherComponent.module.scss';

const SwitcherComponent: FC<ISwitcherComponentProps> = ({
  className = '',
  size,
  color,
  label,
  handleChange,
  value,
  viewModeValue,
  items,
  disabled,
}) => (
  <Switcher
    label={
      <div className={styles.icon_content}>
        {label?.text}
        {label?.icon && <Icon name={label.icon} />}
      </div>
    }
    onChange={handleChange ?? ((option: IdType) => option)}
    viewModeValue={viewModeValue}
    className={className}
    size={size ?? 'md'}
    disabled={disabled}
    color={color}
    value={value}
  >
    {items.map((item: SwitcherItemType) => (
      <Switcher.Item key={item.id} id={item.id} rightIcon={item.rIcon ? <Icon name={item.rIcon} size={20} /> : null}>
        {item.text}
      </Switcher.Item>
    ))}
  </Switcher>
);

export default SwitcherComponent;
