import { useNavigate } from "react-router-dom";
import useAxios from "../components/useAxios";
// import '../styles/Ratings.css';
import { Dispatch, SetStateAction, useState } from "react";
import { Clicked } from "../App";
import axios from "axios";

type Params = { 
    userId: string,
    mediaType: string
 };

type Movies = {
    id: number
    movieId: number,
    posterPath: string,
    title: string,
    releaseDate: string,
    overview: string,
    voteAverage: number,
    runtime: number
}[];

const Ratings = ({ setClicked }: { setClicked: Dispatch<SetStateAction<Clicked>> }) => {
    const [mediaType, setMediaType] = useState('movie');
    const [rerender, setRerender] = useState(false);

    const noImgFound = require('../assets/images/no-image-found.jpg');

    const params = { 
        userId: sessionStorage.getItem('userId')!,
        mediaType: mediaType 
    };
    const { data: movies, loading } = useAxios<Movies, Params>(`http://localhost:8000/ratings`, {} as Movies, params, mediaType);

    const navigate = useNavigate();

    const deleteMovie = (id: number) => {
        axios.delete(`http://localhost:8000/favourites/delete/${id}`)
        .then(res => {
            setRerender(!rerender);
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            {
                !loading && (
                    <div className='favourites'>
                        <div className='heading-buttons'>
                            <h2>{ sessionStorage.getItem('username') }'s Ratings</h2>
                            <button style={{ backgroundColor: mediaType === 'movie' ? 'blue' : 'white' }} onClick={() => setMediaType('movie')}>Movies</button>
                            <button style={{ backgroundColor: mediaType === 'movie' ? 'white' : 'blue' }} onClick={() => setMediaType('tv')}>TV Shows</button>
                        </div>
                        {
                            movies.map(movie => (
                                <div className='saved-movie'>
                                    <div>
                                        <img onClick={() => {
                                                setClicked({ id: movie.movieId, type: 'movie' });
                                                navigate('/details');
                                            }}  
                                            src={ movie.posterPath ? `https://image.tmdb.org/t/p/w300/${movie.posterPath}` : noImgFound } alt={movie.title} 
                                        />
                                    </div>
                                    <div>
                                        <div className='title-rating'>
                                            <h4 
                                                className='pointer'
                                                onClick={() => {
                                                    setClicked({ id: movie.movieId, type: 'movie' });
                                                    navigate('/details');
                                                }} 
                                                >
                                                    { movie.title }
                                            </h4>
                                            <div className='rating' 
                                                style={{
                                                    borderColor: (movie.voteAverage < 4.1) ? 'red' :
                                                    (movie.voteAverage > 4 && movie.voteAverage < 6.1) ? 'yellow' :
                                                    (movie.voteAverage > 6 && movie.voteAverage < 7.1) ? 'orange' :
                                                    'green' 
                                                }}
                                            >
                                                <b>{ Math.ceil(movie.voteAverage * 10) }%</b>
                                            </div>
                                        </div>

                                        { new Date(movie.releaseDate).toString().slice(4, 15) } &nbsp; &#x2022; &nbsp;
                                        { movie.runtime } minutes
                                        <p>{ movie.overview }</p>

                                        <div>
                                            <div>
                                                <p>Rating</p>
                                            </div>
                                            <div className='pointer' onClick={() => deleteMovie(movie.id)}>
                                                <p>Remove</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Ratings;