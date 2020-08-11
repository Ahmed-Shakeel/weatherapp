const got = require('got');


const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/4f3e28c734584c3f281edfedf87b58ce/' + lat + ',' + long + '?units=si';
    (async () => {
        try{
            const response = await got( url ,{responseType: 'json', resolveBodyOnly: true})
                data = {
                    temperature: response.currently.temperature,
                    summary: response.daily.summary
                }
                console.log(response.currently.temperature);
                callback(undefined,data)            
    
        }catch (error){
                callback("Error provide a correct address",undefined)
        }
    })();
}


module.exports = forecast;