import { getToday } from "./date.js";
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

	app.currentDay = createCurrentDay();

}