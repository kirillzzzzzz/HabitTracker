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

	if (!app.currentDay) {

		app.currentDay = createCurrentDay();

		return;
	}

	if (app.currentDay.date === today) {

		return;
	}

	if (app.currentDay.date > today) {

		return;
	}

	let date = app.currentDay.date;

	while (date < today) {

		saveDayToJournal(app);

		date = getNextDay(date);

		if (date === today) {

			app.currentDay = createDay(today);

			break;
		}

		app.currentDay = createDay(date);
	}

}

export function getJournalDay(app, date) {

	return app.journal[date] ?? null;

}

export function getJournalDates(app) {

	return Object.keys(app.journal)
		.sort()
		.reverse();

}

export function getJournalEntries(app) {

	const dates = getJournalDates(app);

	return dates.map(date => ({
		date,
		day: getJournalDay(app, date)
	}));

}