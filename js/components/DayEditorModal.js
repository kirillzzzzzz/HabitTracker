import { TRACKERS } from "../config.js";
import { formatDate } from "../date.js";

export function renderDayEditorModal(day) {

	return `
		<div class="modal-overlay" data-modal="day-editor">

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
										class="day-editor-action day-editor-success ${value === true
				? "active"
				: ""
			}"
										data-value="true"
									>
										✓
									</button>

									<button
										type="button"
										class="day-editor-action day-editor-danger ${value === false
				? "active"
				: ""
			}"
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

		</div>
	`;
}