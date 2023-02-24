import { extend, isArray } from "@vue/shared";
import { ComputedRefImpl } from "./computed";
import { Dep, createDep } from "./dep";

export type EffectScheduler = (...args: any) => any;

type keyToDepMAP = Map<any, Dep>;
const targetMap = new WeakMap<any, keyToDepMAP>();

export interface ReactiveEffectOptions {
  lazy?: boolean;
  scheduler?: EffectScheduler;
}

export function effect<T = any>(fn: () => T, options?: ReactiveEffectOptions) {
  const _effect = new ReactiveEffect(fn);

  if (options) {
    extend(_effect, options);
  }

  if (!options || !options.lazy) {
    _effect.run();
  }
}

export let activeEffect: ReactiveEffect | undefined;

export class ReactiveEffect<T = any> {
  computed?: ComputedRefImpl<T>;
  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null
  ) {}
  run() {
    // console.log('ReactiveEffect Run', this)
    activeEffect = this;
    return this.fn();
  }

  stop() {}
}

/**
 * 收集依赖
 * @param target
 * @param key
 */
export function track(target: object, key: unknown) {
  // console.log(target, key, activeEffect)
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = createDep()));
  }
  trackEffects(dep);
}

/**
 * 利用dep 一次跟踪指定key的所有effect
 */
export function trackEffects(dep: Dep) {
  dep.add(activeEffect!);
}

/**
 * 触发依赖
 * @param target
 * @param key
 * @param newValue
 */
export function trigger(target: object, key: unknown, newValue: unknown) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep: Dep | undefined = depsMap.get(key);

  if (!dep) return;

  triggerrEffects(dep);
}

/**
 * 依次触发dep中保存的依赖
 * @param dep
 */

export function triggerrEffects(dep: Dep) {
  const effects = isArray(dep) ? dep : [...dep];

  for (const effect of effects) {
    if (effect.computed) {
      triggerrEffect(effect);
    }
  }

  for (const effect of effects) {
    if (!effect.computed) {
      triggerrEffect(effect);
    }
  }
}

export function triggerrEffect(effect: ReactiveEffect) {
  if (effect.scheduler) {
    effect.scheduler();
  } else {
    effect.run();
  }
}
