import { Router } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const tvRouter = Router();
const token = process.env.API_KEY;

//popular
tvRouter.get('/popular', (req, res) => {
    axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${req.query.page}`
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

//on the air
tvRouter.get('/onTheAir', (req, res) => {
    axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${req.query.page}`
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

//top rated
tvRouter.get('/topRated', (req, res) => {
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

export default tvRouter;