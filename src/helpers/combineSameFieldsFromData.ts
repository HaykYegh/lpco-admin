interface ISameFieldsItem {
  field: string;
  params: Array<Record<string, any>>;
}

export function combineSameFieldsFromData<T extends Record<string, unknown>>(data: T[], field: string) {
  const combinedObj = data.reduce((acc: Record<string, any>, item: Record<string, any>) => {
    const prop = item[field];

    if (acc[prop]) {
      acc[prop] = [...acc[prop], item];
    } else {
      acc[prop] = [item];
    }

    return acc;
  }, {});

  return Object.keys(combinedObj).reduce((acc: Array<ISameFieldsItem>, item: string) => {
    const obj = {
      field: item,
      params: combinedObj[item],
    };
    acc.push(obj);

    return acc;
  }, []);
}
