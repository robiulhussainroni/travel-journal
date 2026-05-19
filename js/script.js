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
const travelDuration = document.getElementById("duration");
const travelPlace = document.getElementById("place");
const travelCost = document.getElementById("cost");
const travelSummary = document.getElementById("summary");
const travelList = document.querySelector(".travel__details--list");

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
      this.#getPositionGeoLocation.bind(this),
      function () {
        locationInfo.classList.remove("hidden");
      },
    );
  }

  #getPositionGeoLocation(position) {
    const { latitude, longitude } = position.coords;
    this.#loadMap(latitude, longitude);
  }

  #getPositionDirectly(e) {
    e.preventDefault();
    locationInfo.classList.add("hidden");
    const latitude = +locationInfoLatitude.value;
    const longitude = +locationInfoLongitude.value;

    this.#loadMap(latitude, longitude);
  }

  #loadMap(latitude, longitude) {
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
    travelForm.addEventListener("submit", this.#renderTravel.bind(this));
  }

  displayForm(mapE) {
    this.#mapEvent = mapE;
    travelForm.classList.remove("hidden");
  }

  #renderTravel(e) {
    e.preventDefault();

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    // Rendering on list
    const html = `
       <li class="travel__log flex">
            <h2 class="travel__log--heading">${travelPlace.value}</h2>
            <span class="travel__log--date">${day},${month},${year}</span>
          </li>
    `;

    travelList.insertAdjacentHTML("afterbegin", html);

    // Removing the input value
    travelDuration.value =
      travelPlace.value =
      travelCost.value =
      travelSummary.value =
        "";

    // Hiding the form
    this.#hideForm();
  }

  #hideForm() {
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
