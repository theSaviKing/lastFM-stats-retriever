const express = require("express")
const parser = require("body-parser").json()
const app = express()
const port = 8080
const fetch = require("node-fetch")
var user;

app.use(express.static('public'))
app.set('views', process.cwd() + '/public')

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"))
})

// begin USER class definition
// `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&username=${username}&api_key=b8abde52621d9cdef1158263570d1821&format=json`
// `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&username=${username}&api_key=b8abde52621d9cdef1158263570d1821&format=json`

// end USER class definition

app.get('/results', parser, (req, res) => {
    if (Object.keys(req.query).length === 0)
        res.redirect('/')
    console.log(`Username entered: ${req.query.username}\nTime period submitted: ${req.query.period}`)
    var user = {}
    // fetch USER INFO
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getinfo&username=${req.query.username}&api_key=b8abde52621d9cdef1158263570d1821&format=json&period=${req.query.period}`)
        .then(response => response.json())
        .then(
            json => {
                user.username = json.user.name
                user.image = json.user.image[3]['#text']
                user.plays = json.user.playcount
                user.url = json.user.url
            })
    // fetch USER TOP TRACKS
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&username=${req.query.username}&api_key=b8abde52621d9cdef1158263570d1821&format=json&period=${req.query.period}`)
        .then(
            res => res.json()
        )
        .then(
            json => {
                console.log("Tracks retrieved...")
                return json.toptracks.track
            }
        )
        .then(tops => {
            const tracks = []
            for (let i = 0; i < 6; i++)
                tracks[i] = {
                    artist: tops[i].artist,
                    image: tops[i].image[3]['#text'],
                    name: tops[i].name,
                    plays: tops[i].playcount,
                    url: tops[i].url,
                    duration: tops[i].duration
                }
            user.tracks = tracks
        })
    // fetch USER TOP ALBUMS
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&username=${req.query.username}&api_key=b8abde52621d9cdef1158263570d1821&format=json&period=${req.query.period}`)
        .then(
            res => res.json()
        )
        .then(
            json => {
                console.log("Albums retrieved...")
                return json.topalbums.album
            }
        )
        .then(tops => {
            const albums = []
            for (let i = 0; i < 6; i++)
                albums[i] = {
                    artist: tops[i].artist,
                    image: tops[i].image[3]['#text'],
                    name: tops[i].name,
                    plays: tops[i].playcount,
                    url: tops[i].url
                }
            user.albums = albums
        })
    // fetch USER TOP ARTISTS
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&username=${req.query.username}&api_key=b8abde52621d9cdef1158263570d1821&format=json&period=${req.query.period}`)
        .then(
            res => res.json()
        )
        .then(
            json => {
                console.log("Artists retrieved...")
                return json.topartists.artist
            }
        )
        .then(tops => {
            const artists = []
            for (let i = 0; i < 6; i++)
                artists[i] = {
                    image: tops[i].image[3]['#text'],
                    name: tops[i].name,
                    plays: tops[i].playcount,
                    url: tops[i].url
                }
            user.artists = artists
        })
        .then(
            () => {
                console.log("User object created!\n")
                res.render('results.pug', {
                    username: user['username'],
                    image: user['image'],
                    plays: user['plays'],
                    url: user['url'],
                    tracks: user['tracks'],
                    albums: user['albums'],
                    artists: user['artists']
                })
            }
        )
        .catch(error => res.render('error.pug', { error: error }))
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})