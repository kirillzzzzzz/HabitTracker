import { TRACKERS } from "./config.js";
import { formatDate } from "./date.js";

export function render(app) {

	const completedCount = Object.values(app.currentDay.entries)
		.filter(entry => entry.value !== null)
		.length;

	const totalCount = TRACKERS.length;

	const root = document.querySelector("#app");

	const progress =
		Math.round(completedCount / totalCount * 100);

	const trackersHtml = TRACKERS.map(tracker => {

		const value =
			app.currentDay.entries[tracker.id].value;

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

	}).join("");

	root.innerHTML = `

        <div class="header">

    <h1>Habit Tracker</h1>

    <p class="date">

        ${formatDate(app.currentDay.date)}

    </p>

</div>

<div class="progress-card">

    <div class="progress-info">

        <span>Отмечено</span>

        <strong>

            ${completedCount} / ${totalCount}

        </strong>

    </div>

    <div class="progress">

        <div
            class="progress-fill"
            style="width:${progress}%"
        ></div>

    </div>

</div>

${trackersHtml}
    `;
}