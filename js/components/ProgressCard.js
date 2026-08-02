export function renderProgressCard(
	completedCount,
	totalCount,
	progress
) {

	return `

        <div class="progress-card">

            <div class="progress-info">

                <span>

                    Сегодня заполнено

                </span>

                <strong>

                    ${completedCount} / ${totalCount}

                </strong>

            </div>

            <div class="progress">

                <div
                    class="progress-fill"
                    style="width:${progress}%"
                ></div>

            </div>

        </div>

    `;

}