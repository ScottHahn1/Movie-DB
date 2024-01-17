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

// get single user
// usersRouter.get('/:id' async (req, res) => {
//     const { id } = req.params;
//     pool.getConnection((err: any, connection: any) => {
//         if (err) {
//             console.log(err)
//             res.send({
//                 success: false,
//                 statusCode: 500,
//                 message: 'Error encountered during connection'
//             })
//             return;
//         }
//         connection.query('SELECT * FROM users WHERE id=?', [id], (err: any, rows: any) => {
//             if (err) {
//                 connection.release();
//                 return res.send({
//                     success: false,
//                     statusCode: 400
//                 })
//             }

//             res.send({
//                 message: 'Success',
//                 statusCode: 200,
//                 data: rows
//             })

//             connection.release();
//         })
//     }) 
// })

//register 
usersRouter.post('/register', (req, res) => {
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    const { username, password } = req.body;
    
    bcrypt.hash(password, salt, (err: any, hash: any) => {
        if (err) {
            console.log(err);
        } else {
            pool.query(sql, [username, hash], (err: any, result: any) => {
                if (err) {
                    return res.json({ Message: 'Error signing up' })
                }
                return res.json(result);
            })
        }
    })
})

//check auth middleware
// const verifyJwt = (req: any, res: any, next: any) => {
//     const token = req.headers["access-token"];
//     if (!token) {
//         return res.json('No token found');
//     } else {
//         jwt.verify(token, 'jwtSecretKey', (err: any, decoded: any) => {
//             if (err) {
//                 res.json('Not authenticated');
//             } else {
//                 req.userId = decoded.id;
//                 next();
//             }
//         })
//     }
// }

// // check auth
// usersRouter.get('/checkAuth', verifyJwt, (req, res) => {
//     return res.json('Authenticated');
// })

//login
usersRouter.post('/login', (req, res) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const { username, password } = req.body;
    
    pool.query(sql, [username], (err: any, result: any) => {
        if (err) {
            return res.json({Message: 'ERROR in Node'})
        }
        // console.log(result);
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err: any, response: any) => {
                if (err) {
                    return res.json('Error logging in');
                }
                if (response) {
                    const id = result[0].userId;
                    const token = jwt.sign({ id }, 'jwtSecretKey', { expiresIn: 3600 })
                    return res.json({ login: true, token, result, id, username });
                }
                return res.json({ login: false });
            })
        } else {
            console.log('Login Failed');
        }

    })
})



//register user
// usersRouter.post('/register', async (req, res) => {
//     const { username, password } = req.body;

//     if (username && password) {
//         pool.getConnection((err: any, connection: any) => {
//             if (err) {
//                 console.log(err);

//                 res.send({
//                     success: false,
//                     statusCode: 500,
//                     message: 'Error encountered during connection'
//                 })

//                 return;
//             }

//             bcrypt.hash(password, salt, async (error: any, hash: string) => {
//                 if (error) {
//                     res.send({
//                         success: false,
//                         statusCode: 500,
//                         message: "Error found during connection",
//                     });

//                     return;
//                 } else {
//                     connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err: any, rows: any) => {
//                         if (err.code === 'ER_DUP_ENTRY') {
//                             connection.release();
//                             console.log(err);
//                             return res.send({
//                                 success: false,
//                                 statusCode: 400,
//                                 message: err.code
//                             });
//                         } else if (err) {
//                             connection.release();
//                             console.log(err);
//                             return res.send({
//                                 success: false,
//                                 statusCode: 400,
//                             });
//                         }
                        
//                         console.log(req.body);
//                         res.send({
//                             message: 'Sucess',
//                             statusCode: 200,
//                             // data: rows
//                         });

//                         connection.release();
//                     })
//                 }
//             })
//         })
//     }
// })

//user login
// usersRouter.post('/login', (req, res) => {
//     pool.getConnection((err: any, connection: any) => {
//         if (err) {
//             console.log(err);
//             res.send({
//                 success: false,
//                 statusCode: 500,
//                 message: 'Error encountered during connection'
//             })
//             return;
//         }
//         // console.log(req.body.username)
//         pool.query('SELECT password FROM users WHERE username=?', [req.body.username], (err: any, rows: any) => {
//             if (err) {
//                 connection.release();
//                 res.send({
//                     success: false,
//                     statusCode: 400,
//                     data: err
//                 });
//                 return;
//             }

//             // console.log(rows)

//             const hash = rows[0].password;

//             // Load hash from your password DB.
//             bcrypt.compare(req.body.password, hash, function(err, result) {
//                 if (err) {
//                     res.send({
//                         message: 'failed',
//                         statusCode: 500,
//                         data: err
//                     });
//                 }

//                 if (result) {
//                     res.send({
//                         message: 'Success',
//                         statusCode: 200,
//                         data: {token: generateToken(req.body.username)}
//                     });
//                 } else {
//                     res.send({
//                         message: 'failed',
//                         statusCode: 500,
//                         data: err
//                     });
//                 }
//             });
            
//             connection.release();
//         })
//     })
// })

export default usersRouter;