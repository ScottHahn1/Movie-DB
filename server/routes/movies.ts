import axios from 'axios';
import { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const moviesRouter = Router();
const token = process.env.API_KEY;

//trending
moviesRouter.get('/trending', (req, res) => {
    axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET',
        url: `https://api.themoviedb.org/3/trending/${req.query.mediaType}/day?language=en-US&page=${req.query.page}`
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

//popular
moviesRouter.get('/popular', (req, res) => {
    axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${req.query.page}`
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

//latest
moviesRouter.get('/latest', (req, res) => {
    axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET',
        url: `https://api.themoviedb.org/3/discover/${req.query.mediaType}?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&${req.query.releaseDate}`
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

//top rated
moviesRouter.get('/topRated', (req, res) => {
    axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET',
        url: `https://api.themoviedb.org/3/${req.query.mediaType}/top_rated?language=en-US&page=${req.query.page}`
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

//now playing
moviesRouter.get('/nowPlaying', (req, res) => {
    axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${req.query.page}`
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

//upcoming
moviesRouter.get('/upcoming', (req, res) => {
    axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${req.query.page}`
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

//details
moviesRouter.get('/details/:mediaType/:id', (req, res) => {
    const { mediaType, id } = req.params;

    if (mediaType && id) {
        axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
            url: `https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`
        }).then(response => {
            res.send(response.data);
        }).catch(err => {
            console.log(err);
            res.send(err);
        })
    }
})

//credits
moviesRouter.get('/credits/:mediaType/:id', (req, res) => {
    const { mediaType, id } = req.params;
    if (mediaType && id) {
        axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
            url: `https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=en-US`
        }).then(response => {
            res.send(response.data);
        }).catch(err => {
            console.log(err);
            res.send(err.message);
        })
    } else {
        res.send('error')
    }
})

export default moviesRouter;