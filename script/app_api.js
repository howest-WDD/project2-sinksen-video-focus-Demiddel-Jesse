'use strict';

const showProgramma = function (jsonObjectMetContainer) {
	try {
		const arrProgramma = jsonObjectMetContainer.data;
		let htmlContent = ``;
		arrProgramma.sort((a, b) => {
			return a.id - b.id;
		});
		console.log(arrProgramma);
		for (const artist of arrProgramma) {
			const title = artist.titel;
			const img = artist.afbeelding;
			const loc = artist.locatie.straatnaam;
			const dag = artist.dag.voluit;
			const stime = artist.start;
			const etime = artist.einde;
			const id = artist.id;

			// get the times
			// start time
			const arrStime = stime.split('T');
			const starttime = [arrStime[1].slice(0, 2), arrStime[1].slice(3, 5)];
			// end time
			const arrEtime = etime.split('T');
			const endtime = [arrEtime[1].slice(0, 2), arrEtime[1].slice(3, 5)];

			// console.log(artist);

			htmlContent += `
            <a href="detailartist.html?${id}" class=" col-12 col-sm-6 col-lg-2">
            <div class="c-card">
					<div class="card bg-dark text-white mr-1">
						<img src="${img}" class="card-img" alt="${title}" height="400" width="100%" />
						<div class="card-img-overlay c-card__gradient d-flex align-items-end">
							<div class="">
								<h5 class="card-title">${title}</h5>
								<p class="card-text c-card__text">${loc}</p>
								<p class="card-text">
									${dag} <br />
									${starttime[0]}.${starttime[1]}u - ${endtime[0]}.${endtime[1]}u
								</p>
							</div>
						</div>
					</div>
				</div>
            </a>
            `;
		}
		document.querySelector('.js-programma').innerHTML = htmlContent;
	} catch (error) {
		console.error(error);
	}
};

const getProgramma = function () {
	handleData('https://dv-sinksen.herokuapp.com/api/v1/activiteiten/?nopagination=true', showProgramma);
};

const init_api = function () {
	console.log('🚀 DOM-api geladen');
	getProgramma();
};

document.addEventListener('DOMContentLoaded', init_api);
