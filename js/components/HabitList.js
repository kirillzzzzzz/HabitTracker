import { TRACKERS } from "../config.js";
import { renderHabitCard } from "./HabitCard.js";

export function renderHabitList(app) {

	return TRACKERS.map(tracker => {

		const value =
			app.currentDay.entries[tracker.id].value;

		return renderHabitCard(tracker, value);

	}).join("");

}