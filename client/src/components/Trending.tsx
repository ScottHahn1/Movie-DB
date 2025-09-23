import { Link } from 'react-router-dom';
import useAxios from './useAxios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type TrendingResponse = {
    results: {
        backdrop_path: 'string',
        genre_ids: [],
        id: number,
        media_type: string,
        overview: string,
        poster_path: string,
        release_date: string,
        first_air_date: string,
        title: string,
        name: string,
        video: boolean,
        vote_average: number
    }[]
}

type Props = {
    setTrendingLoading: Dispatch<SetStateAction<boolean>>
}

const Trending = ({ setTrendingLoading }: Props) => {
    const [mediaType, setMediaType] = useState('movie');

    const { data: trending, loading, error } = useAxios<TrendingResponse, { page: number, mediaType: string }>(
        'https://movie-db-omega-ten.vercel.app/movies/trending', 
        { page: 1, mediaType }
    );

    const noImgFound = require('../assets/images/no-image-found.jpg');

    useEffect(() => {
        if (!loading) {
            setTrendingLoading(true);
        }
    }, [loading, setTrendingLoading])

    if (loading) {
        return <div className='loading' />
    }

    return (
        <div>
            <div className='data-container'>
                <div className='heading-buttons'>
                    <h2>Trending</h2>

                    <button 
                        style={{ backgroundColor: mediaType === 'movie' ? 'rgb(142, 233, 142)' : 'white' }} 
                        onClick={() => setMediaType('movie')}
                    >
                        Movies
                    </button>

                    <button 
                        style={{ backgroundColor: mediaType === 'movie' ? 'white' : 'rgb(142, 233, 142)' }} 
                        onClick={() => setMediaType('tv')}
                    >
                        TV Shows
                    </button>
                </div>

                {
                    error ? 
                    <div className='error'>Error loading trending {mediaType === 'movie' ? 'movies' : 'TV shows'}.</div>
                    :
                    (!trending || !trending.results) && 
                    <div className='error'>No trending {mediaType === 'movie' ? 'movies' : 'TV shows'} available.</div>
                }

                <br></br>

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        mediaType === 'movie' ?
                        trending?.results?.map(movie => (
                            <div key={movie.id} className='data'>
                                <Link to={`/details/movie/${movie.id}/${movie.title?.replace(/\s+/g, '-')}`}>
                                    <img 
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : noImgFound} 
                                        alt={movie.title}
                                    />
                                </Link>

                                <h5>{movie.title}</h5>
                                <p>{movie.release_date}</p>
                            </div>
                        ))
                        :
                        trending?.results?.map(show => (
                            <div key={show.id} className='data'>
                                <Link to={`/details/tv/${show.id}/${show.name?.replace(/\s+/g, '-')}`}>
                                    <img 
                                        src={show.poster_path ? `https://image.tmdb.org/t/p/w500/${show.poster_path}` : noImgFound} 
                                        alt={show.title}
                                    />
                                </Link>

                                <h5>{show.name}</h5>
                                <p>{show.first_air_date}</p>
                            </div>
                        ))                
                    }
                </div>
            </div>
        </div>
    )
}

export default Trending;