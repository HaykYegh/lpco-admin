export interface IDepartmentItem {
  address: string;
  addressTranslated: string;
  code: string;
  description: string;
  descriptionTranslated: string;
  email: string;
  phoneNumber?: string;
  import?: boolean;
  export?: boolean;
}

export type DepartmentTHeaderItemType = {
  name: string;
  flex: number;
};

export interface IDepartmentsTBodyProps {
  departments: Array<IDepartmentItem>;
  ministryCode?: string;
}
