import { isArray, isObject } from '@vue/shared'
import { VNode, createVNode, isVNode } from './vNode'

// 定义一个名为h的函数，用于创建虚拟节点（VNode）
// 参数type表示要创建的元素类型，可以是字符串、组件或者其他值
// 参数propsOrChildren表示要设置的属性对象或者子节点
// 参数children表示要设置的子节点，可以是数组、字符串、VNode或者其他值
export function h(type: any, propsOrChildren?: any, children?: any): VNode {
	// 获取参数的个数
	const l = arguments.length
	// 如果只有一个参数，那么直接调用createVNode函数，返回一个没有属性和子节点的VNode对象
	if (l === 2) {
		// 如果第二个参数是一个对象而不是数组，那么判断它是否是一个VNode对象
		if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
			// 如果是一个VNode对象，那么返回一个包含该VNode对象为唯一子节点的VNode对象
			if (isVNode(propsOrChildren)) {
				return createVNode(type, null, [propsOrChildren])
			}
			// 否则返回一个包含第二个参数作为属性对象的VNode对象
			return createVNode(type, propsOrChildren, [])
		} else {
			// 如果第二个参数不是一个对象或者是一个数组，那么返回一个包含第二个参数作为子节点的VNode对象
			return createVNode(type, null, propsOrChildren)
		}
	} else {
		// 如果有三个或更多参数，那么先判断第三个参数是否是一个VNode对象
		if (l > 3) {
			// 如果是一个VNode对象，那么将第三个及后续所有参数放入一个数组作为子节点
			children = Array.prototype.slice.call(arguments, 2)
		} else if (l === 3 && isVNode(children)) {
			// 否则如果只有三个参数并且第三个参数是一个VNode对象，那么将其放入一个数组作为子节点
			children = [children]
		}
		// 最后返回一个包含type、propsOrChildren和children三个参数对应值的VNode对象
		return createVNode(type, propsOrChildren, children)
	}
}
