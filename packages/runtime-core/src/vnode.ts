import { isArray, isFunction, isObject, isString } from '@vue/shared'
import { ShapeFlags } from 'packages/shared/src/shapeFlags'
import { normalizeClass } from '../../shared/src/normalizeProps'

export const Fragment = Symbol('Fragment')
export const Text = Symbol('Text')
export const Comment = Symbol('Comment')

export interface VNode {
	__v_isVNode: true
	type: any
	props: any
	children: any
	shapeFlag: number
}

export function isVNode(value: any): value is VNode {
	return value ? value.__v_isVNode === true : false
}
export function createVNode(type, props, children): VNode {
	if (props) {
		let { class: klass, style } = props
		if (klass && !isString(klass)) {
			props.class = normalizeClass(klass)
		}
	}

	// type类型判断 复杂三元运算符
	const shapeFlag = isString(type)
		? ShapeFlags.ELEMENT
		: isObject(type)
		? ShapeFlags.STATEFUL_COMPONENT
		: type === Text
		? ShapeFlags.TEXT_CHILDREN
		: 0

	return createBaseVNode(type, props, children, shapeFlag)
}

function createBaseVNode(type, props, children, shapeFlag) {
	const vnode = {
		__v_isVNode: true,
		type,
		props,
		shapeFlag,
	} as VNode

	normalizeChildren(vnode, children)

	return vnode
}

export function normalizeChildren(vnode: VNode, children: unknown) {
	let type = 0

	if (children == null) {
		children = null
	} else if (isArray(children)) {
		type = ShapeFlags.ARRAY_CHILDREN
	} else if (isObject(children)) {
	} else if (isFunction(children)) {
	} else {
		children = String(children)
		type = ShapeFlags.TEXT_CHILDREN
	}

	vnode.children = children
	vnode.shapeFlag |= type
}
