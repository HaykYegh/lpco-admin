export function isOnlyNumbers(value: string): boolean {
  const onlyNumbersRegEx = /^[0-9\b]+$/;

  return value === '' || onlyNumbersRegEx.test(value);
}
