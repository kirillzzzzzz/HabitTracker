const STORAGE_KEY = "habit-tracker";

export function saveApp(app) {

	const json = JSON.stringify(app, null, 2);

	localStorage.setItem(STORAGE_KEY, json);

}

export function loadApp() {

	const json = localStorage.getItem(STORAGE_KEY);

	if (!json) {

		return null;

	}

	return JSON.parse(json);

}