import { app } from "./app.js";
import { saveApp, loadApp } from "./storage.js";
import { createCurrentDay } from "./journal.js";
import { render } from "./ui.js";
import { setTrackerValue } from "./tracker.js";
import { setPending, clearPending, startPending, stopPending } from "./pending.js";

const savedApp = loadApp();

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

	const button = event.target.closest(".tracker-action");

	if (!button) {
		return;
	}

	const trackerId = button.dataset.tracker;
	const rawValue = button.dataset.value;

	let value = null;

	if (rawValue === "true") {
		value = true;
	} else if (rawValue === "false") {
		value = false;
	}

	startPending(trackerId);
	commit();

	const timerId = setTimeout(() => {

		setTrackerValue(app, trackerId, value);

		stopPending(trackerId);
		clearPending(trackerId);

		commit();

	}, 500);

	setPending(trackerId, timerId);

}

function handlePointerUp(event) {

	const button = event.target.closest(".tracker-action");

	if (!button) {
		return;
	}

	const trackerId = button.dataset.tracker;

	clearPending(trackerId);
	stopPending(trackerId);

	commit();

}

commit();

console.log(app);
console.log(app.currentDay);

bindEvents();