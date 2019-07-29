require("dotenv").config();
var axios = require('axios')
var fs = require('fs')
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);


var inputCmd = process.argv[2]
var inputValue = process.argv[3]

function brains(){


    switch (inputCmd){
        case 'concert-this':
            concertThis()
            break
            
        case 'spotify-this-song':
            spotifyThisSong()
            break

        case 'movie-this':
            movieThis()
            break
            
        case 'do-what-it-says':
            doWhatItSays()
            break
    }

}


function concertThis() {
    console.log('grabbing concert data')
    var bitURL = `https://rest.bandsintown.com/artists/${inputValue}/events?app_id=codingbootcamp`
    axios.get(bitURL)
        .then(function(response){
            var data = response.data
            for (events of data){
                var event = {
                    name : events.venue.name,
                    location : `${events.venue.city}, ${events.venue.region}, ${events.venue.country}`,
                    date : events.datetime
                }
                console.table([event])
            }
        })
        .catch(function(err){
            console.log(err)
        })

}
function spotifyThisSong() {
    console.log('pulling data from spotify')
    var search = inputValue
    if (search === undefined) { search = 'Ace of Base The Sign'}
    spotify
        .search({type: 'track', query: search, limit: 2})
        .then(function(response){
            var result = {
                song : response.tracks.items[0].name,
                artist : response.tracks.items[0].artists[0].name,
                link : response.tracks.items[0].preview_url,
                album: response.tracks.items[0].album.name,
            }
            console.table(result)
        })
        .catch(function(error){
            console.log(error)
        })
    
}
function movieThis() {
    console.log('combing through IMDB')
    var query = inputValue
    if (query === undefined) { query = 'Mr.Nobody'}
    
    var movieURL = `http://www.omdbapi.com/?apikey=trilogy&t=${query}`
    axios.get(movieURL)
        .then(function(response){
            console.log(response.data)
            var movie = {
                title: response.data.Title,
                year: response.data.Year,
                IMDBrating: response.data.Ratings[0].Value,
                RTrating: response.data.Ratings[1].Value,
                country: response.data.Country,
                language: response.data.Language,
                actors: response.data.Actors,
                plot: response.data.Plot,
            }
            console.log(movie)
            
        })
        .catch(function(err){
            console.log(err)
        })
}
function doWhatItSays() {
    console.log('Doing what it says...')
    fs.read('./random.txt', 'utf8', function(error, data){
        if(error){console.log(error)}

        data = data.split(',')
        console.log(data)


        inputCmd = data[0]
        inputValue = data[1]
    })
    brains()
}

brains()