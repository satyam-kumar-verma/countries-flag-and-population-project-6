let searchInput = document.getElementById("searchInput");
let resultCountries = document.getElementById("resultCountries");
let loading = document.getElementById("spinner");

function createAndAndAppendDetails(eachCountry) {
    let countryContainer = document.createElement("div");
    countryContainer.classList.add("col-11", "country-card", "d-flex", "flex-row", "col-md-5", "mr-auto", "ml-auto");
    resultCountries.appendChild(countryContainer);

    let countryFlag = document.createElement("img");
    countryFlag.src = eachCountry.flag;
    countryFlag.classList.add("country-flag");
    countryContainer.appendChild(countryFlag);

    let nameAndPopulationContainer = document.createElement("div");
    nameAndPopulationContainer.classList.add("d-flex", "flex-column", "ml-auto", "mr-auto");
    countryContainer.appendChild(nameAndPopulationContainer);

    let nameEl = document.createElement("h1");
    nameEl.classList.add("country-name");
    nameEl.textContent = eachCountry.name;
    nameAndPopulationContainer.appendChild(nameEl);

    let populationEl = document.createElement("p");
    populationEl.classList.add("country-population");
    populationEl.textContent = eachCountry.population;
    nameAndPopulationContainer.appendChild(populationEl);


}

function getAllCountry(event, jsonData) {
    loading.classList.toggle("d-none");
    let inputValue = event.target.value;
    if (inputValue === "") {
        getAllCountryfirstTime();
        return true;
    }
    for (let eachCountry of jsonData) {
        if (eachCountry.name === inputValue) {
            createAndAndAppendDetails(eachCountry);
        }
    }
}



function fetchData(event) {
    loading.classList.toggle("d-none");
    resultCountries.textContent = "";

    let inputValue = searchInput.value;

    let mainUrl = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    }
    fetch(mainUrl, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            getAllCountry(event, jsonData);
        })
}

function getAllCountryfirstTime() {
    loading.classList.toggle("d-none");

    let mainUrl = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    }
    fetch(mainUrl, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            loading.classList.toggle("d-none");
            for (let eachCountry of jsonData) {
                createAndAndAppendDetails(eachCountry);
            }
        })
}

getAllCountryfirstTime();

searchInput.addEventListener("keyup", fetchData);