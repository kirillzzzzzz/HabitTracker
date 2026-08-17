import { TRACKERS } from "../config.js";

export function renderJournalModal(app) {

	const trackerOptions = TRACKERS
		.map(tracker => `
			<option value="${tracker.id}">
				${tracker.icon} ${tracker.title}
			</option>
		`)
		.join("");

	const modal = document.createElement("div");

	modal.className = "modal-overlay";

	modal.innerHTML = `

		<div class="modal journal-modal">

			<div class="modal-header">

				<h2>Журнал</h2>

				<button
					class="modal-close"
					type="button"
					data-action="close-journal"
				>
					×
				</button>

			</div>

			<div class="journal-tracker-select">

				<select id="journal-tracker">

					${trackerOptions}

				</select>

			</div>

			<div class="journal-tabs">

				<button
					type="button"
					class="journal-tab active"
					data-month="previous"
				>
					Предыдущий месяц
				</button>

				<button
					type="button"
					class="journal-tab"
					data-month="current"
				>
					Текущий месяц
				</button>

			</div>

			<div
				class="journal-calendar"
				id="journal-calendar"
			>
			</div>

			<div class="journal-records">

				<div class="journal-record">

					<span>✓ Подряд</span>

					<strong id="journal-current-streak">
						0
					</strong>

				</div>

				<div class="journal-record">

					<span>🏆 Рекорд</span>

					<strong id="journal-best-streak">
						0
					</strong>

				</div>

			</div>

		</div>

	`;

	return modal;
}