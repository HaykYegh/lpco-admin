import type { FC } from 'react';

import { DatePicker, Input, Select, Table } from '@wf/components';

import type { IFItemProps } from './TableComponentTypes';
import { FilterItems } from './TableComponentTypes';

import styles from './TableComponent.module.scss';

const FItems: FC<IFItemProps> = ({ filterItems }) => (
  <Table.Search className={styles.filters_content}>
    {filterItems?.map((item, index) => {
      switch (item.field) {
        case FilterItems.input:
          return (
            <div className={styles.filters_item} key={index}>
              <Input onChange={item.onChange} placeholder={item.placeholder} value={item.value} />
            </div>
          );
        case FilterItems.select:
          return (
            <div className={styles.filters_item} key={index}>
              <Select
                onInputChange={item.onInputChange}
                placeholder={item.placeholder}
                onChange={item.selectChange}
                inputValue={item.inputValue}
                value={item.selectValue}
                options={item.options}
                name={item.name}
                errorMessage=""
                isClearable
              />
            </div>
          );
        case FilterItems.datepicker:
          return (
            <div className={styles.filters_item} key={index}>
              <DatePicker
                onChange={
                  item.datePickerChange ??
                  function datePickerChange() {
                    console.log('datePickerChange');
                  }
                }
                placeholderText={item.placeholder}
                className={styles.date_picker}
                value={item.datePickerValue}
                format="dd - mm - yyyy"
                isClearable
              />
            </div>
          );
        default:
          return null;
      }
    })}
  </Table.Search>
);

export default FItems;
