import { Text } from './vnode'

export interface RenderOptions {
	/**
	 * 为指定的element的props打补丁
	 * @param el
	 * @param key
	 * @param prevValue
	 * @param newValue
	 */
	patchProp(el: Element, key: string, prevValue: any, newValue: any): void
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
	createElement(type: string)
}
export function createRenderer(options: RenderOptions) {
	return baseCreateRenderer(options)
}

function baseCreateRenderer(options: RenderOptions): any {
	const patch = (oldVNode, newVNode, container, anchor = null) => {
		if (oldVNode === newVNode) {
			return
		}
		const { type } = newVNode
		switch (type) {
			case Text:
				break

			default:
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
