export function getToday() {

	const today = new Date();

	return today.toISOString().split("T")[0];

}

export function getNextDay(date) {

	const current = new Date(`${date}T00:00:00`);

	current.setDate(current.getDate() + 1);

	return [
		current.getFullYear(),
		String(current.getMonth() + 1).padStart(2, "0"),
		String(current.getDate()).padStart(2, "0")
	].join("-");

}

export function formatDate(dateString) {

	const date = new Date(dateString);

	return date.toLocaleDateString("ru-RU", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});

}