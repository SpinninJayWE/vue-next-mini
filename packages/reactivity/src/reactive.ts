import { isObject } from "@vue/shared";
import { mutableHandlers } from "./baseHandlers";

export const reactiveMap = new WeakMap<object, any>();

export const enum ReactiveFlags {
  IS_REAICTIVE = "__V__isReactive",
}

export function reactive(target: object) {
  return createReactiveObject(target, mutableHandlers, reactiveMap);
}

function createReactiveObject(
  target: object,
  baseHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<object, any>
) {
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }

  const proxy = new Proxy(target, baseHandlers);

  proxy[ReactiveFlags.IS_REAICTIVE] = true;

  proxyMap.set(target, proxy);

  return proxy;
}

export const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? reactive(value as object) : value;

export const isReactive = (val): boolean =>
  !!(val && val[ReactiveFlags.IS_REAICTIVE]);
