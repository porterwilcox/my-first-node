let express = require('express');
let bp = require('body-parser');
let server = express();
let movies = require('./movies')
let port = 8080

server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))

server.listen(port, () => {
    console.log("Movies can be found at port: ", port)
})

server.get('/movies', (req, res, next) => {
    res.send(movies)
})
server.get('/movies/byindex/:index', (req, res, next) => {
    if (movies[req.params.index]) {
       return res.send(movies[req.params.index])
    }
    res.status(404).send("Not an index of a movie")
})
server.get('/movies/bytitle/:title', (req, res, next) => {
    let movie = movies.find(m => {
        return m.name.toLowerCase() == req.params.title.toLowerCase()
    })
    if (movie) {
        return res.send(movie)
    }
    res.status(404).send("Not a valid movie title")
})
server.get('/movies/years', (req, res, next) => { 
    res.send(movies.sort((a, b) => {
        return a.year-b.year
    }))
})
server.get('/movies/years/:year', (req, res, next) => {
    let yearArr = movies.filter(m => {
        return m.year == req.params.year
    })
    if (yearArr.length){
        return res.send(yearArr)
    }
    res.status(404).send("No movies are logged under that year.")
})
server.get('/movies/ratings/:rating', (req, res, next) => {
    let ratingsArr = movies.filter(m => {
        return m.rating.toLowerCase() == req.params.rating.toLowerCase()
    })
    if (ratingsArr.length){
        return res.send(ratingsArr)
    }
    res.status(404).send("There are no movies with that rating")
})
server.get('/movies/keyword/:keyword', (req, res, next) => {
    let keywordArr = movies.filter(m => {
        return m.tags.includes(req.params.keyword.toLowerCase()) == true
    })
    if (keywordArr.length){
        return res.send(keywordArr)
    }
    res.status(404).send("There aren't any movies with that keyword.")
})