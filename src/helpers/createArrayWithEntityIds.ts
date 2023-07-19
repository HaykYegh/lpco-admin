export function createArrayWithEntityIds<T>(data: Array<Record<string, keyof T>>, propsArr: Array<string>): T[] {
  return data.reduce((acc, item) => {
    propsArr.forEach((el: string) => {
      const { [el]: rParam, ...items } = item;
      items[`${el}Arr`] = Array.isArray(rParam)
        ? rParam.reduce((prev, curr) => [...prev, curr.id] as number[], [])
        : [];
      acc.push(items as never);
    });

    return acc;
  }, []);
}
