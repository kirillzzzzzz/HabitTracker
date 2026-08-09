const pending = new Map();


export function setPending(trackerId, value) {

	pending.set(trackerId, {
		value
	});

}


export function getPending(trackerId) {

	return pending.get(trackerId) ?? null;

}


export function clearPending(trackerId) {

	pending.delete(trackerId);

}