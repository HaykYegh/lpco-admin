export function createArrayFromItemsArr<T extends object>(data: T[], prop: string) {
  return data.reduce((acc: T[], item: Record<string, any>) => [...acc, ...item[prop]] as T[], []);
}
