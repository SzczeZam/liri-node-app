require("dotenv").config();
var axios = require('axios')
var fs = require('fs')
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var inputCmd = process.argv[2]
var inputValue = process.argv[3]

function concertThis() {
    console.log('selected "concert-this" command')
    var bitURL = `https://rest.bandsintown.com/artists/${inputValue}/events?app_id=codingbootcamp`
    axios.get(bitURL)
        .then(function(response){
            var data = response.data
            for (events in data){
                console.log(events.venue)
            }
    
               
                
                    // location: `${event.venue.city},${event.venue.region},${event.venue.country}`,
                    // date: event.datetime,
                
            
        })

    
        .catch(function(err){
            console.log(err)
        })

    }

switch (inputCmd){
    case 'concert-this':
        concertThis()
        break

    case 'spotify-this-song':

        break

    case 'movie-this':

        break

    case 'do-what-it-says':

        break
}