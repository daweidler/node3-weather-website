const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGF3ZWlkbGVyIiwiYSI6ImNrdzJnbGVuOTV5a2EydW10eGxkemh3YTIifQ.8d5lQn9KAi3h6i4Fpf5xFA&limit=1'

    request({ url, json:true }, (error, { body }) => {
        // console.log(response.body.features)

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location ' + address + '. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode