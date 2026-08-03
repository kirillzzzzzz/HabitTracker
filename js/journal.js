import { getToday } from "./date.js";
import { TRACKERS } from "./config.js";

export function createCurrentDay() {

	const entries = {};

	for (const tracker of TRACKERS) {

		entries[tracker.id] = {

			value: tracker.value

		};

	}

	return {

		date: getToday(),

		entries

	};

}