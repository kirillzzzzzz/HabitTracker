import { getJournalDayStatus } from "../journal.js";
import { getToday } from "../date.js";

export function renderCalendar(
	app,
	trackerId,
	year,
	month
) {

	const firstDay =
		new Date(year, month, 1);

	const daysInMonth =
		new Date(year, month + 1, 0).getDate();

	// JS: воскресенье = 0.
	// Нам нужен понедельник = 0.
	const startDay =
		(firstDay.getDay() + 6) % 7;

	const today =
		getToday();

	const monthName =
		firstDay.toLocaleDateString(
			"ru-RU",
			{
				month: "long",
				year: "numeric"
			}
		);

	const weekdays = [
		"Пн",
		"Вт",
		"Ср",
		"Чт",
		"Пт",
		"Сб",
		"Вс"
	];


	let html = `

		<div class="journal-calendar-header">

			<strong>
				${monthName}
			</strong>

		</div>


		<div class="journal-calendar-weekdays">

			${weekdays.map(day => `
				<div class="journal-calendar-weekday">
					${day}
				</div>
			`).join("")}

		</div>


		<div class="journal-calendar-grid">
	`;


	// Пустые ячейки перед первым числом месяца.
	for (
		let i = 0;
		i < startDay;
		i++
	) {

		html += `
			<div class="journal-calendar-day empty">
			</div>
		`;

	}


	for (
		let day = 1;
		day <= daysInMonth;
		day++
	) {

		const date =
			`${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


		const isFuture =
			date > today;


		let status =
			null;


		if (!isFuture) {

			status =
				getJournalDayStatus(
					app,
					date,
					trackerId
				);

		}


		const statusClass =
			status
				? `status-${status}`
				: "";


		const futureClass =
			isFuture
				? "future"
				: "";


		html += `

			<button
				type="button"
				class="
					journal-calendar-day
					${statusClass}
					${futureClass}
				"
				data-date="${date}"
				${isFuture ? "disabled" : ""}
			>

				<span>
					${day}
				</span>

			</button>

		`;

	}


	html += `

		</div>

	`;


	return html;
}