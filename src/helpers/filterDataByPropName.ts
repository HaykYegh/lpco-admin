export function filterDataByPropName<T>(arr: Array<T>, propName: string, value: string | number): Array<T> {
  return arr.filter((item) => (item as Record<string, unknown>)[propName] === value);
}
