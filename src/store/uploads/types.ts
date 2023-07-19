import type { Dictionary, EntityId } from '@reduxjs/toolkit';

export type UploadsState = {
  data: IUploadsEntityProps;
};

export interface IUploadsEntityProps {
  entities: Dictionary<IUploadItem>;
  ids: EntityId[];
}

export interface IUploadItem {
  fieldName: string;
  uploadedFileName: string;
  isNotUploadedYet?: boolean;
}

export type GetUploadParamsPayload = {
  url: string;
  fieldName: string;
  formData: FormData;
};

export enum fileTypesEnum {
  JPG = 'JPG',
  JPEG = 'JPEG',
  PNG = 'PNG',
  GIF = 'GIF',
}
