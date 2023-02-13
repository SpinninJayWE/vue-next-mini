import { Dep, createDep } from './dep'
import { activeEffect, trackEffects } from './effect'
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

	public dep?: Dep = undefined

	public readonly __v__isRef = true
	constructor(value: T, public readonly __v__isShallow: boolean) {
		this._value = __v__isShallow ? value : toReactive(value)
	}

	get value() {
		trackRefValue(this)
		return this._value
	}

	set value(newValue) {}
}

export function trackRefValue(ref) {
	if (activeEffect) {
		trackEffects(ref.dep || (ref.dep = createDep()))
	}
}

export function isRef(r: any): r is Ref {
	return !!(r && r.__v__isRef === true)
}
