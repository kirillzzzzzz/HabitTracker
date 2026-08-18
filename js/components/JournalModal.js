import { TRACKERS } from "../config.js";
import { renderCalendar } from "./Calendar.js";

export function renderJournalModal(
	app,
	selectedTrackerId
) {

	const tracker =
		TRACKERS.find(
			tracker =>
				tracker.id === selectedTrackerId
		) ?? TRACKERS[0];


	if (!tracker) {

		return null;

	}


	const now =
		new Date();

	const year =
		now.getFullYear();

	const month =
		now.getMonth();


	const modal =
		document.createElement("div");


	modal.className =
		"modal-overlay";


	modal.innerHTML = `

		<div class="modal journal-modal">

			<div class="modal-header">

				<h2>Журнал</h2>

				<button
					class="modal-close"
					type="button"
					data-action="close-journal"
					aria-label="Закрыть журнал"
				>
					×
				</button>

			</div>


			<div class="journal-tracker-select">

				<select id="journal-tracker">

					${TRACKERS.map(item => `

						<option
							value="${item.id}"
							${item.id === tracker.id ? "selected" : ""}
						>
							${item.icon}
							${item.title}
						</option>

					`).join("")}

				</select>

			</div>


			<div class="journal-tabs">

				<button
					type="button"
					class="journal-tab"
					data-month="previous"
				>
					Предыдущий месяц
				</button>


				<button
					type="button"
					class="journal-tab active"
					data-month="current"
				>
					Текущий месяц
				</button>

			</div>


			<div
				class="journal-calendar"
				id="journal-calendar"
			>

				${renderCalendar(
		app,
		tracker.id,
		year,
		month
	)}

			</div>


			<div class="journal-records">

				<div class="journal-record">

					<span>
						✓ Подряд
					</span>

					<strong>
						0
					</strong>

				</div>


				<div class="journal-record">

					<span>
						🏆 Рекорд
					</span>

					<strong>
						0
					</strong>

				</div>

			</div>

		</div>

	`;


	return modal;
}