const axios = require('axios');


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYnllZW9sZ29yaSIsImEiOiJja3kwbmo3c20wMnMxMm5zY3JhbG9qOXZqIn0.QKGY6MntIwuAzurGh59SeA&limit=1&language=kr`;
    
    axios({
        method:'get',
        url,
    })
    .then(function ({data}) {
        if(data.features.length === 0){
            callback('Unable to find location. try another search', undefined);
        } else{
            callback(undefined, {
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                location: data.features[0].place_name
            });
        }
    })
    .catch(function (err){
        callback('Unable to connect to forecast services!',undefined)
    })
}

module.exports = geocode;