export function createObjectFromDataWithoutDisProps<T>(
  obj: Record<string, keyof T>,
  disPropsObj: Record<string, boolean | number | string> = {}
): Record<string, keyof T> {
  return Object.keys(obj).reduce((acc: Record<string, keyof T>, item: string) => {
    if (disPropsObj[item] === undefined) {
      acc[item] = obj[item] as keyof T;
    }

    return acc;
  }, {});
}
