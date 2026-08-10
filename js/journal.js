import { getToday } from "./date.js";
import { TRACKERS } from "./config.js";

export function createCurrentDay() {

	const entries = {};

	for (const tracker of TRACKERS) {

		entries[tracker.id] = {

			value: tracker.initialValue

		};

	}

	return {

		date: getToday(),

		entries

	};

}

export function saveDayToJournal(app) {

	const date = app.currentDay.date;

	app.journal[date] = structuredClone(app.currentDay);

}