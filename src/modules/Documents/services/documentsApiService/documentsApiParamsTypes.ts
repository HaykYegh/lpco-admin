export interface IDocumentsParams {
  offset?: number;
  limit?: number;
  searchByDocumentCode?: string;
  searchByMinistryCode?: string;
  searchByLicenseType?: string;
  getInRim?: boolean;
}

export interface IDocumentParams {
  code: string;
  ministryCode?: string;
  departmentCode?: string;
  licenseTypeNature?: string;
}

export interface IAttachedDocumentParams {
  code: string;
  validFromDate: string;
}
