export function getToday() {

	const today = new Date();

	return today.toISOString().split("T")[0];

}

export function formatDate(dateString) {

	const date = new Date(dateString);

	return date.toLocaleDateString("ru-RU", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});

}