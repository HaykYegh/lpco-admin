import type { RootState } from '../../../store';

export const licenseTypesSelector = (state: RootState) => state.licenseTypes;
export const licenseTypeSelector = (state: RootState) => state.licenseTypes.licenseTypeByCode;
export const feesSelector = (state: RootState) => state.licenseTypes.fees;
export const feesForEditSelector = (state: RootState) => state.licenseTypes.feesForEdit;
export const licenseTypeAprovalsByCodeSelector = (state: RootState) => state.licenseTypes.licenseTypeAprovalsByCode;
export const licenseTypeAttDocumentsByCodeSelector = (state: RootState) =>
  state.licenseTypes.licenseTypeAttDocumentsByCode;
export const licenseTypeFeesByCodeSelector = (state: RootState) => state.licenseTypes.licenseTypeFeesByCode;
export const licenseTypeFeesForExtendByCodeSelector = (state: RootState) =>
  state.licenseTypes.licenseTypeFeesForExtendByCode;
export const licenseTypeApTransitionsByCodeSelector = (state: RootState) =>
  state.licenseTypes.licenseTypeApTransitionsByCode;
export const licenseTypeFeatureFlagsSelector = (state: RootState) => state.licenseTypes.licenseTypeFeatureFlagsByCode;
export const licenseErrorMessagesSelector = (state: RootState) => state.licenseTypes.licenseTypeErrors;
export const licenseTypeAdditionalFieldsByCodeSelector = (state: RootState) =>
  state.licenseTypes.licenseTypeAdditionalFieldsByCode;

export const transitionItemParamsSelector = (state: RootState) => state.licenseTypes.transitionItemParams;
export const transitionItemParamsShowSelector = (state: RootState) => state.licenseTypes.transitionItemParams.show;
export const transitionItemParamsDataSelector = (state: RootState) => state.licenseTypes.transitionItemParams.data;
export const transitionItemParamsDataPIdSelector = (state: RootState) =>
  state.licenseTypes.transitionItemParams.dataParentId;
export const transitionItemParamsMethodSelector = (state: RootState) => state.licenseTypes.transitionItemParams.method;
export const sendingDataSelector = (state: RootState) => state.licenseTypes.sendingData;
