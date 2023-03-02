import { ShapeFlags } from 'packages/shared/src/shapeFlags'
import { Text, Fragment, Comment } from './vnode'

export interface RenderOptions {
	/**
	 * 为指定的element的props打补丁
	 * @param el
	 * @param key
	 * @param prevValue
	 * @param newValue
	 */
	patchProp(el: Element, key: string, prevValue: any, nextValue: any): void
	/**
	 * 为指定的element设置text
	 * @param node
	 * @param text
	 */
	setElementText(node: Element, text: string): void
	/**
	 * 插入指定的el到parent中，anchor标识插入的位置， 既：锚点
	 */
	insert(el, parent: Element, anchor?): void
	/**
	 * 创建element
	 */
	createElement(type: string): Element
}
export function createRenderer(options: RenderOptions) {
	return baseCreateRenderer(options)
}

function baseCreateRenderer(options: RenderOptions): any {
	const {
		createElement: hostCreateElement,
		setElementText: hostSetElementText,
		insert: hostInsert,
		patchProp: hostPatchProp,
	} = options
	const processElement = (oldVNode, newVNode, container, anchor) => {
		if (oldVNode == null) {
			mountElement(newVNode, container, anchor)
		} else {
			// TODO: 更新操作
		}
	}

	const mountElement = (vNode, container, anchor) => {
		const { type, props, shapeFlag } = vNode
		// 1.创建element
		const el = (vNode.el = hostCreateElement(type))
		if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
			// 2.设置文本
			hostSetElementText(el, vNode.children)
		} else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
		}
		// 3.设置props
		if (props) {
			for (const key in props) {
				hostPatchProp(el, key, null, props[key])
			}
		}
		// 4.插入
		hostInsert(el, container, anchor)
	}
	const patch = (oldVNode, newVNode, container, anchor = null) => {
		if (oldVNode === newVNode) {
			return
		}
		const { type, shapeFlag } = newVNode
		switch (type) {
			case Text:
				break
			case Comment:
				break
			case Fragment:
				break
			default:
				if (shapeFlag & ShapeFlags.ELEMENT) {
					processElement(oldVNode, newVNode, container, anchor)
				} else if (shapeFlag & ShapeFlags.COMPONENT) {
				}
				break
		}
	}
	const render = (vnode, container) => {
		if (vnode === null) {
			// TODO: 卸载
		} else {
			// TODO: 打补丁 挂载
			patch(container._vnode || null, vnode, container)
		}

		container._vnode = vnode
	}

	return {
		render,
	}
}
