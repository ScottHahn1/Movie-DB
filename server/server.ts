import express from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users";
import cors from 'cors';
import moviesRouter from "./routes/movies";
import peopleRouter from "./routes/people";
import searchRouter from "./routes/search";
import favouritesRouter from "./routes/favourites";
import ratingsRouter from "./routes/ratings";
import tvRouter from "./routes/tv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["https://movie-db-frontend-psi.vercel.app"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,

}));

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/tv', tvRouter);
app.use('/people', peopleRouter);
app.use('/search', searchRouter);
app.use('/favourites', favouritesRouter);
app.use('/ratings', ratingsRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});