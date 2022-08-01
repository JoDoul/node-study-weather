const axios = require('axios');


const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a26523005fcce3ea19972013a750d4ef&query=${latitude},${longitude}`;
    axios({
        method:'get',
        url,
    })
    .then(function (res) {
        if(res.data.error){
            callback('Unable to find forecast. try another search', undefined);
        } else{
            callback(undefined, `${res.data.current.weather_descriptions[0]}. It is crurently ${res.data.current.temperature} degress out. It feels like ${res.data.current.feelslike} degress out. The humidity is ${res.data.current.humidity}%.`);
        }
    })
    .catch(function (err){
        callback('Unable to connect to location services!',undefined)
    })
}

module.exports = forecast;