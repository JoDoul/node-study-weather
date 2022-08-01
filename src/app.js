const path = require("path");
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirecetoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirecetoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "doul Jo"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "doul Jo"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "help me!",
        title: 'help',
        name: 'doul Jo'
    })
})


app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide a address"
        })
    }
        
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
  
        if(error){
            console.log(error);
            return res.send({
                error   
            })
        }   
          
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                console.log(error);
                return res.send({
                    error
                })
            }
            console.log(location);
            console.log(forecastData);
            return res.send({
                location,
                weather: forecastData,
                address: req.query.address
            });
        })
    })    
    
});

app.get('/products', (req, res) => {  
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query);
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'doul Jo',
        errorMessage: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'doul Jo',
        errorMessage: 'Page not found'
    });
})

app.listen(port, () => {
    console.log('server is up on port ' + port);
})