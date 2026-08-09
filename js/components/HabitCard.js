// Поработал
export function renderHabitCard(tracker, value, pending) {

	const stateClass =
		value === null
			? "state-none"
			: value
				? "state-success"
				: "state-danger";


	const pendingClass =
		!pending
			? ""
			: pending.value
				? "pending-success"
				: "pending-danger";

	return `

        <div
            <div
					class="tracker-card ${stateClass} ${pendingClass}"
            style="--tracker-color:${tracker.color}"
        >

            <div class="tracker-info">

                <div class="tracker-title">

                    ${tracker.icon}
                    ${tracker.title}

                </div>

                <div class="tracker-description">

                    ${tracker.description}

                </div>

            </div>

            <div class="tracker-actions">

                <button
						class="tracker-action success ${value === true ? "active" : ""}${pending?.value === true ? "pending" : ""}"
						style="--fill-color: var(--success)"
						data-tracker="${tracker.id}"
						data-value="true"
						type="button"
					>

						<span class="tracker-action-fill"></span>

						<span class="tracker-action-icon">

							✓

						</span>

					</button>

                <button
						class="
						tracker-action 
						danger 
						${value === false ? "active" : ""}
						${pending?.value === false ? "pending" : ""}
						"
						style="--fill-color:var(--danger)"
						data-tracker="${tracker.id}"
						data-value="false"
						type="button"
					>

						<span class="tracker-action-fill"></span>

						<span class="tracker-action-icon">

							✕

						</span>

					</button>

            </div>

        </div>

    `;

}