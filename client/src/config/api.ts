export const API_URL = process.env.NODE_ENV === 'production' 
? 
'https://movie-db-omega-ten.vercel.app'
: process.env.REACT_APP_API_URL;