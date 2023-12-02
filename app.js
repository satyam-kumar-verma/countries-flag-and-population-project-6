let searchInputEL = document.getElementById("searchInput");

let resultContainer = document.getElementById("resultContainer");

let loading = document.getElementById("spinner");

let enemyCountry = document.getElementById("enemyCountry");

let searchInputValue;

let gotSearchedCountry;

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
        firstTimeFetchData();
    }
    else{
        for(let eachItem of jsonData){
            if(eachItem.name === searchInputValue){

                gotSearchedCountry = true;

                if(searchInputValue === "Pakistan" || searchInputValue === "China"){
                    enemyCountry.classList.add("enemy-country");
                    enemyCountry.textContent = `${searchInputValue} ki ammi ka bhosda`;
                }
                createAndAppendDetails(eachItem);
            }
        }

        if(gotSearchedCountry === false){
            enemyCountry.textContent = "Not found searched country. Please try another !!";
            enemyCountry.classList.add("enemy-country");
        }
    }
};

function fetchData(){

    gotSearchedCountry = false;

    enemyCountry.textContent = "";
    enemyCountry.classList.remove("enemy-country");
    
    resultContainer.textContent = "";
    loading.classList.remove("d-none");

    searchInputValue = searchInputEL.value;

    if(navigator.onLine){
        null;
    }
    else{
        if(searchInputValue === ""){

            setTimeout(function(){
                loading.classList.add("d-none");

                enemyCountry.textContent = "Check your internet connection. Press backspace key in searchbox to reload";
                enemyCountry.classList.add("enemy-country");

            },500);

            return true;
            
        }
        else{

            setTimeout(function(){
                loading.classList.add("d-none");

                enemyCountry.textContent = "Check your internet connection. Press again same text in searchbox to reload";
                enemyCountry.classList.add("enemy-country");

            },500);

            return true;

        }
    }

    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };

    fetch(url, options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){

        loading.classList.add("d-none");

        console.log(jsonData);

        sendAllData(jsonData);

    });


}

function sendFirstTimeAllData(jsonData){

    for(let eachItem of jsonData){
        createAndAppendDetails(eachItem);
    }
};

function firstTimeFetchData(){

    enemyCountry.textContent = "";
    enemyCountry.classList.remove("enemy-country");

    resultContainer.textContent = "";
    loading.classList.remove("d-none");

    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };

    if(navigator.onLine){
        enemyCountry.textContent = "";
    }
    else{
        
        setTimeout(function(){
            loading.classList.add("d-none");

            enemyCountry.textContent = "Check your internet connection. Press backspace key in searchbox to reload";
            enemyCountry.classList.add("enemy-country");
        },250);
    }

    fetch(url, options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){

        loading.classList.add("d-none");

        sendFirstTimeAllData(jsonData);

    });


}

firstTimeFetchData();

searchInputEL.addEventListener("keyup",fetchData);