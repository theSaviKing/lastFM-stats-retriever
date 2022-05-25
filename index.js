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
class User {
    image
    url
    plays
    username
    tracks
    constructor(username) {
        function getUser(username, cb) {
            fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getinfo&username=${username}&api_key=b8abde52621d9cdef1158263570d1821&format=json`)
                .then(res => res.json())
                .then(json => cb(json))
        }
        function getTracks(username) {
            const response = fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&username=${username}&api_key=b8abde52621d9cdef1158263570d1821&format=json`)
            response = response.json()
            const tracks = []
            for (let t of response.toptracks.track) {
                tracks.push({
                    name: t.name,
                    image: t.image[3]['#text'],
                    artist: t.artist,
                    url: t.url,
                    duration: parseInt(t.duration),
                    plays: parseInt(t.playcount)
                })
            }
            return tracks
        }
        var crnt
        getUser(username, (data) => {
            crnt = data.user
            console.log(`crnt=${crnt}`)
            this.image = crnt.image[3]['#text']
            this.url = crnt.url
            this.username = crnt.name
            this.plays = crnt.playcount
        })
        console.log(this)
        this.dispatchEvent(objectCreated)
    }
}
// end USER class definition

app.get('/loading', parser, (req, res) => {
    if (Object.keys(req.query).length === 0)
        res.redirect('/')
    console.log(`Username entered: ${req.query.username}`)
    user = new User(req.query.username)
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})