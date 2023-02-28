let isFlushPending = false

const resolvedPromise = Promise.resolve() as Promise<any>

let currentFlushPrimise: Promise<void> | null = null

const penddingQueueCbs: Function[] = []

export function queuePreFlushCb(cb: Function) {
	queueCb(cb, penddingQueueCbs)
}

function queueCb(cb: Function, penddingQueue: Function[]) {
	penddingQueue.push(cb)
	queueFlush(penddingQueue)
}

// 依此执行队列中的执行函数
function queueFlush(penddingQueue: Function[]) {
	if (!isFlushPending) {
		isFlushPending = true
		currentFlushPrimise = resolvedPromise.then(flushJobs)
	}
}

function flushJobs() {
	isFlushPending = false
	flushPreFlushCbs()
}

export function flushPreFlushCbs() {
	if (penddingQueueCbs.length) {
		let activePreFlushCbs = [...new Set(penddingQueueCbs)]
		penddingQueueCbs.length = 0

		for (let index = 0; index < activePreFlushCbs.length; index++) {
			activePreFlushCbs[index]()
		}
	}
}
