import axios from 'axios';
import { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const peopleRouter = Router();
const token = process.env.API_KEY;

//popular
peopleRouter.get('/popular', (req, res) => {
    axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET',
        params: req.query,
        url: 'https://api.themoviedb.org/3/person/popular'
    }).then(response => {
        res.status(200).send(response.data);
    }).catch(err => {
        res.send(err);
    })
})

//person credits 
peopleRouter.get('/credits/:id', (req, res) => {
    if (req.params.id) {
        axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
            url: `https://api.themoviedb.org/3/person/${req.params.id}/combined_credits`
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

//person
peopleRouter.get('/:id', (req, res) => {
    if (req.params.id) {
        axios.request({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
            url: `https://api.themoviedb.org/3/person/${req.params.id}`
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

export default peopleRouter;