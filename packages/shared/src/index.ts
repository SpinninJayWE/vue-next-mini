/**
 * 判断是否为数组
 *
 */
export const isArray = Array.isArray;

export const isObject = (val: unknown) =>
  val !== null && typeof val === "object";

/**
 *
 * @param
 * @param 对比两个数据是否发生改变
 * @returns
 */
export const hasChanged = (value: any, oldVal: any): boolean =>
  !Object.is(value, oldVal);

export const isFunction = (val: unknown): val is Function => {
  return typeof val === "function";
};

export const extend = Object.assign;

export const EMPTY_OBJ: { readonly [key: string]: any } = {};
