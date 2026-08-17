export function openJournalModal() {

	const modal =
		document.querySelector(
			"#journal-modal"
		);


	if (!modal) return;


	modal.classList.remove(
		"hidden"
	);


	modal.setAttribute(
		"aria-hidden",
		"false"
	);

}


export function closeJournalModal() {

	const modal =
		document.querySelector(
			"#journal-modal"
		);


	if (!modal) return;


	modal.classList.add(
		"hidden"
	);


	modal.setAttribute(
		"aria-hidden",
		"true"
	);

}