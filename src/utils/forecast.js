const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c3e45aa888ae51de3a0f2938033c3b33&query=' + latitude + ',' + longitude + '&units=f'
    // const url = 'http://api.weatherstack.com/current?access_key=c3e45aa888ae51de3a0f2938033c3b33&units=f&query='

    // request({ url: url, json: true }, (error, response) => {
    request({ url, json: true }, (error, { body }) => {
        // console.log(response.body.location.name)
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, "It is currently " + body.current.temperature + " degrees out and " + body.current.weather_descriptions[0] + ".  It feels like " + body.current.feelslike + " degrees out")
        }
    })
}



module.exports = forecast