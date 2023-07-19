import { createEntityAdapter, type EntityAdapter, type EntityId } from '@reduxjs/toolkit';

import { type LicenseType } from './types';

import type { IApprovalAdItem, IAttachedDocumentItem, IFeeItem, ISameErrorFieldsItem, ITransitionItem } from './types';

export const approvalsAdapter: EntityAdapter<IApprovalAdItem> = createEntityAdapter<IApprovalAdItem>({
  selectId: (approval: IApprovalAdItem) => approval.id as EntityId,
});

export const transitionsAdapter: EntityAdapter<ITransitionItem> = createEntityAdapter<ITransitionItem>({
  selectId: (transition: ITransitionItem) => transition.id as EntityId,
});

export const documentsAdapter: EntityAdapter<IAttachedDocumentItem> = createEntityAdapter<IAttachedDocumentItem>({
  selectId: (document: IAttachedDocumentItem) => document.id as EntityId,
});

export const feesAdapter: EntityAdapter<IFeeItem> = createEntityAdapter<IFeeItem>({
  selectId: (fee) => fee.id as EntityId,
});

export const feesAdapterForExtend: EntityAdapter<IFeeItem> = createEntityAdapter<IFeeItem>({
  selectId: (fee: IFeeItem) => fee.id as EntityId,
});

export const lTypeErrorsAdapter: EntityAdapter<ISameErrorFieldsItem> = createEntityAdapter<ISameErrorFieldsItem>({
  selectId: (error: ISameErrorFieldsItem) => error.field as EntityId,
});

export const lTypeAdapter: EntityAdapter<LicenseType> = createEntityAdapter<LicenseType>({
  selectId: (license: LicenseType) => license.id,
});

export const historizedLTypeAdapter: EntityAdapter<LicenseType> = createEntityAdapter<LicenseType>({
  selectId: (license: LicenseType) => license.id,
});
