'use strict';

let provider = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" ;
let copyright = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a> `
let map, layerGroup;

const showMap = function(){
    map = L.map('js-map').setView([50.8194776, 3.2577263], 13);
    L.tileLayer(provider,{
        attribution: copyright
    }).addTo(map);
    layerGroup = L.layerGroup().addTo(map);
    console.log("showMap is active")
    var marker = L.marker([51.5, -0.09]).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
}

// Init / DOMcontentLoaded
const init = function () {
	console.log('🚀 DOM geladen');
	showMap();
};

document.addEventListener('DOMContentLoaded', init);
