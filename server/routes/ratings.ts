import { Router } from 'express';
import pool from '../config/database';

const ratingsRouter = Router();

ratingsRouter.get('/', (req, res) => {
    const sql = 'SELECT * FROM ratings WHERE userId = ? AND mediaType = ?';

    pool.getConnection((err: any, connection: any) => {
        if (err) {
            console.log(err);
            return;
        } 

        connection.query(sql, [req.query.userId, req.query.mediaType], (err: any, rows: any) => {
            if (err) {
                console.log(err);
                return;
            }

            res.send(rows);

            connection.release();  
        })
    })
})

ratingsRouter.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM ratings WHERE userId = ? AND mediaId = ?';

    pool.getConnection((err: any, connection: any) => {
        if (err) {
            console.log(err);
            return;
        } 

        connection.query(sql, [req.query.userId, req.params.id], (err: any, rows: any) => {
            if (err) {
                console.log(err);
                return;
            }

            res.send(rows[0]);

            connection.release();
        })
    })
})

ratingsRouter.post('/add', (req, res) => {
    const sql = 'INSERT INTO ratings (userId, mediaId, mediaType, title, releaseDate, posterPath, voteAverage, overview, runtime, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const { userId, mediaId, mediaType, title, releaseDate, posterPath, voteAverage, overview, runtime, rating } = req.body;
    
    pool.getConnection((err: any, connection: any) => {
        if (err) {
            console.log(err);
            return;
        } 

        connection.query(sql, [userId, mediaId, mediaType, title, releaseDate, posterPath, voteAverage, overview, runtime, rating], (err: any, rows: any) => {
            if (err) {
                console.log(err);
                return;
            }

            res.send({
                data: rows
            })

            connection.release();
        })
    })
})

ratingsRouter.put('/update/:id', (req, res) => {
    const sql = 'UPDATE ratings SET rating = ? WHERE userId = ? AND mediaId = ?';
    
    pool.getConnection((err: any, connection: any) => {
        if (err) {
            console.log(err);
            return;
        } 

        connection.query(sql, [req.query.rating, req.query.userId, req.params.id], (err: any, rows: any) => {
            if (err) {
                console.log(err);
                return;
            }

            res.send({
                data: rows
            })

            connection.release();
        })
    })
})

export default ratingsRouter;