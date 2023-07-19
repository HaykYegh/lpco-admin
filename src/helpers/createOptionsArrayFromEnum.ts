import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

export function createOptionsArrayFromEnum<T extends object>(enumObj: T): Array<SelectBaseOption> {
  return Object.keys(enumObj).reduce((acc: Array<SelectBaseOption>, item: string) => {
    const obj: SelectBaseOption = { label: item, value: item };
    acc.push(obj);

    return acc;
  }, []);
}
