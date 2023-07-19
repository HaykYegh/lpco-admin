export interface IGetLicenseTypeHeaderActionsParams {
  type?: string;
  code?: string;
  eov?: string | null;
  handleSubmit?: () => Promise<void>;
  handleCancel?: () => void;
}
