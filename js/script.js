"use strict";
const mapContainer = document.getElementById("map");
const locationInfo = document.querySelector(".location__info");
const locationInfoLatitude = document.getElementById(
  "location__info--latitude",
);
const locationInfoLongitude = document.getElementById(
  "location__info--longitude",
);
const travelForm = document.querySelector(".travel__form");

// MapManager - manage everything related to map
class MapManager {
  #map;
  #mapZoom = 13;

  constructor() {
    this.#getPosition();
    locationInfo.addEventListener(
      "submit",
      this.#getPositionDirectly.bind(this),
    );
  }

  #getPosition() {
    navigator.geolocation.getCurrentPosition(
      this.#loadMap.bind(this),
      function () {
        locationInfo.classList.remove("hidden");
      },
    );
  }

  #getPositionDirectly(e) {
    e.preventDefault();
    const latitude = +locationInfoLatitude.value;
    const longitude = +locationInfoLongitude.value;

    this.#map = L.map("map").setView([latitude, longitude], this.#mapZoom);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker([latitude, longitude])
      .addTo(this.#map)
      .bindPopup("A pretty CSS popup.<br> Easily customizable.")
      .openPopup();
    locationInfo.classList.add("hidden");
  }

  #loadMap(position) {
    const { latitude, longitude } = position.coords;
    this.#map = L.map("map").setView([latitude, longitude], this.#mapZoom);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker([latitude, longitude])
      .addTo(this.#map)
      .bindPopup("A pretty CSS popup.<br> Easily customizable.")
      .openPopup();

    const travel = new TravelManager();
    this.#map.on("click", travel.displayForm.bind(travel));
  }
}

// TravelManager - manage everything related to travel log
class TravelManager {
  #travelLog = [];
  #mapEvent;
  constructor() {
    travelForm.addEventListener("submit", this.#hideForm);
  }

  displayForm(mapE) {
    this.#mapEvent = mapE;
    travelForm.classList.remove("hidden");
  }

  #hideForm(e) {
    e.preventDefault();
    travelForm.classList.add("hidden");
  }
}

class App {
  #mapCode;
  constructor() {
    this.#mapCode = new MapManager();
  }
}

const app = new App();
