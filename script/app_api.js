'use strict';

let startTime = '08';
let endTime = '22';
let locations = '1%2B2';
let categories = '1%2B2';
let days = '1%2B2%2B3';

//#region show functions

const showProgramma = function (jsonObjectMetContainer) {
	try {
		const arrProgramma = jsonObjectMetContainer.data;
		let htmlContent = ``;
		arrProgramma.sort((a, b) => {
			return a.id - b.id;
		});
		// console.log(arrProgramma);
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
		// console.log(htmlContent);
	} catch (error) {
		console.error(error);
	}
};

const showLocations = function (jsonObjectMetContainer) {
	try {
		const locations = jsonObjectMetContainer.data;
		let htmlContent = `<option selected class="js-location-btn">All locations</option>`;

		for (const location of locations) {
			// console.log(location);
			const title = location.omschrijving;
			const id = location.id;

			htmlContent += `
			<option value="${id}">${title}</option>
			`;
		}

		document.querySelector('.js-location-input').innerHTML = htmlContent;

		// listenToFilter();
		getDagen();
	} catch (error) {
		console.error(error);
	}
};

const showDays = function (jsonObjectMetContainer) {
	try {
		const days = jsonObjectMetContainer.data;
		let htmlContent = `<option selected class="js-day-btn">All Dagen</option>`;

		for (const day of days) {
			const title = day.voluit;
			const id = day.id;

			htmlContent += `
			<option value="${id}">${title}</option>
			`;
		}

		document.querySelector('.js-day-input').innerHTML = htmlContent;

		getCategorys();
	} catch (error) {
		console.log(error);
	}
};

const showCategorys = function (jsonObjectMetContainer) {
	try {
		const categorys = jsonObjectMetContainer.data;
		let htmlContent = `<option selected>Alle Categorieën</option>`;

		for (const category of categorys) {
			const title = category.omschrijving;
			const id = category.id;

			htmlContent += `
			<option value="${id}">${title}</option>
			`;
		}

		document.querySelector('.js-category-input').innerHTML = htmlContent;

		listenToFilter();
	} catch (error) {
		console.log(error);
	}
};

//#endregion

//#region get functions

const getProgramma = function () {
	handleData('https://dv-sinksen.herokuapp.com/api/v1/activiteiten/?nopagination=true', showProgramma);
};

const getLocations = function () {
	handleData('https://dv-sinksen.herokuapp.com/api/v1/locaties/?nopagination=true&page=1', showLocations);
	// console.log('getlocations');
};

const getDagen = function () {
	handleData('https://dv-sinksen.herokuapp.com/api/v1/dagen/', showDays);
};

const getCategorys = function () {
	handleData('https://dv-sinksen.herokuapp.com/api/v1/categorieen/?nopagination=true&page=1', showCategorys);
};

const getFiltered = function () {
	console.log(days);
	console.log(categories);
	console.log(locations);
	console.log(endTime);
	console.log(startTime);

	handleData(`https://dv-sinksen.herokuapp.com/api/v1/activiteiten/search/?dagid=${days}&locatieid=${locations}&categorieid=${categories}&omschrijving=&start=${startTime}%3A00&einde=${endTime}%3A00&nopagination=true&page=1`, showProgramma);
};

//#endregion

//#region listen functions

const listenToFilter = function () {
	console.log('start');

	const stime = document.querySelector('.js-stime-input');
	const etime = document.querySelector('.js-etime-input');
	const day = document.querySelector('.js-day-input');
	const location = document.querySelector('.js-location-input');
	const category = document.querySelector('.js-category-input');

	stime.addEventListener('change', function () {
		console.log('start-time clicked');
		let one = this.value;
		startTime = one;
		getFiltered();
	});

	etime.addEventListener('change', function () {
		console.log('end time clicked');
		let two = this.value;
		endTime = two;
		getFiltered();
	});

	day.addEventListener('change', function () {
		console.log('day clicked');
		let day = this.value;
		days = day;
		getFiltered();
	});

	category.addEventListener('change', function () {
		console.log('category clicked');
		let category = this.value;
		categories = category;
		getFiltered();
	});

	location.addEventListener('change', function () {
		console.log('location clicked');
		let location = this.value;
		locations = location;
		getFiltered();
	});
};

//#endregion

const init_api = function () {
	console.log('🚀 DOM-api geladen');
	getProgramma();
	getLocations();
};

document.addEventListener('DOMContentLoaded', init_api);
