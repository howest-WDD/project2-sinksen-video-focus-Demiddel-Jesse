'use strict';

let provider = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
let copyright = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a> `;
let map, layerGroup;

let markers = [];

const showMap = function () {
	map = L.map('js-map').setView([50.8194776, 3.2577263], 13);
	L.tileLayer(provider, {
		attribution: copyright,
	}).addTo(map);
	layerGroup = L.layerGroup().addTo(map);
	console.log('showMap is active');
};

const showProgramma = function (jsonObjectMetContainer) {
	try {
		const activity = jsonObjectMetContainer.data;
		let htmlContent = ``;

		const img = activity.afbeelding;
		const title = activity.titel;
		const loc = activity.locatie.straatnaam;
		const dag = activity.dag.voluit;
		const stime = activity.start;
		const etime = activity.einde;
		const detail = activity.omschrijving;
		const likes = activity.likes;

		// get the times
		// start time
		const arrStime = stime.split('T');
		const starttime = [arrStime[1].slice(0, 2), arrStime[1].slice(3, 5)];
		// end time
		const arrEtime = etime.split('T');
		const endtime = [arrEtime[1].slice(0, 2), arrEtime[1].slice(3, 5)];

		htmlContent += `
		<div class="col-6 row c-detail__img d-none d-lg-block"><img src="${img}" alt="artist ${title}" class="img-fluid" /></div>
					<div class="col-12 col-lg-4 col-xl-4 offset-lg-1 align-self-center c-detail__txt">
						<div class="mb-3 mb-xl-5">
							<h2>${title}</h2>
							<h4>${loc}</h4>
							<sub>${dag} ${starttime[0]}.${starttime[1]}u - ${endtime[0]}.${endtime[1]}u</sub>
						</div>
						<p>${detail}</p>
						<div class="row c-detail__txt--like">
			<a href="#" class="col-6">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
					<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
				</svg>
				aan favorieten toevoegen
			</a>
			<div class="offset-1 row justify-content-end col-6">
				<a href="#" class="">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
						<path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
					</svg>
					${likes} likes
				</a>
			</div>
		</div>
		</div>
		`;

		// getting coordinates for marker
		const coordinates = activity.locatie.geo_location.coordinates;
		const omschrijving = activity.locatie.omschrijving;
		const straatnaam = activity.locatie.straatnaam;

		const htmlPopupContent = `
                <h5>
                    ${omschrijving}
                </h5>
                <p>
                    ${straatnaam}
                    </br>
                    </br>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                    </svg>
                    ${likes}
                </p>`;
		createLocationMarker(coordinates, htmlPopupContent);

		const group = new L.featureGroup(markers);
		map.fitBounds(group.getBounds());

		document.querySelector('.js-detail').innerHTML = htmlContent;
	} catch (error) {
		console.error(error);
	}
};

const createLocationMarker = function (coordinates, popupContent, id) {
	// console.log(coordinates);
	let marker = L.marker([coordinates[0], coordinates[1]], {
		icon: new L.divIcon({
			html: `<img class="c-leaflet__loc--ico" src="../img/icon-location.svg" height="50" width="50"/>`,
		}),
	}).addTo(layerGroup);
	marker.bindPopup(popupContent);
	markers.push(marker);
};

const getProgramma = function () {
	const id = document.URL;
	const arrid = id.split('?');

	handleData(`https://dv-sinksen.herokuapp.com/api/v1/activiteiten/${arrid[1]}/`, showProgramma);
};

const init_detail = function () {
	console.log('🚀 DOM-api geladen');
	getProgramma();
	showMap();
};

document.addEventListener('DOMContentLoaded', init_detail);
