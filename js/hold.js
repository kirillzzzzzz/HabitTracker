const HOLD_TIME = 500;

let animationFrame = null;
let startTime = null;

export function startHold(
	onProgress,
	onComplete,
	reverse = false
) {

	startTime = performance.now();

	// Начальное состояние
	onProgress(reverse ? 1 : 0);


	function animate(time) {

		const elapsed =
			time - startTime;

		const rawProgress = Math.min(
			elapsed / HOLD_TIME,
			1
		);

		const progress = reverse
			? 1 - rawProgress
			: rawProgress;


		onProgress(progress);


		if (rawProgress >= 1) {

			animationFrame = null;
			startTime = null;

			onComplete();

			return;
		}


		animationFrame =
			requestAnimationFrame(animate);
	}


	animationFrame =
		requestAnimationFrame(animate);
}


export function cancelHold(
	onProgress,
	reverse = false
) {

	if (animationFrame !== null) {

		cancelAnimationFrame(animationFrame);

	}


	animationFrame = null;
	startTime = null;


	onProgress(
		reverse ? 1 : 0
	);
}