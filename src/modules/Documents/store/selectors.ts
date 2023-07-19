import type { RootState } from '../../../store';

export const documentsSelector = (state: RootState) => state.documents;
export const documentSelector = (state: RootState) => state.documents.documentByCode;
export const notSpecifiedDocumentsSelector = (state: RootState) => state.documents.notSpecifiedDocuments;
export const notSpecifiedDocumentsCountSelector = (state: RootState) => state.documents.notSpecifiedDocumentsCount;
export const notSpecifiedDocumentsCodesSelector = (state: RootState) => state.documents.notSpecifiedDocumentsCodes;
export const notSpecifiedDocumentSelector = (state: RootState) => state.documents.notSpecifiedDocumentByCode;
export const specifyDocumentLoadingSelector = (state: RootState) => state.documents.specifyDocumentLoading;
