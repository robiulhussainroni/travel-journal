"use strict";
const mapContainer = document.getElementById("map");
const locationInfo = document.querySelector(".location__info");
const locationInfoLatitude = document.getElementById(
  "location__info--latitude",
);
const locationInfoLongitude = document.getElementById(
  "location__info--longitude",
);

navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude, longitude } = position.coords;
    const map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup("A pretty CSS popup.<br> Easily customizable.")
      .openPopup();
  },
  function () {
    locationInfo.classList.remove("hidden");
  },
);

locationInfo.addEventListener("submit", function (e) {
  e.preventDefault();
  const latitude = +locationInfoLatitude.value;
  const longitude = +locationInfoLongitude.value;

  const map = L.map("map").setView([latitude, longitude], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup("A pretty CSS popup.<br> Easily customizable.")
    .openPopup();
  locationInfo.classList.add("hidden");
});
