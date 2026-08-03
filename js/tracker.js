export function setTrackerValue(app, trackerId, value) {

	const entry = app.currentDay.entries[trackerId];

	entry.value =
		entry.value === value
			? null
			: value;

}