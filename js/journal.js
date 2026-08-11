import { getToday, getNextDay } from "./date.js";
import { TRACKERS } from "./config.js";

export function createDay(date) {

	const entries = {};

	for (const tracker of TRACKERS) {

		entries[tracker.id] = {

			value: tracker.initialValue

		};

	}

	return {

		date,

		entries

	};

}

export function createCurrentDay() {

	return createDay(getToday());

}

export function saveDayToJournal(app) {

	const date = app.currentDay.date;

	app.journal[date] = structuredClone(app.currentDay);

}

export function closeCurrentDay(app) {

	saveDayToJournal(app);

	const nextDate = getNextDay(
		app.currentDay.date
	);

	app.currentDay = createDay(nextDate);

}

export function ensureCurrentDay(app) {

	const today = getToday();

	console.log("🧪 ENSURE START:", {
		currentDay: structuredClone(app.currentDay),
		today
	});

	if (!app.currentDay) {

		app.currentDay = createCurrentDay();

		console.log(
			"🧪 ENSURE: NO CURRENT DAY → CREATED"
		);

		return;
	}

	if (app.currentDay.date === today) {

		console.log(
			"🧪 ENSURE: CURRENT DAY IS TODAY"
		);

		return;
	}

	if (app.currentDay.date > today) {

		console.log(
			"🧪 ENSURE: CURRENT DAY IS IN THE FUTURE"
		);

		return;
	}

	let date = app.currentDay.date;

	while (date < today) {

		console.log(
			"🧪 ENSURE: CLOSING DAY:",
			date
		);

		saveDayToJournal(app);

		date = getNextDay(date);

		if (date === today) {

			app.currentDay = createDay(today);

			break;
		}

		app.currentDay = createDay(date);
	}

	console.log("🧪 ENSURE END:", {
		currentDay: structuredClone(app.currentDay),
		journal: structuredClone(app.journal)
	});
}