const pending = new Map();


export function setPending(trackerId, value) {

	pending.set(trackerId, {
		value
	});

}


export function getPending(trackerId) {

	const result =
		pending.get(trackerId) ?? null;

	return result;

}


export function clearPending(trackerId) {

	pending.delete(trackerId);

}