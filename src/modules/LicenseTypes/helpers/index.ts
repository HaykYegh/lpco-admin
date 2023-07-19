import { type IRowContent } from '../components/LicenseAdditionalFieldsView/LAdditionalFieldSectionView/LAdditionalFieldSectionViewTypes';
import { type ColorType, HeaderItems } from '../../../components/HeaderComponent/HeaderComponentTypes';
import type { IGetLicenseTypeHeaderActionsParams } from './helpersParamsTypes';
import { type additionalFieldsState } from '../store/initialState';
import { appPaths } from '../../../constatnts/appPaths';

import {
  type AdditionalFields,
  type IAdditionalFieldItem,
  type IAdditionalFieldsState,
  type IApprovalProps,
  type ITransitionItem,
  LTypeModeItems,
} from '../store/types';
import { AdditionalFieldsTabs } from '../constants';

export const getLicenseTypeHeaderActions = ({
  type,
  code,
  eov,
  handleSubmit,
  handleCancel,
}: IGetLicenseTypeHeaderActionsParams) => {
  switch (type) {
    case LTypeModeItems.create:
      return [
        {
          field: HeaderItems.button,
          text: 'Cancel',
          color: 'typography' as ColorType,
          ghost: true,
          name: 'cancel',
          handleSubmit: handleCancel,
        },
        {
          field: HeaderItems.button,
          text: 'Validate',
          color: 'success' as ColorType,
          name: 'validate',
          handleSubmit,
        },
      ];
    case LTypeModeItems.edit:
      return [
        {
          field: HeaderItems.button,
          text: 'Cancel Editing',
          color: 'typography' as ColorType,
          ghost: true,
          name: 'cancel',
          handleSubmit: handleCancel,
        },
        {
          field: HeaderItems.button,
          text: 'Update',
          color: 'success' as ColorType,
          name: 'update',
          handleSubmit,
        },
      ];
    case LTypeModeItems.view:
      return eov === null && code
        ? [
            {
              field: HeaderItems.button,
              text: 'Edit License Type',
              color: 'success' as ColorType,
              name: 'edit',
              link: `${appPaths.licenses}/edit/${code}`,
            },
          ]
        : null;
    default:
      return null;
  }
};

export function getApprovalsWithSortParam(approvals: Array<IApprovalProps>) {
  return approvals.reduce((acc: Array<IApprovalProps>, item: IApprovalProps, index: number) => {
    const transitionsWithSortParams = (item.transitions as ITransitionItem[]).reduce(
      (transArr: Array<ITransitionItem>, el: ITransitionItem, ind: number) => {
        const transObj = {
          ...el,
          departmentLevel: ind + 1,
        };
        transArr.push(transObj);

        return transArr;
      },
      []
    );

    const approvalObj = {
      ...item,
      rank: index + 1,
      transitions: transitionsWithSortParams,
    };
    acc.push(approvalObj);

    return acc;
  }, []);
}

export const getAddedFields = (columnQuantity: number, fields: Record<string, any>) => {
  const addedFields: Partial<IAdditionalFieldItem>[] = [];

  for (let i = 0; i < columnQuantity - fields.length; i++) {
    addedFields.push({ dataType: null });
  }

  return addedFields;
};

export const getRemovedFieldsIds = (columnQuantity: number, fields: Record<string, any>[]) =>
  fields.reduce((acc: number[], item: Record<string, any>, currentIndex: number) => {
    if (item.dataType === null && acc.length < fields.length - columnQuantity) {
      acc.push(currentIndex);
    }

    return acc;
  }, []);

export const getSumOfRowFields = (fields: Record<string, any>[]) =>
  fields.reduce((acc: number, item: Record<string, any>) => {
    if (item.dataType !== null) {
      acc++;
    }

    return acc;
  }, 0);

export const combineAdditionalFieldsStateData = (additionalFields: IAdditionalFieldItem[]) =>
  additionalFields.reduce(
    (acc: Record<string, any>, item: IAdditionalFieldItem) => {
      const tab = item.tab as keyof typeof AdditionalFieldsTabs;

      if (!acc[tab][item.rowNumber - 1]) {
        acc[tab][item.rowNumber - 1] = { fields: [] };
      }

      acc[tab][item.rowNumber - 1].fields[item.positionInRow - 1] = item;

      return acc;
    },
    {
      [AdditionalFieldsTabs.HEADER]: [{ fields: [{ dataType: null, tab: AdditionalFieldsTabs.HEADER }] }],
      [AdditionalFieldsTabs.NAMES_AND_PARTIES]: [
        { fields: [{ dataType: null, tab: AdditionalFieldsTabs.NAMES_AND_PARTIES }] },
      ],
      [AdditionalFieldsTabs.ITEM]: [{ fields: [{ dataType: null, tab: AdditionalFieldsTabs.ITEM }] }],
      [AdditionalFieldsTabs.ATTACHED_DOCUMENT]: [
        { fields: [{ dataType: null, tab: AdditionalFieldsTabs.ATTACHED_DOCUMENT }] },
      ],
      [AdditionalFieldsTabs.BENEFICIARY]: [{ fields: [{ dataType: null, tab: AdditionalFieldsTabs.BENEFICIARY }] }],
    }
  );

export const combineAdditionalFieldsAPIData = (additionalFields: IAdditionalFieldsState) =>
  Object.keys(additionalFields).reduce((acc: Partial<IAdditionalFieldItem>[], item: string) => {
    const fieldsRows = additionalFields[item as keyof typeof additionalFieldsState];
    const additionalFieldsData = fieldsRows.reduce(
      (currentData: Partial<IAdditionalFieldItem>[], el: AdditionalFields, index: number) => {
        const fields = el.fields;
        const emptyColumnsPositions: number[] = [];
        const data = fields.reduce((currentFields: Partial<IAdditionalFieldItem>[], field, id: number) => {
          if (field.dataType !== null) {
            const rowNumber = index + 1;
            const positionInRow = id + 1 - emptyColumnsPositions.length;
            // this code need to be changed, when will be ready additional fields forms
            currentFields.push({
              ...field,
              tab: item,
              rowNumber,
              positionInRow,
              englishLabel: `englishLabel_${rowNumber}_${positionInRow}`,
              nationalLanguageLabel: `nationalLanguageLabel_${rowNumber}_${positionInRow}`,
              textAreaHeight: 9,
              fieldUILength: 9,
              listOfOptions: 'string',
            });
          } else {
            emptyColumnsPositions.push(id + 1);
          }

          return currentFields;
        }, []);

        return [...currentData, ...data];
      },
      []
    );

    return [...acc, ...additionalFieldsData];
  }, []);

export const getFieldsQuantity = (rows: IRowContent[]) =>
  rows.reduce((acc: number, item: IRowContent) => {
    const rowFieldsQuantity = item.fields.reduce((currentValue: number, el: IAdditionalFieldItem) => {
      if (el.dataType !== null) {
        currentValue++;
      }

      return currentValue;
    }, 0);

    acc = acc + rowFieldsQuantity;

    return acc;
  }, 0);
