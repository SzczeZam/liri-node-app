require("dotenv").config();
var axios = require('axios')
var fs = require('fs')
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);

function brains(inputCmd, inputValue){
    switch (inputCmd){
        case 'concert-this':
            concertThis(inputValue)
            break
            
        case 'spotify-this-song':
            spotifyThisSong(inputValue)
            break

        case 'movie-this':
            movieThis(inputValue)
            break
            
        case 'do-what-it-says':
            doWhatItSays(inputValue)
            break
    }

}


function concertThis(band) {
    console.log(`grabbing concert data
    `)
    var bitURL = `https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`
    axios.get(bitURL)
        .then(function(response){
            var data = response.data
            for (events of data){
                var event = {
                    name : `Venue Name: 
                        ${events.venue.name}`,
                    location : `Location: 
                        ${events.venue.city}, ${events.venue.region}, ${events.venue.country}`,
                    date : `Datetime: 
                        ${events.datetime}`,
                }
                print(event)
            }
        })
        .catch(function(err){
            console.log(err)
        })

}
function spotifyThisSong() {
    console.log(`pulling data from spotify...
    `)
    var search = inputValue
    if (search === undefined) { search = 'Ace of Base The Sign'}
    spotify
        .search({type: 'track', query: search, limit: 2})
        .then(function(response){
            var result = {
                song : `Song Title: 
                    ${response.tracks.items[0].name}`,
                artist : `Artist/s: 
                    ${response.tracks.items[0].artists[0].name}`,
                link : `Preview Link: 
                    ${response.tracks.items[0].preview_url}`,
                album: ` Album: 
                    ${response.tracks.items[0].album.name}`,
            }
            print(result)
        })
        .catch(function(error){
            console.log(error)
        })
    
}
function movieThis(film) {
    console.log(`Combing through the database...
    `)

    var query = film
    if (query === undefined) { query = 'Mr.Nobody'}
    
    var movieURL = `http://www.omdbapi.com/?apikey=trilogy&t=${query}`
    axios.get(movieURL)
        .then(function(response){
            var movie = {
                title: `Title: 
                    ${response.data.Title}`,
                year: `Year Released: 
                    ${response.data.Year}`,
                IMDBrating: `IMDB Rating: 
                    ${response.data.Ratings[0].Value}`,
                RTrating: `Rotten Tomatoes: 
                    ${response.data.Ratings[1].Value}`,
                country: `Publishing Country: 
                    ${response.data.Country}`,
                language: `Language: 
                    ${response.data.Language}`,
                actors: `Actors: 
                    ${response.data.Actors}`,
                plot: `Plot Summary: 
                    ${response.data.Plot}`,
            }
            
            print(movie)

        })
        .catch(function(err){
            console.log(err)
        })
}
function doWhatItSays() {
    console.log('Doing what it says...')
    fs.readFile('./random.txt', 'utf8', function(error, data){
        if(error){console.log(error)}

        data = data.split(',')
        console.log(data)


        newCmd = data[0]
        newValue = data[1]
        console.log
        brains(newCmd,newValue)
    })
}

function print(object){
    console.log(`
    `)
    for (val in object){
        console.log(object[val])      
    }
    console.log(`
    `)
}



var cmd = process.argv[2]
var value = process.argv[3]
brains(cmd,value)