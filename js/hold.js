const HOLD_TIME = 1000;

let animationFrame = null;
let startTime = null;


export function startHold(onProgress, onComplete) {

	startTime = performance.now();


	function animate(time) {

		const elapsed = time - startTime;

		const progress = Math.min(
			elapsed / HOLD_TIME,
			1
		);


		onProgress(progress);


		if (progress >= 1) {

			onComplete();

			return;

		}


		animationFrame =
			requestAnimationFrame(animate);

	}


	animationFrame =
		requestAnimationFrame(animate);

}



export function cancelHold(onProgress) {


	if (animationFrame) {

		cancelAnimationFrame(animationFrame);

	}


	animationFrame = null;

	startTime = null;


	onProgress(0);

}