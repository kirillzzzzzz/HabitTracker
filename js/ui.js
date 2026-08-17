import { TRACKERS } from "./config.js";
import { formatDate } from "./date.js";

import { renderProgressCard } from "./components/ProgressCard.js";
import { renderHeader } from "./components/Header.js";
import { renderHabitList } from "./components/HabitList.js";
import { renderJournalButton } from "./components/JournalButton.js";
import { renderJournalModal } from "./components/JournalModal.js";


export function render(app) {

	const completedCount =
		Object.values(app.currentDay.entries)
			.filter(entry => entry.value !== null)
			.length;


	const totalCount =
		TRACKERS.length;


	const root =
		document.querySelector("#app");


	const progress =
		Math.round(
			completedCount /
			totalCount *
			100
		);


	root.innerHTML = `

		${renderHeader(
		formatDate(app.currentDay.date)
	)}

<div class="progress-actions">

	${renderJournalButton()}

</div>

${renderProgressCard(
		completedCount,
		totalCount,
		progress
	)}

${renderHabitList(app)}

	`;
}