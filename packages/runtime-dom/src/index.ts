import { extend } from '@vue/shared'
import { createRenderer } from 'packages/runtime-core/src/renderer'
import { nodeOps } from './nodeOps'
import { patchProp } from './patchProp'

const renderOptions = extend({ patchProp }, nodeOps)

let renderer

function ensureRenderer() {
	return renderer || (renderer = createRenderer(renderOptions))
}

export const render = (...args) => {
	ensureRenderer().render(...args)
}
