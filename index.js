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

app.get('/loading', parser, (req, res) => {
    if (Object.keys(req.query).length === 0)
        res.redirect('/')
    console.log(`Username entered: ${req.query.username}`)
    var user = {}
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getinfo&username=${req.query.username}&api_key=b8abde52621d9cdef1158263570d1821&format=json`)
        .then(res => res.json())
        .then(json => {
            user.username = json.user.name
            user.image = json.user.image[3]['#text']
            user.plays = json.user.playcount
            user.url = json.user.url
            console.log(user)
        })
        .then(
            res.render('results.pug', {
                username: user['username'],
                image: user['image'],
                plays: user['plays'],
                url: user['url']
            })
        )
        .catch(error => res.render('error.pug'))
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})