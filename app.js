let searchInputEL = document.getElementById("searchInput");

let resultContainer = document.getElementById("resultContainer");

let loading = document.getElementById("spinner");

let enemyCountry = document.getElementById("enemyCountry");

let searchInputValue;

let firstTimeNetworkCheck = false;

let firstTimeAllow =  true;

let networkCheck = false;

let allow =  true;


function createAndAppendDetails(eachItem){

    let detailContainer = document.createElement("div");
    detailContainer.classList.add("col-12", "col-md-5", "detail-container", "p-3", "mb-3");
    resultContainer.appendChild(detailContainer);

    let imgEl = document.createElement("img");
    imgEl.classList.add("img-style");
    imgEl.src = eachItem.flag ;
    detailContainer.appendChild(imgEl);

    let subDetailContainer = document.createElement("div");
    subDetailContainer.classList.add("detail-sub-container");
    detailContainer.appendChild(subDetailContainer);

    let countryNameEl = document.createElement("p");
    countryNameEl.classList.add("country-name-style");
    countryNameEl.textContent = eachItem.name ;
    subDetailContainer.appendChild(countryNameEl);

    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.classList.add("country-population-style");
    countryPopulationEl.textContent = eachItem.population ;
    subDetailContainer.appendChild(countryPopulationEl);

};

function sendAllData(jsonData){

    if(searchInputValue === ""){
        FirstTimeFetchData();
    }
    else{
        for(let eachItem of jsonData){
            if(eachItem.name === searchInputValue){
                if(searchInputValue === "Pakistan" || searchInputValue === "China"){
                    enemyCountry.classList.add("enemy-country");
                    enemyCountry.textContent = `${searchInputValue} ki ammi ka bhosda`;
                }
                createAndAppendDetails(eachItem);
            }
        }
    }
};

function fetchData(event){

    networkCheck = false;
    allow = true;

    enemyCountry.textContent = "";
    enemyCountry.classList.remove("enemy-country");
    
    resultContainer.textContent = "";
    loading.classList.remove("d-none");

    searchInputValue = searchInputEL.value;

    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };

    fetch(url, options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){

        networkCheck = true;

        loading.classList.add("d-none");

        console.log(jsonData);

        if(allow === true){
            sendAllData(jsonData);
        }
    });

    setTimeout(function(){
        if(networkCheck === false){

            allow = false;

            loading.classList.add("d-none");

            enemyCountry.textContent = "Check your internet connection";
            enemyCountry.classList.add("enemy-country");

        }
    },5000);

}

function sendFirstTimeAllData(jsonData){

    for(let eachItem of jsonData){
        createAndAppendDetails(eachItem);
    }
};

function FirstTimeFetchData(){

    firstTimeNetworkCheck = false;
    firstTimeAllow = true;

    enemyCountry.textContent = "";
    enemyCountry.classList.remove("enemy-country");

    resultContainer.textContent = "";
    loading.classList.remove("d-none");

    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };

    fetch(url, options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){

        firstTimeNetworkCheck = true;

        loading.classList.add("d-none");

        if(firstTimeAllow === true){
            sendFirstTimeAllData(jsonData);
        }

    });

    setTimeout(function(){
        if(firstTimeNetworkCheck === false){

            firstTimeAllow = false;

            loading.classList.add("d-none");

            enemyCountry.textContent = "Check your internet connection";
            enemyCountry.classList.add("enemy-country");

        }
    },5000);

}

FirstTimeFetchData();

searchInputEL.addEventListener("keyup",fetchData);