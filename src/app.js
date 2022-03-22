const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const hbs = require('hbs')

const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Dynamic Weather App',
        name: 'Dave W'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Dave',
        name: 'Dave W'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        hmessage: 'Special Dynamic error',
        title: 'Help',
        name: 'Dave W'
    })
})

app.get('/weather', (req, res) => {
   
    if (!req.query.address) {
        res.send({ error : 'You must provide an address'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
            if (error) {
                return res.send({ error }) 
            }
            
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
            }
        
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
                latitude,
                longitude
            })
                // console.log(location)
                // console.log(forecastData)
            })
        })
    }
        
    
    
    
    
    
    // if(!req.query.address) {
    //     return res.send({
    //         error: 'You must provide an address'
    //     })

    // }
    // res.send({
    //     forecast: 'Sunny and mild',
    //     location: 'Tigard Oregon',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dave W',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dave W',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000.')
})