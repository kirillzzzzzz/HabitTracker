import { app } from "./app.js";
import { saveApp, loadApp } from "./storage.js";
import { render } from "./ui.js";
import { setTrackerValue } from "./tracker.js";
import { startHold, cancelHold } from "./hold.js";
import { setPending, clearPending } from "./pending.js";
import {
	ensureCurrentDay, getJournalDates,
	getJournalDayStatus,
	getMissedDates,
	getJournalDay
} from "./journal.js";
import { renderJournalModal } from "./components/JournalModal.js";
import { TRACKERS } from "./config.js";

let selectedJournalTrackerId =
	TRACKERS[0]?.id;


const savedApp = loadApp();

let currentHold = null;

if (savedApp) {

	Object.assign(app, savedApp);

}

ensureCurrentDay(app);

function commit() {

	const saved = saveApp(app);

	if (!saved) {

		return;

	}

	updateUI();

}

function updateUI() {

	render(app);

	bindJournalEvents();

}

function bindEvents() {

	const appElement =
		document.querySelector("#app");

	appElement.addEventListener(
		"click",
		handleAppClick
	);


	appElement.addEventListener(
		"pointerdown",
		handlePointerDown
	);

	appElement.addEventListener(
		"pointerup",
		handlePointerUp
	);

	appElement.addEventListener(
		"pointerleave",
		handlePointerUp
	);

	appElement.addEventListener(
		"pointercancel",
		handlePointerUp
	);

}

function updatePendingUI(
	trackerId,
	value
) {

	const card =
		document.querySelector(
			`.tracker-card[data-tracker="${trackerId}"]`
		);


	if (!card) return;


	card.classList.remove(
		"pending-success",
		"pending-danger"
	);


	if (value === true) {

		card.classList.add(
			"pending-success"
		);

	} else {

		card.classList.add(
			"pending-danger"
		);

	}

}

function handlePointerDown(event) {

	const button =
		event.target.closest(".tracker-action");


	if (!button) return;


	const trackerId =
		button.dataset.tracker;


	const value =
		button.dataset.value === "true";


	const currentValue =
		app.currentDay.entries[trackerId].value;


	const reverse =
		currentValue === value;


	setPending(
		trackerId,
		value
	);


	updatePendingUI(
		trackerId,
		value
	);


	const startProgress =
		reverse ? 1 : 0;


	button.style.setProperty(
		"--progress",
		startProgress
	);


	button.style.setProperty(
		"--glow",
		startProgress
	);


	currentHold = {

		trackerId,

		value,

		reverse,

		button

	};


	startHold(

		progress => {

			button.style.setProperty(
				"--progress",
				progress
			);


			button.style.setProperty(
				"--glow",
				progress
			);

		},


		() => {

			const nextValue =
				reverse
					? null
					: value;


			setTrackerValue(
				app,
				trackerId,
				nextValue
			);


			clearPending(
				trackerId
			);


			commit();


			currentHold = null;

		},


		reverse

	);

}

function handlePointerUp() {

	if (!currentHold) return;


	const {
		trackerId,
		button,
		reverse
	} = currentHold;


	cancelHold(

		progress => {

			button.style.setProperty(
				"--progress",
				progress
			);


			button.style.setProperty(
				"--glow",
				progress
			);

		},

		reverse

	);


	clearPending(
		trackerId
	);


	const card =
		document.querySelector(
			`.tracker-card[data-tracker="${trackerId}"]`
		);


	if (card) {

		card.classList.remove(
			"pending-success",
			"pending-danger"
		);

	}


	currentHold = null;

}

function bindJournalEvents() {

	const journalButton =
		document.querySelector(
			"#journal-button"
		);


	const journalClose =
		document.querySelector(
			"#journal-close"
		);


	journalButton?.addEventListener(
		"click",
		openJournalModal
	);


	journalClose?.addEventListener(
		"click",
		closeJournalModal
	);

}

function openJournalModal() {

	const existingModal =
		document.querySelector(
			".modal-overlay"
		);

	if (existingModal) {
		return;
	}


	const modal =
		renderJournalModal(
			app,
			selectedJournalTrackerId,
			() => {

				updateUI();

			}
		);


	if (!modal) {
		return;
	}


	document.body.appendChild(modal);

	bindJournalModalEvents(modal);
}

function closeJournalModal() {

	const modal =
		document.querySelector(".modal-overlay");

	if (!modal) {
		return;
	}

	modal.remove();
}

function bindJournalModalEvents(modal) {

	const closeButton =
		modal.querySelector(
			'[data-action="close-journal"]'
		);

	closeButton.addEventListener(
		"click",
		closeJournalModal
	);

	const trackerSelect =
		modal.querySelector(
			"#journal-tracker"
		);


	trackerSelect.addEventListener(
		"change",
		event => {

			selectedJournalTrackerId =
				event.target.value;


			console.log(
				"🧪 JOURNAL TRACKER:",
				JSON.stringify(
					{
						trackerId:
							selectedJournalTrackerId,

						tracker:
							TRACKERS.find(
								tracker =>
									tracker.id ===
									selectedJournalTrackerId
							)
					},
					null,
					2
				)
			);


			closeJournalModal();

			openJournalModal();

		}
	);

	const tabs =
		modal.querySelectorAll(
			".journal-tab"
		);

	tabs.forEach(tab => {

		tab.addEventListener(
			"click",
			() => {

				tabs.forEach(item => {
					item.classList.remove("active");
				});

				tab.classList.add("active");

				console.log(
					"🧪 JOURNAL MONTH:",
					tab.dataset.month
				);

			}
		);

	});
}

function handleAppClick(event) {

	const journalButton =
		event.target.closest(
			'[data-action="open-journal"]'
		);

	if (!journalButton) {
		return;
	}

	openJournalModal();
}


updateUI();

bindEvents();