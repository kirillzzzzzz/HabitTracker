const pendingTimers = new Map();

const pendingStates = new Map();

export function setPending(trackerId, timerId) {

	clearPending(trackerId);

	pendingTimers.set(trackerId, timerId);

}

export function clearPending(trackerId) {

	const timerId = pendingTimers.get(trackerId);

	if (timerId) {

		clearTimeout(timerId);

		pendingTimers.delete(trackerId);

	}

}

export function startPending(trackerId) {

	pendingStates.set(trackerId, true);

}

export function stopPending(trackerId) {

	pendingStates.delete(trackerId);

}

export function isPending(trackerId) {

	return pendingStates.has(trackerId);

}