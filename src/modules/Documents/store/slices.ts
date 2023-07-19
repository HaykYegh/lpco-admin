import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AttachedDocumentType, DocumentsState, DocumentType, GetDocumentApiPayload } from './types';

const initialState = {
  notSpecifiedDocuments: [],
  notSpecifiedDocumentsCodes: [],
  specifiedDocuments: [],
  documentByCode: null,
  notSpecifiedDocumentByCode: null,
  notSpecifiedDocumentsCount: 0,
  specifiedDocumentsCount: 0,
  notSpecifiedDocumentsLoading: false,
  specifiedDocumentsLoading: false,
  specifyDocumentLoading: false,
  documentCodes: [],
} as DocumentsState;

export const documents = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setNotSpecifiedDocuments: (state: DocumentsState, { payload }: PayloadAction<Array<AttachedDocumentType>>) => {
      state.notSpecifiedDocuments = payload;
    },
    setNotSpecifiedDocumentsCodes: (
      state: DocumentsState,
      { payload }: PayloadAction<Array<GetDocumentApiPayload>>
    ) => {
      state.notSpecifiedDocumentsCodes = payload;
    },
    setSpecifiedDocuments: (state: DocumentsState, { payload }: PayloadAction<Array<DocumentType>>) => {
      state.specifiedDocuments = payload;
    },
    setDocument: (state: DocumentsState, { payload }: PayloadAction<DocumentType>) => {
      state.documentByCode = payload;
    },
    setNotSpecifiedDocument: (state: DocumentsState, { payload }: PayloadAction<AttachedDocumentType>) => {
      state.notSpecifiedDocumentByCode = payload;
    },
    setNotSpecifiedDocumentsCount: (state: DocumentsState, { payload }: PayloadAction<number>) => {
      state.notSpecifiedDocumentsCount = payload;
    },
    setSpecifiedDocumentsCount: (state: DocumentsState, { payload }: PayloadAction<number>) => {
      state.specifiedDocumentsCount = payload;
    },
    setNotSpecifiedDocumentsLoading: (state: DocumentsState, { payload }: PayloadAction<boolean>) => {
      state.notSpecifiedDocumentsLoading = payload;
    },
    setSpecifiedDocumentsLoading: (state: DocumentsState, { payload }: PayloadAction<boolean>) => {
      state.specifiedDocumentsLoading = payload;
    },
    setSpecifyDocumentLoading: (state: DocumentsState, { payload }: PayloadAction<boolean>) => {
      state.specifyDocumentLoading = payload;
    },
    setDocumentCodes: (state: DocumentsState, { payload }: PayloadAction<Array<DocumentType>>) => {
      state.documentCodes = payload;
    },
  },
});

export const {
  setNotSpecifiedDocuments,
  setNotSpecifiedDocumentsCodes,
  setSpecifiedDocuments,
  setDocument,
  setNotSpecifiedDocument,
  setNotSpecifiedDocumentsCount,
  setSpecifiedDocumentsCount,
  setNotSpecifiedDocumentsLoading,
  setSpecifiedDocumentsLoading,
  setSpecifyDocumentLoading,
  setDocumentCodes,
} = documents.actions;
