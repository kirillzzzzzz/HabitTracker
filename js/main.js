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


	currentHold = {

		trackerId,

		value

	};


	startHold(

		progress => {

			button.style.setProperty(
				"--progress",
				progress
			);

		},


		() => {


			setTrackerValue(
				app,
				trackerId,
				value
			);


			commit();


			currentHold = null;


		}

	);


}

function handlePointerUp() {


	if (!currentHold) return;


	cancelHold(

		() => {

			const button =
				document.querySelector(
					`[data-tracker="${currentHold.trackerId}"][data-value="${currentHold.value}"]`
				);


			if (button) {

				button.style.setProperty(
					"--progress",
					0
				);

			}


		}

	);


	currentHold = null;

}

commit();

bindEvents();