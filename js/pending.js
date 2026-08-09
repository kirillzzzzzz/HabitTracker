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

export function startPending(trackerId, value) {

	pendingStates.set(trackerId, {

		value

	});

}

export function stopPending(trackerId) {

	pendingStates.delete(trackerId);

}

export function getPending(trackerId) {

	return pendingStates.get(trackerId) ?? null;

}