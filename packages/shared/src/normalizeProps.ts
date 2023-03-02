import { isArray, isObject, isString } from '.'

/**
 * 标准化增强vnode的class
 * @param value 要标准化的class
 * @returns 标准化后的class字符串
 */
export function normalizeClass(value: unknown): string {
	let res = ''
	if (isString(value)) {
		// 如果是字符串，直接返回
		res = value
	} else if (isArray(value)) {
		// 如果是数组，递归处理每个元素
		for (let index = 0; index < value.length; index++) {
			const normalized = normalizeClass(value[index])
			res += normalized + ' '
		}
	} else if (isObject(value)) {
		// 如果是对象，返回对象中所有属性值为true的属性名组成的字符串
		for (const name in value as object) {
			if ((value as object)[name]) {
				res += name + ' '
			}
		}
	}
	return res.trim()
}
