// eslint-disable-next-line max-len
import type { IDepartmentItem } from '../components/DepartmentsTBodyView/DepartmentsTBodyViewTypes';

import type { MinistryType } from '../store/types';

const ministryDepartments: Array<IDepartmentItem> = [
  {
    address: 'adr',
    addressTranslated: 'adr_ar',
    code: 'DPA1',
    description: 'nam',
    descriptionTranslated: 'nam_ar',
    email: 'eml',
    import: false,
    export: true,
  },
  {
    address: 'adr',
    addressTranslated: 'adr_ar',
    code: 'DPA2',
    description: 'nam',
    descriptionTranslated: 'nam_ar',
    email: 'eml',
    import: true,
    export: true,
  },
];

export const ministriesCollector = (data: Array<MinistryType>) => {
  data.forEach((item: MinistryType) => {
    item.ministryDepartments = ministryDepartments;

    if (!item?.opened) {
      item.opened = false;
    }
  });

  return data;
};
