const weatherForm = document.querySelector('form');
const inputElement = document.querySelector('input');
const loadingOrErrorMessage = document.querySelector('#loadingOrError');
const locationMessage = document.querySelector("#location");
const temperatureMessage = document.querySelector("#temperature");
const summaryMessage = document.querySelector("#summary");



weatherForm.addEventListener("submit",(e)=>{
    
    loadingOrErrorMessage.textContent = "Loading...";
    locationMessage.textContent = "";
    temperatureMessage.textContent = "";
    summaryMessage.textContent = "";
    
    e.preventDefault();
    const location = inputElement.value;
    if(!location){
       loadingOrErrorMessage.textContent = "Please provide a location";
       return;
    }
    fetcher(location);
});

const fetcher = (location)=>{

    const url = "/weather?address=" + location;

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                loadingOrErrorMessage.textContent = data.error;
            }
            else{
                loadingOrErrorMessage.textContent = "";
                locationMessage.textContent = "Address: " + data.location;
                temperatureMessage.textContent = "Current temperature: " + data.forecast.temperature;
                summaryMessage.textContent = "Summary: " + data.forecast.summary;
            }
            
        });
    });
}

