import { type FC, useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

import type { IFilterItem } from '../../../../components/TableComponent/TableComponentTypes';
import { FilterItems } from '../../../../components/TableComponent/TableComponentTypes';
import MinistriesTBodyView from '../../components/MinistriesTBodyView';
import ContentContainer from '../../../../components/ContentContainer';
import HeaderComponent from '../../../../components/HeaderComponent';
import MinistriesTexts from './MinistriesTexts';

import type { MinistriesState, MinistryType } from '../../store/types';
import { ministriesSelector } from '../../store/selectors';
import { PAGINATION_LIMIT } from '../../../../constatnts';
import { getMinistriesApi } from '../../store/actions';
import { setMinistries } from '../../store/slices';

import styles from './Ministries.module.scss';

const Ministries: FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const state: MinistriesState = useSelector(ministriesSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMinistriesApi({ limit: PAGINATION_LIMIT, offset: 0, searchValue }));
  }, [searchValue, dispatch]);

  const handleFilterChange = useCallback(
    ({ currentTarget: { value } }: { currentTarget: { value: string } }) => {
      setSearchValue(value);
    },
    [setSearchValue]
  );

  const tableFilterItems: Array<IFilterItem<SelectBaseOption>> = [
    {
      field: FilterItems.input,
      placeholder: MinistriesTexts.MINISTRY_FILTER_PLACEHOLDER,
      onChange: handleFilterChange,
      value: searchValue,
      name: 'ministryCode',
    },
  ];

  const toggleTable = (code: string) => {
    const newData: Array<MinistryType> = [...state.data];
    const data = newData.map((item) => {
      if (item.code === code) {
        item = {
          ...item,
          opened: !item.opened,
        };
      }

      return item;
    });
    dispatch(setMinistries?.(data));
  };

  const handlePageChange = (page: number) => {
    dispatch(getMinistriesApi?.({ limit: PAGINATION_LIMIT, offset: (page - 1) * PAGINATION_LIMIT, searchValue }));
  };

  return (
    <div className={styles.container}>
      <HeaderComponent title={MinistriesTexts.MINISTRIES_HEADER_TITLE} />
      <ContentContainer>
        <div className={styles.table_container}>
          <MinistriesTBodyView
            emptyDataText={MinistriesTexts.MINISTRIES_EMPTY_DATA_DESCRIPTION}
            emptyDataTitle={MinistriesTexts.MINISTRIES_EMPTY_DATA_TITLE}
            tableFilterItems={tableFilterItems}
            handlePageChange={handlePageChange}
            toggleTable={toggleTable}
            dataCount={state.count}
            data={state.data}
          />
        </div>
      </ContentContainer>
    </div>
  );
};

export default Ministries;
