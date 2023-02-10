import { isArray } from '@vue/shared'
import { Dep, createDep } from './dep'

type keyToDepMAP = Map<any, Dep>
const targetMap = new WeakMap<any, keyToDepMAP>()

export function effect<T = any>(fn: () => T) {
	const _effect = new ReactiveEffect(fn)

	_effect.run()
}

export let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect<T = any> {
	constructor(public fn: () => T) {}
	run() {
		activeEffect = this
		return this.fn()
	}
}

/**
 * 收集依赖
 * @param target
 * @param key
 */
export function track(target: object, key: unknown) {
	if (!activeEffect) return
	let depsMap = targetMap.get(target)
	if (!depsMap) {
		targetMap.set(target, (depsMap = new Map()))
	}

	let dep = depsMap.get(key)
	if (!dep) {
		depsMap.set(key, (dep = createDep()))
	}
	trackEffects(dep)
}

/**
 * 利用dep 一次跟踪指定key的所有effect
 */
export function trackEffects(dep: Dep) {
	dep.add(activeEffect!)
}

/**
 * 触发依赖
 * @param target
 * @param key
 * @param newValue
 */
export function trigger(target: object, key: unknown, newValue: unknown) {
	const depsMap = targetMap.get(target)
	if (!depsMap) return

	const dep: Dep | undefined = depsMap.get(key)

	if (!dep) return

	triggerrEffects(dep)
}

/**
 * 依次触发dep中保存的依赖
 * @param dep
 */

export function triggerrEffects(dep: Dep) {
	const effects = isArray(dep) ? dep : [...dep]

	for (const effect of effects) {
		triggerrEffect(effect)
	}
}

export function triggerrEffect(effect: ReactiveEffect) {
	effect.run()
}
