export function getDataDependsBoolean<T>(bool: boolean, appActionName: T, extActionName: T) {
  return bool ? appActionName : extActionName;
}
