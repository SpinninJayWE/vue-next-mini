/**
 * 判断是否为数组
 *
 */
export const isArray = Array.isArray

export const isObject = (val: unknown) =>
	val !== null && typeof val === 'object'
