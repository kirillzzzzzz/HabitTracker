import { app } from "./app.js";
import { saveApp, loadApp } from "./storage.js";
import { createCurrentDay } from "./journal.js";
import { render } from "./ui.js";
import { setTrackerValue } from "./tracker.js";

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

	appElement.addEventListener("click", handleClick);

}

function handleClick(event) {

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

	setTrackerValue(app, trackerId, value);

	commit();

}

commit();

console.log(app);
console.log(app.currentDay);

bindEvents();