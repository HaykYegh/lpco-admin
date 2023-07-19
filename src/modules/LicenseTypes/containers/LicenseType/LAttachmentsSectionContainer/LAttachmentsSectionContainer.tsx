import { useCallback, useEffect, useState } from 'react';

import { useForm, type UseFormSetValue } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import type { EntityId } from '@reduxjs/toolkit';
import type { FC } from 'react';

import LAttachmentsSectionView from '../../../components/LicenseAttDocView/LAttachmentsSectionView';
import type { OptionsItemType } from '../../../../../components/TableComponent/TableComponentTypes';
import attachmentValidationSchema from '../../../validationSchemas/attachmentValidationSchema';
import { createOptionsArrayFromData } from '../../../../../helpers/createOptionsArrayFromData';
import { notSpecifiedDocumentsSelector } from '../../../../Documents/store/selectors';
import { getNotSpecifiedDocumentsApi } from '../../../../Documents/store/actions';
import { useTypeInPath } from '../../../../../hooks/useTypeInPath';
import { documentsAdapter } from '../../../store/entityAdapters';

import { attachmentFormDefaultValues } from '../../../constants';

import type { IAttachedDocumentItem, IAttachedDocumentItemForm } from '../../../store/types';
import { licenseTypeAttDocumentsByCodeSelector } from '../../../store/selectors';
import { getProductCodesApi } from '../../../../../store/products/actions';
import { productsSelector } from '../../../../../store/products/selectors';
import { PAGINATION_LIMIT } from '../../../../../constatnts';
import * as slicesActions from '../../../store/slices';

const LAttachmentsSectionContainer: FC = () => {
  const { type } = useTypeInPath();
  const form = useForm({
    resolver: yupResolver(attachmentValidationSchema),
    defaultValues: attachmentFormDefaultValues,
  });

  const { reset, setValue } = form;

  const editForm = useForm({
    resolver: yupResolver(attachmentValidationSchema),
    defaultValues: attachmentFormDefaultValues,
  });
  const { reset: editReset, setValue: editSetValue } = editForm;
  const dispatch = useDispatch();

  const documentsAdapterSelectors = documentsAdapter.getSelectors();
  const [documentSearchValue, setDocumentSearchValue] = useState('');
  const [productCode, setProductCodeValue] = useState('');
  const [documentEditSearchValue, setDocumentEditSearchValue] = useState('');
  const [productEditCode, setProductEditCodeValue] = useState('');
  const documentsData = useSelector(notSpecifiedDocumentsSelector);
  const productsData = useSelector(productsSelector);
  const attachedDocumentsSelector = useSelector(licenseTypeAttDocumentsByCodeSelector);
  const allAttachedDocuments = documentsAdapterSelectors.selectAll(attachedDocumentsSelector);

  useEffect(() => {
    dispatch(
      getNotSpecifiedDocumentsApi({
        limit: PAGINATION_LIMIT,
        offset: 0,
        searchByDocumentCode: documentSearchValue,
        getInRim: true,
      })
    );
  }, [dispatch, documentSearchValue]);

  useEffect(() => {
    dispatch(getProductCodesApi({ code: productCode }));
  }, [dispatch, productCode]);

  useEffect(() => {
    dispatch(
      getNotSpecifiedDocumentsApi({
        limit: PAGINATION_LIMIT,
        offset: 0,
        searchByDocumentCode: documentEditSearchValue,
        getInRim: true,
      })
    );
  }, [dispatch, documentEditSearchValue]);

  useEffect(() => {
    dispatch(getProductCodesApi({ code: productEditCode }));
  }, [dispatch, productEditCode]);

  const handleDocInputChange = useCallback(
    (value: string) => {
      setDocumentSearchValue(value);
    },
    [setDocumentSearchValue]
  );

  const handleEditDocInputChange = useCallback(
    (value: string) => {
      setDocumentEditSearchValue(value);
    },
    [setDocumentEditSearchValue]
  );

  const handleCancelAttachment = () => {
    editReset(attachmentFormDefaultValues);
  };

  const handleProductInputChange = useCallback(
    (value: string) => {
      setProductCodeValue(value);
    },
    [setProductCodeValue]
  );

  const handleEditProductInputChange = useCallback(
    (value: string) => {
      setProductEditCodeValue(value);
    },
    [setProductEditCodeValue]
  );

  const handleAddAttachment = (data: IAttachedDocumentItemForm) => {
    const attachment = {
      id: Date.now(),
      code: data.code?.label ?? '',
      description: data.code?.value ?? '',
      tariffListCode: data.tariffListCode?.value ?? '',
      isDateRequired: data.isDateRequired,
      isReferenceRequired: data.isReferenceRequired,
    };
    reset(attachmentFormDefaultValues);
    dispatch(slicesActions.addAttachment(attachment));
  };

  const handleUpdateAttachment = (data: IAttachedDocumentItemForm) => {
    const attachment = {
      id: data.id,
      code: data.code?.label ?? '',
      description: data.code?.value ?? '',
      tariffListCode: data.tariffListCode?.value ?? '',
      isDateRequired: data.isDateRequired,
      isReferenceRequired: data.isReferenceRequired,
    };
    editReset(attachmentFormDefaultValues);
    dispatch(slicesActions.updateAttachment({ id: data.id as EntityId, changes: attachment as IAttachedDocumentItem }));
  };

  const handleEditAttachment = (id: EntityId) => {
    const attachedDocument = documentsAdapterSelectors.selectById(attachedDocumentsSelector, id);
    editReset({
      id: attachedDocument?.id as number,
      code: {
        label: attachedDocument?.code,
        value: attachedDocument?.description,
      },
      description: attachedDocument?.description,
      tariffListCode: {
        label: attachedDocument?.tariffListCode,
        value: attachedDocument?.tariffListCode,
      },
      isDateRequired: attachedDocument?.isDateRequired ?? false,
      isReferenceRequired: attachedDocument?.isReferenceRequired ?? false,
    } as Record<string, any>);
  };

  const handleRemoveAttachment = (id: EntityId) => {
    dispatch(slicesActions.removeAttachment(id));
  };

  const setDocumentCode =
    (setDescription: UseFormSetValue<typeof attachmentFormDefaultValues>) =>
    (select: OptionsItemType, onChange: (select: OptionsItemType) => void) => {
      setDescription('description', select?.value);
      onChange(select);
    };

  return (
    <LAttachmentsSectionView
      productOptions={createOptionsArrayFromData(productsData.productCodes, 'code', 'code')}
      documentsOptions={createOptionsArrayFromData(documentsData, 'code', 'description')}
      handleEditProductInputChange={handleEditProductInputChange}
      handleSetDocumentEditCode={setDocumentCode(editSetValue)}
      handleProductInputChange={handleProductInputChange}
      handleEditDocInputChange={handleEditDocInputChange}
      handleSetDocumentCode={setDocumentCode(setValue)}
      handleRemoveAttachment={handleRemoveAttachment}
      handleCancelAttachment={handleCancelAttachment}
      handleUpdateAttachment={handleUpdateAttachment}
      handleDocInputChange={handleDocInputChange}
      handleEditAttachment={handleEditAttachment}
      allAttachedDocuments={allAttachedDocuments}
      handleAddAttachment={handleAddAttachment}
      editForm={editForm}
      form={form}
      type={type}
    />
  );
};

export default LAttachmentsSectionContainer;
