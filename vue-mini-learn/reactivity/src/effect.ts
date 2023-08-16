import { ComputedRefImpl } from './computed'
import { Dep, createDep } from './dep'

export type EffectScheduler = (...args: any[]) => any

export function effect<T = any>(fn: () => T) {
	const _effect = new ReactiveEffect(fn)
	_effect.run()
}

/**
 * WeakMap key: 响应性对象
 *  value： Map 对象
 *   key: 响应性对象的指定属性
 *   value: 指定对象的指定属性的执行函数 effect
 */
type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<object, KeyToDepMap>()

// window.gtargetMap = targetMap

export let activeEffect: ReactiveEffect | undefined
export class ReactiveEffect<T = any> {
	computed?: ComputedRefImpl<T> = undefined

	constructor(
		public fn: () => T,
		public scheduler: EffectScheduler | null = null
	) {}

	run() {
		activeEffect = this
		const res = this.fn()
		activeEffect = undefined
		return res
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

	const dep = depsMap.get(key)

	if (!dep) return

	triggerEffects(dep)
}

/**
 * 一次触发dep中保存的依赖
 * @param dep
 */
export function triggerEffects(dep: Dep) {
	for (const effect of dep) {
		triggerEffect(effect)
	}
}

function triggerEffect(effect: ReactiveEffect) {
	if (effect.scheduler) {
		effect.scheduler()
	} else {
		effect.run()
	}
}
