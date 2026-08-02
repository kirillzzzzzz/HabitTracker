export function renderHabitCard(tracker, value) {

	return `

        <button
            class="tracker-button"
            data-tracker="${tracker.id}"
            style="--tracker-color:${tracker.color}"
        >

            <span class="tracker-title">

                ${tracker.icon}
                ${tracker.title}

            </span>

            <span class="tracker-value">

                ${value === null
			? "○"
			: value
				? "❌"
				: "✅"
		}

            </span>

        </button>

    `;

}