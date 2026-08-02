export function toggleTracker(app, trackerName) {

	const entry = app.currentDay.entries[trackerName];

	if (entry.value === null) {

		entry.value = false;

	} else if (entry.value === false) {

		entry.value = true;

	} else {

		entry.value = null;

	}

}