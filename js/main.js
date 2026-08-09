import { app } from "./app.js";
import { saveApp, loadApp } from "./storage.js";
import { createCurrentDay } from "./journal.js";
import { render } from "./ui.js";
import { setTrackerValue } from "./tracker.js";
import { setPending, clearPending, startPending, stopPending } from "./pending.js";
import { startHold, cancelHold } from "./hold.js";

const savedApp = loadApp();

let currentHold = null;

if (savedApp) {

	Object.assign(app, savedApp);

}

if (!app.currentDay) {

	app.currentDay = createCurrentDay();

}

function commit() {

	saveApp(app);

	updateUI();

}

function updateUI() {

	render(app);

}

function bindEvents() {

	const appElement = document.querySelector("#app");

	appElement.addEventListener("pointerdown", handlePointerDown);
	appElement.addEventListener("pointerup", handlePointerUp);
	appElement.addEventListener("pointerleave", handlePointerUp);
	appElement.addEventListener("pointercancel", handlePointerUp);

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

			commit();


			currentHold = null;

		},


		reverse

	);

}

function handlePointerUp() {

	if (!currentHold) return;


	const {
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


	currentHold = null;

}

commit();

bindEvents();