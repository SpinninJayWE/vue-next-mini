import { hasChanged } from '@vue/shared'
import { Dep, createDep } from './dep'
import { activeEffect, trackEffects, triggerrEffects } from './effect'
import { toReactive } from './reactive'

export interface Ref<T = any> {
	value: T
}

export function ref(value?: unknown) {
	return createRef(value, false)
}

function createRef(rawValue: unknown, shallow: boolean) {
	if (isRef(rawValue)) {
		return rawValue
	}

	return new RefImpl(rawValue, shallow)
}

class RefImpl<T> {
	private _value: T
	private _rawValue: T

	public dep?: Dep = undefined

	public readonly __v__isRef = true
	constructor(value: T, public readonly __v__isShallow: boolean) {
		this._rawValue = value
		this._value = __v__isShallow ? value : toReactive(value)
	}

	get value() {
		trackRefValue(this)
		return this._value
	}

	set value(newValue) {
		if (hasChanged(newValue, this._rawValue)) {
			this._rawValue = newValue
			this._value = toReactive(newValue)
			triggerRefValue(this)
		}
	}
}

/**
 *
 * @param ref
 * 收集依赖
 */
export function trackRefValue(ref) {
	if (activeEffect) {
		trackEffects(ref.dep || (ref.dep = createDep()))
	}
}

/**
 * 触发依赖
 * @param
 * @returns
 */

export function triggerRefValue(ref) {
	if (ref.dep) {
		triggerrEffects(ref.dep)
	}
}

export function isRef(r: any): r is Ref {
	return !!(r && r.__v__isRef === true)
}
