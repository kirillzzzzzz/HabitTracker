const STORAGE_KEY = "habit-tracker";


function validateApp(app) {

	if (!app) {

		return false;

	}

	if (typeof app !== "object") {

		return false;

	}

	if (!app.currentDay) {

		return false;

	}

	if (!app.currentDay.entries) {

		return false;

	}

	return true;

}


export function saveApp(app) {

	const isValid = validateApp(app);

	if (!isValid) {

		return false;

	}

	const json = JSON.stringify(app, null, 2);

	localStorage.setItem(STORAGE_KEY, json);

	return true;

}


export function loadApp() {

	const json = localStorage.getItem(STORAGE_KEY);

	if (!json) {

		return null;

	}

	try {

		let app = JSON.parse(json);

		app = migrateApp(app);

		if (!validateApp(app)) {

			return null;

		}

		return app;

	} catch {

		return null;

	}

}

function migrateApp(app) {

	return app;

}