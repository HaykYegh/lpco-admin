import type { LegacyRef } from 'react';

export interface ILPStampSectionViewProps {
  sigAndStampsNameValue: string;
  singleInputRef: LegacyRef<HTMLInputElement> | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileDrop: (e: React.DragEvent<HTMLInputElement>) => void;
  handleChooseFile: () => void;
  handleDeleteFile: () => void;
}
