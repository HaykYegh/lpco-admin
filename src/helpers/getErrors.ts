import { toasterEmitter } from '@wf/components';

import { getErrorDescription } from './getErrorDescription';

export function getErrors(errors: Array<IErrorItem>) {
  errors.forEach((item: IErrorItem) => {
    toasterEmitter({
      title: 'Error Message',
      status: 'error',
      description: getErrorDescription(item),
    });
  });
}
