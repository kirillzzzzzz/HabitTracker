import { TRACKERS } from "../config.js";
import { renderHabitCard } from "./HabitCard.js";
import { isPending } from "../pending.js";

export function renderHabitList(app) {

	return TRACKERS.map(tracker => {

		const value =
			app.currentDay.entries[tracker.id].value;

		const pending = isPending(tracker.id);

		renderHabitCard(

			tracker,

			value,

			pending

		)

		return renderHabitCard(tracker, value);

	}).join("");

}