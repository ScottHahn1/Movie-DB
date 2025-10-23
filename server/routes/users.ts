import { Router } from "express";
import pool from "../config/database";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const salt = 10;

const usersRouter = Router();

// get user by username
usersRouter.get('/:username', async (req, res) => {
    pool.getConnection((err: any, connection: any) => {
        if (err) {
            console.log(err);
            res.send({
                success: false,
                statusCode: 500,
                message: 'Error encountered during connection'
            })
            return;
        }
        connection.query('SELECT * FROM users WHERE username=?', [req.params.username], (err: any, rows: any) => {
            if (err) {
                connection.release();
                return res.send({
                    success: false,
                    statusCode: 400
                })
            }

            res.send({
                message: 'Success',
                statusCode: 200,
                data: rows[0]
            })

            connection.release();
        })
    }) 
})

//register 
usersRouter.post('/register', (req, res) => {
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    const { username, password } = req.body;
    
    bcrypt.hash(password, salt, (err: any, hash: any) => {
        if (err) {
            res.send(err);
        } else {
            pool.query(sql, [username, hash], (err: any, result: any) => {
                if (err) {
                    return res.send(err);
                }
                return res.json({ registered: true, result });
            })
        }
    })
})

//login
usersRouter.post('/login', (req, res) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const { username, password } = req.body;
    
    pool.query(sql, [username], (err: any, result: any) => {
        if (err) {
            return res.json({ message: 'Login could not be completed at this time. Please try again later.' })
        }

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err: any, match: boolean) => {
                if (err) {
                    return res.json('Error logging in');
                }
                
                if (match) {
                    const userId = result[0].userId;
                    const token = jwt.sign({ userId, username }, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'none',
                        maxAge: 24 * 60 * 60 * 1000
                    })

                    return res.json({ login: true, userId, username });
                }

                return res.json({ login: false });
            })
        } else {
            return res.json({
                login: false,
                message: 'Invalid username or password.'
            });
        }
    })
})

export default usersRouter;