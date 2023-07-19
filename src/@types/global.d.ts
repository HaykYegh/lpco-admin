declare interface IWithReactChildren {
  children: React.React.ReactNode | React.React.ReactNode[];
}

declare interface IErrorItem {
  code: string;
  field: string;
  message: string;
  messageArguments?: Array[string];
  messageCode?: string;
}

declare type Nullable<T> = null | T;
