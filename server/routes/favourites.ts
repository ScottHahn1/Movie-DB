import { Router } from 'express';
import pool from '../config/database';

const favouritesRouter = Router();

//get favourites
favouritesRouter.get('/', (req, res) => {
    const sql = 'SELECT * FROM favourites WHERE userId = ? AND mediaType = ?';

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

//get single favourited
favouritesRouter.get('/:userId/:mediaId', (req, res) => {
    const sql = 'SELECT * FROM favourites WHERE userId = ? AND mediaId = ?';

    pool.getConnection((err: any, connection: any) => {
        if (err) {
            console.log(err);
            return;
        } 

        connection.query(sql, [req.params.userId, req.params.mediaId], (err: any, rows: any) => {
            if (err) {
                console.log(err);
                return;
            }

            res.send(rows);

            connection.release();  
        })
    })
})

//post favourite movie
favouritesRouter.post('/add', (req, res) => {
    const sql = 'INSERT INTO favourites (userId, mediaId, title, releaseDate, posterPath, voteAverage, overview, runtime, mediaType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const { title, userId, mediaId, releaseDate, posterPath, voteAverage, overview, runtime, mediaType } = req.body;
    
    if (userId) {
        pool.getConnection((err: any, connection: any) => {
            if (err) {
                console.log(err);
                return;
            } 

            connection.query(sql, [userId, mediaId, title, releaseDate, posterPath, voteAverage, overview, runtime, mediaType], (err: any, rows: any) => {
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
    }
})

//delete movie 
favouritesRouter.delete('/delete/:id', (req, res) => {
    const sql = 'DELETE FROM favourites WHERE userId = ? AND mediaId = ?'

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

            res.send({
                data: rows
            })

            connection.release();
        })
    })
})

export default favouritesRouter;