const got = require('got');

const geocode = (address, callback)=>{
    geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibGVzdGVyY3Jlc3Q0OSIsImEiOiJjazY0d3BqNjAwM25yM21xcHVvcTI0Y2YyIn0.ANZzqgzUYlHrJMS4nKyiWA&limit=1';
    (async () => {
        try {
            const response = await got( geoUrl ,{responseType: 'json', resolveBodyOnly: true})
            if(response.features[0]){
                const data = {
                    long: response.features[0].center[1],
                    lat: response.features[0].center[0],
                    location: response.features[0].place_name,
                }
                callback(undefined, data)
            }
            else{
                callback("Error: Invalid input",undefined)
            }
        } catch (error) {
            callback('Error: Connectivivty issues',undefined)
        }
    })();
}

module.exports = geocode