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
const travelModal = document.querySelector(".travel__details--modal");

// MapManager - manage everything related to map
class MapManager {
  #map;
  #mapEvent;
  #mapZoom = 13;
  #travel; // For TravelManager instance

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

    this.#map.on("click", this.#mapInfo.bind(this));
  }

  #mapInfo(mapE) {
    this.#mapEvent = mapE; // To reuse it outside this method
    this.#renderMapMarker();

    // Linking to TravelManager class in order to display form
    this.#travel = new TravelManager();
    this.#travel.displayForm();

    travelForm.scrollIntoView({ behavior: "smooth" }); // Scrolling to the form (for smaller device)
  }

  #renderMapMarker() {
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(`Travel`, {
        maxWidth: 400,
        minWidth: 50,
        autoClose: false,
        closeOnClick: false,
      })
      .openPopup();
  }
}

// TravelManager - manage everything related to travel log
class TravelManager {
  #travelLog = [];
  constructor() {
    travelForm.addEventListener("submit", this.#renderTravel.bind(this));
    travelList.addEventListener("click", this.#travelDetails.bind(this));
  }

  displayForm() {
    travelForm.classList.remove("hidden");
  } // Need to expose it to public API as this method is needed even outside of this class

  #renderTravel(e) {
    e.preventDefault();

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const id = Date.now();

    // Rendering on list
    const html = `
       <li class= travel__log flex data-id = ${id}>
            <h2 class="travel__log--heading">${travelPlace.value}</h2>
            <span class="travel__log--date">${day},${month},${year}</span>
          </li>
    `;

    travelList.insertAdjacentHTML("afterbegin", html);

    this.#travelLog.push({
      travelDuration: travelDuration.value,
      travelPlace: travelPlace.value,
      travelCost: travelCost.value,
      travelSummary: travelSummary.value,
      travelDate: day,
      travelMonth: month,
      travelYear: year,
      listId: id,
    });

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

  #travelDetails(e) {
    const el = e.target.closest(".travel__log");
    const travelEl = this.#travelLog.find((travel) => {
      const travelListID = travel.listId + "";
      return travelListID === el.dataset.id;
    });

    const html = `
          <h2 class="travel__modal--heading">${travelEl.travelPlace}</h2>
          <div class="flex">
            <span class="travel__modal--date">${travelEl.travelDate},${travelEl.travelMonth},${travelEl.travelYear}</span>
            <span class="travel__modal--duration">${travelEl.travelDuration}</span>
            <span class="travel__modal--costs">${travelEl.travelCost}</span>
          </div>
          <fieldset class="travel__modal--summary">
            <legend>Summary</legend>
            <p class="summary">
              ${travelEl.travelSummary}
            </p>
          </fieldset>
    `;
    el.classList.add("hidden");
    travelModal.classList.remove("hidden");
    travelModal.insertAdjacentHTML("afterbegin", html);

    setTimeout(function () {
      travelModal.innerHTML = "";
      travelModal.classList.add("hidden");
      el.classList.remove("hidden");
    }, 5000);
  }
}

class App {
  #mapCode;
  constructor() {
    this.#mapCode = new MapManager();
  }
}

const app = new App();
