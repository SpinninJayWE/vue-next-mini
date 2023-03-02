import { isOn } from '@vue/shared'
import { patchClass } from './modules/class'

export const patchProp = (el: Element, key, prevValue, nextValue) => {
	// 处理class
	if (key === 'class') {
		patchClass(el, nextValue)
		// 处理style
	} else if (key === 'style') {
		// 处理事件
	} else if (isOn(key)) {
	} else {
	}
}
