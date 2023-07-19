import type { Dictionary, EntityId } from '@reduxjs/toolkit';

import { createObjectFromDataWithoutDisProps } from './createObjectFromDataWithoutDisProps';

export interface IMutateParamsArr<Type> {
  entities: Dictionary<Type>;
  dataProp: string;
  mutateProp: string;
  disablePropsObj: Record<string, boolean>;
}

export function mutateDataFromEntities<T, IntType>(
  entityData: T[],
  disablePropsObj: Record<string, boolean> = {},
  mutateParamsArr: Array<IMutateParamsArr<IntType>> = []
): T[] {
  return entityData.reduce((acc: T[], item: T) => {
    const obj: Record<string, never> = createObjectFromDataWithoutDisProps(item as never, disablePropsObj);
    mutateParamsArr.forEach((el: IMutateParamsArr<IntType>) => {
      const mArr = (item as Record<string, unknown>)[el.dataProp];

      if (Array.isArray(mArr)) {
        const mutateData: Array<Record<string, keyof T>> =
          mArr.reduce((accumuliator: Array<Record<string, keyof T>>, id: EntityId) => {
            const mutateDataFromInnerData = el.entities[id];
            const mutateObj = createObjectFromDataWithoutDisProps(
              mutateDataFromInnerData as Record<string, never>,
              el.disablePropsObj
            );
            accumuliator.push(mutateObj);

            return accumuliator;
          }, []) ?? [];

        obj[el.mutateProp] = mutateData as never;
      }
    });

    acc.push(obj as T);

    return acc;
  }, []);
}
