const info = document.getElementById("float");
const showInfo = document.querySelector(".show-info");
const closeInfo = document.querySelector(".close");

const latitude = document.querySelector('.lat').textContent;
const longitude = document.querySelector('.long').textContent;
const mymap = L.map('info').setView([latitude, longitude], 13);


const publicToken = "pk.eyJ1Ijoiam9lOTV1eCIsImEiOiJja3NhdWw0bGYwMGxjMm9udTJyc2pkNmxsIn0.pisRBrGjZpETQjtIOtkl4Q";

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + publicToken, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: publicToken
}).addTo(mymap);

var marker = L.marker([latitude, longitude]).addTo(mymap);

var circle = L.circle([latitude, longitude], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);

marker.bindPopup("<b>Hello there!</b><br>This is your location.").openPopup();
circle.bindPopup("I am a circle.");

// show and hide info
closeInfo.addEventListener("click", ()=>{
    info.classList.add("active-info");
})

showInfo.addEventListener("click", ()=>{
    info.classList.remove("active-info");
})