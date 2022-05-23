const express = require("express")
const parser =  require("body-parser").json()
const app = express()
const port = 8080
const fetch = require("node-fetch")
var user;

app.use(express.static('public'))
app.set('views', process.cwd() + '/public')

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"))
})

// begin USER class definition
class User {
    constructor(username) {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getinfo&username=${username}&api_key=b8abde52621d9cdef1158263570d1821&format=json`)
            .then(res => res.json())
            .then(
                json => this.user = json.user
            )
        fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&username=${username}&api_key=b8abde52621d9cdef1158263570d1821&format=json`)
            .then(res => res.json())
            .then(
                json => this.tracks = json
            )
        fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&username=${username}&api_key=b8abde52621d9cdef1158263570d1821&format=json`)
        .then(res => res.json())
        .then(
            json => {
                const tracks = []
                for(let t of json.toptracks.track) {
                    tracks.push({
                        name: t.name,
                        image: t.image[3]['#text'],
                        artist: t.artist,
                        url: t.url,
                        duration: parseInt(t.duration),
                        plays: parseInt(t.playcount)
                    })
                }
                this.tracks = tracks
            }
        )
    }

    get image() {
        return user.image[3]['#text']
    }

    get name() {
        return user.name
    }

    get playcount() {
        return user.playcount
    }

    get playlists() {
        return user.playlists
    }
}
// end USER class definition
app.get('/results', parser, (req, res) => {
    if (Object.keys(req.query).length === 0)
        res.redirect('/')
    console.log(`Username entered: ${req.query.username}`)
    data(req.query.username)
    user = new User(req.query.username)
    res.render("results.pug")
})

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})

function data(username) {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&username=${username}&api_key=b8abde52621d9cdef1158263570d1821&format=json`)
        .then(res => res.json())
        .then(
            json => {
                const tracks = [];
                for(let t of json.toptracks.track) {
                    tracks.push({
                        name: t.name,
                        image: t.image[3]['#text'],
                        artist: t.artist,
                        url: t.url,
                        duration: parseInt(t.duration),
                        plays: parseInt(t.playcount)
                    })
                }
                console.log(tracks)
            }
        )
}