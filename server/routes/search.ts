import axios from 'axios';
import { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const searchRouter = Router();

const token = process.env.API_KEY;

searchRouter.get('/movies', (req, res) => {
    axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET',
        params: req.query,
        url: `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US`
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

searchRouter.get('/shows', (req, res) => {
    axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET',
        params: req.query,
        url: `https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US`
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

searchRouter.get('/people', (req, res) => {
    axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET',
        params: req.query,
        url: `https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US`
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

export default searchRouter;