import type { FC } from 'react';

import { Button, color, Icon } from '@wf/components';

import type { IFlexableButton } from './FlexableButtonType';
import { buttonTypes } from './FlexableButtonType';

const FlexableButton: FC<IFlexableButton> = ({ type, handleClick }) => {
  const getIconName = (icType: string) => {
    switch (icType) {
      case buttonTypes.edit:
        return 'ic_edit';
      case buttonTypes.delete:
        return 'ic_delete';
      case buttonTypes.update:
        return 'ic_check';
      default:
        return 'ic_close';
    }
  };

  const updateIcon = type === 'ic_check';

  return (
    <Button secondary={!updateIcon} color="success" onClick={handleClick} isSquare>
      <Icon name={getIconName(type)} size={17} color={updateIcon ? '#ffffff' : color('typography', 'light')} />
    </Button>
  );
};

export default FlexableButton;
