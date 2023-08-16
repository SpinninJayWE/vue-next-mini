import { isObject } from '@vue3/shared'
import { mutableHandlers } from './baseHandlers'

export const reactiveMap = new WeakMap<object, any>()

export function reactive(target: object) {
	return createReactiveObject(target, mutableHandlers, reactiveMap)
}

function createReactiveObject(
	target: object,
	baseHandlers,
	proxyMap: WeakMap<Object, any>
) {
	const existingProxy = proxyMap.get(target)

	if (existingProxy) {
		return existingProxy
	}

	const proxy = new Proxy(target, baseHandlers)
	proxyMap.set(target, proxy)

	return proxy
}

export const toReactive = <T extends unknown>(value: T): T => {
	return isObject(value) ? reactive(value as object) : value
}