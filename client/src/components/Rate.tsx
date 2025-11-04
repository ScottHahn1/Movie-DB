import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/Ratings.css';
import { API_URL } from '../config/api';

type Props = {
    id: number, 
    title: string,
    release_date: string,
    poster_path: string,
    media_type: string,
    vote_average: number, 
    overview: string, 
    runtime: number,
    rating?: number
}

export const Rate = ({ id, title, media_type, release_date, poster_path, vote_average, overview, runtime }: Props) => {
    const [movie, setMovie] = useState<Props>({} as Props);
    const [newRating, setNewRating] = useState<number | null>(null);

    const addMovieRating = (mediaId: number, title: string, mediaType: string, releaseDate: string, posterPath: string, voteAverage: number, overview: string, runtime: number, rating: number) => {
        axios.post(`${API_URL}/ratings/add`, {
            userId: sessionStorage.getItem('userId'),
            mediaId: mediaId,
            mediaType: mediaType,
            title: title,
            releaseDate: releaseDate,
            posterPath: posterPath,
            overview: overview,
            voteAverage: voteAverage,
            runtime: runtime,
            rating: rating
        })
        .then(res => {
            setNewRating(rating);
        })
        .catch(err => console.log(err));
    }

    const getRating = () => {
        axios.get(`${API_URL}/ratings/${id}`, {
            params: { userId: sessionStorage.getItem('userId') }
        })
        .then(res => {
            setMovie(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const updateRating = (newRating: number) => {
        axios({
            method: 'PUT',
            url: `${API_URL}/ratings/update/${id}`,
            params: { 
                userId: sessionStorage.getItem('userId'),
                rating: newRating
            }
        })
        .then(res => {
            setNewRating(newRating);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getRating();
    }, [newRating])

    return (
        <div className='rate'>
            <div className='pointer' onClick={() => movie.rating ? updateRating(1) : addMovieRating(id, title, media_type, release_date, poster_path, vote_average, overview, runtime, 1)}>
                {
                    movie.rating && movie.rating > 0 ? <span className='star'>&#9733;</span> : <span className='star'>&#9734;</span>
                }
            </div>
            <div className='pointer' onClick={() => movie.rating ? updateRating(2) : addMovieRating(id, title, media_type, release_date, poster_path, vote_average, overview, runtime, 2)}>
                {
                    movie.rating && movie.rating > 1 ? <span className='star'>&#9733;</span> : <span className='star'>&#9734;</span>
                }
            </div>
            <div className='pointer' onClick={() => movie.rating ? updateRating(3) : addMovieRating(id, title, media_type, release_date, poster_path, vote_average, overview, runtime, 3)}>
                {
                    movie.rating && movie.rating > 2 ? <span className='star'>&#9733;</span> : <span className='star'>&#9734;</span>
                }
            </div>
            <div className='pointer' onClick={() => movie.rating ? updateRating(4) : addMovieRating(id, title, media_type, release_date, poster_path, vote_average, overview, runtime, 4)}>
                {
                    movie.rating && movie.rating > 3 ? <span className='star'>&#9733;</span> : <span className='star'>&#9734;</span>
                }
            </div>
            <div className='pointer' onClick={() => movie.rating ? updateRating(5) : addMovieRating(id, title, media_type, release_date, poster_path, vote_average, overview, runtime, 5)}>
                {
                    movie.rating && movie.rating > 4 ? <span className='star'>&#9733;</span> : <span className='star'>&#9734;</span>
                }
            </div>
            <div className='pointer' onClick={() => movie.rating ? updateRating(6) : addMovieRating(id, title, media_type, release_date, poster_path, vote_average, overview, runtime, 6)}>
                {
                    movie.rating && movie.rating > 5 ? <span className='star'>&#9733;</span> : <span className='star'>&#9734;</span>
                }
            </div>
            <div className='pointer' onClick={() => movie.rating ? updateRating(7) : addMovieRating(id, title, media_type, release_date, poster_path, vote_average, overview, runtime, 7)}>
                {
                    movie.rating && movie.rating > 6 ? <span className='star'>&#9733;</span> : <span className='star'>&#9734;</span>
                }
            </div>
            <div className='pointer' onClick={() => movie.rating ? updateRating(8) : addMovieRating(id, title, media_type, release_date, poster_path, vote_average, overview, runtime, 8)}>
                {
                    movie.rating && movie.rating > 7 ? <span className='star'>&#9733;</span> : <span className='star'>&#9734;</span>
                }
            </div>
            <div className='pointer' onClick={() => movie.rating ? updateRating(9) : addMovieRating(id, title, media_type, release_date, poster_path, vote_average, overview, runtime, 9)}>
                {
                    movie.rating && movie.rating > 8 ? <span className='star'>&#9733;</span> : <span className='star'>&#9734;</span>
                }
            </div>
            <div className='pointer' onClick={() => movie.rating ? updateRating(10) : addMovieRating(id, title, media_type, release_date, poster_path, vote_average, overview, runtime, 10)}>
                {
                    movie.rating && movie.rating > 9 ? <span className='star'>&#9733;</span> : <span className='star'>&#9734;</span>
                }
            </div>
        </div>
    )
}