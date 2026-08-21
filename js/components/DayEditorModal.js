import { TRACKERS } from "../config.js";
import { formatDate } from "../date.js";
import { saveJournalDay } from "../journal.js";
import { saveApp } from "../storage.js";

export function renderDayEditorModal(app, day) {

	const modal =
		document.createElement("div");

	modal.className =
		"modal-overlay";

	modal.style.zIndex = "1001";
	modal.style.pointerEvents = "auto";

	modal.innerHTML = `

		<div class="modal day-editor-modal">

			<div class="modal-header">

				<h2>
					${formatDate(day.date)}
				</h2>

				<button
					class="modal-close"
					type="button"
					data-action="close-day-editor"
					aria-label="Закрыть"
				>
					×
				</button>

			</div>

			<div class="day-editor-list">

				${TRACKERS.map(tracker => {

		const value =
			day.entries[tracker.id]?.value ?? null;

		return `

						<div
							class="day-editor-row"
							data-tracker="${tracker.id}"
						>

							<div class="day-editor-tracker">

								<span class="day-editor-icon">
									${tracker.icon}
								</span>

								<span class="day-editor-title">
									${tracker.title}
								</span>

							</div>

							<div class="day-editor-actions">

								<button
									type="button"
									class="
										day-editor-action
										day-editor-success
										${value === true ? "active" : ""}
									"
									data-value="true"
								>
									✓
								</button>

								<button
									type="button"
									class="
										day-editor-action
										day-editor-danger
										${value === false ? "active" : ""}
									"
									data-value="false"
								>
									✕
								</button>

							</div>

						</div>

					`;

	}).join("")}

			</div>

			<div class="day-editor-footer">

				<button
					type="button"
					class="day-editor-save"
					data-action="save-day-editor"
				>
					Сохранить
				</button>

			</div>

		</div>

	`;

	const editor =
		modal.querySelector(".day-editor-modal");

	if (editor) {

		editor.style.pointerEvents =
			"auto";

	}

	/*
	 * Переключение состояния привычек.
	 * Пока изменяется только локальная копия day.
	 */

	modal.addEventListener(
		"click",
		event => {

			const saveButton =
				event.target.closest(
					'[data-action="save-day-editor"]'
				);

			if (saveButton) {

				saveJournalDay(
					app,
					day
				);

				const saved =
					saveApp(app);

				if (!saved) {

					return;

				}

				modal.remove();

				return;
			}

			const button =
				event.target.closest(
					".day-editor-action"
				);

			console.log(
				"🧪 EDITOR BUTTON:",
				{
					trackerId:
						button?.closest(".day-editor-row")
							?.dataset.tracker,

					value:
						button?.dataset.value
				}
			);

			if (!button) {
				return;
			}

			const row =
				button.closest(
					".day-editor-row"
				);

			if (!row) {
				return;
			}

			const trackerId =
				row.dataset.tracker;

			const value =
				button.dataset.value === "true";

			const currentValue =
				day.entries[trackerId]?.value ?? null;

			const nextValue =
				currentValue === value
					? null
					: value;

			day.entries[trackerId].value =
				nextValue;

			console.log(
				"🧪 EDITOR VALUE:",
				JSON.stringify({
					trackerId,
					currentValue,
					nextValue,
					day
				}, null, 2)
			);

			/*
			 * Обновляем состояние кнопок
			 * только внутри этого редактора.
			 */

			const buttons =
				row.querySelectorAll(
					".day-editor-action"
				);

			buttons.forEach(action => {

				const actionValue =
					action.dataset.value === "true";

				action.classList.toggle(
					"active",
					actionValue === nextValue
				);

			});

		}
	);

	return modal;
}