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

export function getOrCreateJournalDay(app, date) {

	const journalDay = getJournalDay(app, date);

	if (journalDay) {

		return structuredClone(journalDay);

	}

	return createDay(date);

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

export function getJournalValue(app, date, trackerId) {

	const day = getJournalDay(app, date);

	if (!day) {
		return null;
	}

	return day.entries[trackerId]?.value ?? null;
}

export function getJournalDayStatus(app, date, trackerId) {

	const today = getToday();

	if (date > today) {
		return "future";
	}

	if (date === today) {

		const value =
			app.currentDay.entries[trackerId]?.value ?? null;

		if (value === true) {
			return "success";
		}

		if (value === false) {
			return "danger";
		}

		return "empty";
	}

	const day = getJournalDay(app, date);

	if (!day) {
		return "not-recorded";
	}

	const value =
		day.entries[trackerId]?.value ?? null;

	if (value === true) {
		return "success";
	}

	if (value === false) {
		return "danger";
	}

	return "missed";
}

export function getMissedDates(app) {

	const today = getToday();

	return getJournalDates(app)
		.filter(date => date < today)
		.filter(date => {

			const day = app.journal[date];

			return Object.values(day.entries)
				.every(entry => entry.value === null);
		});
}