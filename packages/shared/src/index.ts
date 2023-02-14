/**
 * 判断是否为数组
 *
 */
export const isArray = Array.isArray

export const isObject = (val: unknown) =>
	val !== null && typeof val === 'object'

/**
 *
 * @param
 * @param 对比两个数据是否发生改变
 * @returns
 */
export const hasChanged = (value: any, oldVal: any): boolean =>
	!Object.is(value, oldVal)
