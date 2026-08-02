import { app } from "./app.js";
import { saveApp, loadApp } from "./storage.js";
import { createCurrentDay } from "./journal.js";
import { render } from "./ui.js";
import { toggleTracker } from "./tracker.js";

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

	const ui = render(app);

	const trackerButtons =
		document.querySelectorAll(".tracker-button");

	trackerButtons.forEach(button => {

		button.addEventListener("click", () => {

			const trackerId = button.dataset.tracker;

			toggleTracker(app, trackerId);

			commit();

		});

	});

}

commit();