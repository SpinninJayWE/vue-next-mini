import { isArray, isObject, isString } from '.'

// 标准化增强vnode的class
export function normalizeClass(value: unknown): string {
	let res = ''
	if (isString(value)) {
		res = value
	} else if (isArray(value)) {
		for (let index = 0; index < value.length; index++) {
			const normalized = normalizeClass(value[index])
			res += normalized + ' '
		}
	} else if (isObject(value)) {
		for (const name in value as object) {
			if ((value as object)[name]) {
				res += name + ' '
			}
		}
	}
	return res.trim()
}
