import { TRACKERS } from "../config.js";
import { renderHabitCard } from "./HabitCard.js";
import { getPending } from "../pending.js";

export function renderHabitList(app) {

	return TRACKERS.map(tracker => {

		const value =
			app.currentDay.entries[tracker.id].value;

		const pending = getPending(tracker.id);

		return renderHabitCard(

			tracker,

			value,

			pending

		);

	}).join("");

}