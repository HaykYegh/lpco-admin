import { Controller, type UseFormReturn } from 'react-hook-form';
import type { FC } from 'react';

import { Table } from '@wf/components';

import type {
  ILIFItemOperationSectionViewProps,
  LIFItemOperationTHeaderItemType,
} from './LIFItemOperationSectionViewType';
import SwitcherControllerRenderHOC from '../../../../../hoc/SwitcherControllerRenderHOC';
import LIFItemOperationSectionViewTexts from './LIFItemOperationSectionViewTexts';
import TabContentSection from '../../../../../components/TabContentSection';
import TableComponent from '../../../../../components/TableComponent';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';

import { LTypeModeItems } from '../../../store/types';

import styles from './LIFItemOperationSectionView.module.scss';

const tableHeaders: Array<LIFItemOperationTHeaderItemType> = [
  { name: LIFItemOperationSectionViewTexts.ACTIONS_NAME, flex: 1 },
  { name: LIFItemOperationSectionViewTexts.ENABLE_ON_QUERIED, flex: 1 },
  { name: LIFItemOperationSectionViewTexts.ENABLE_ON_OGA_EDIT, flex: 1 },
];

const LIFItemOperationSectionView: FC<ILIFItemOperationSectionViewProps> = ({ form }) => {
  const { type } = useTypeInPath();
  const { control } = form as UseFormReturn;
  const viewMode = type === LTypeModeItems.view;
  const render = SwitcherControllerRenderHOC({ viewMode, size: 'sm' });

  return (
    <TabContentSection title={LIFItemOperationSectionViewTexts.TITLE_TEXT}>
      <TableComponent tableHeaders={tableHeaders}>
        <Table.Row>
          <Table.Cell>{LIFItemOperationSectionViewTexts.ADD_ITEM_TEXT}</Table.Cell>
          <Table.Cell className={styles.switcher_cell}>
            <Controller control={control} name="addItemOnQueriedEnabled" render={render} />
          </Table.Cell>
          <Table.Cell className={styles.switcher_cell}>
            <Controller control={control} name="addItemOnOgaEditEnabled" render={render} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{LIFItemOperationSectionViewTexts.EDIT_ITEM_TEXT}</Table.Cell>
          <Table.Cell className={styles.switcher_cell}>
            <Controller control={control} name="editItemOnQueriedEnabled" render={render} />
          </Table.Cell>
          <Table.Cell className={styles.switcher_cell}>
            <Controller control={control} name="editItemOnOgaEditEnabled" render={render} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{LIFItemOperationSectionViewTexts.DELETE_ITEM_TEXT}</Table.Cell>
          <Table.Cell className={styles.switcher_cell}>
            <Controller control={control} name="deleteItemOnQueriedEnabled" render={render} />
          </Table.Cell>
          <Table.Cell className={styles.switcher_cell}>
            <Controller control={control} name="deleteItemOnOgaEditEnabled" render={render} />
          </Table.Cell>
        </Table.Row>
      </TableComponent>
    </TabContentSection>
  );
};

export default LIFItemOperationSectionView;
