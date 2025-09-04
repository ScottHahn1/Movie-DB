import { Link } from 'react-router-dom';
import useAxios from './useAxios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Clicked } from '../App';

type InitialState = {
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

type Params = {
    mediaType: string,
    releaseDate: string
}

type Props = {
    showLoading: boolean;
}

const Latest = ({ showLoading }: Props) => {
    const [mediaType, setMediaType] = useState('movie');
    const now = new Date();

    const lastMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 30,
    ).toISOString().slice(0, 10);

    const today = new Date().toISOString().slice(0, 10);

    const params = {
        mediaType: mediaType,
        releaseDate: mediaType === 'movie' ? 
        `primary_release_date.gte=${lastMonth}&primary_release_date.lte=${today}` 
        : 
        `air_date.gte=${lastMonth}&air_date.lte=${today}`
    }

    const { data: latest, loading } = useAxios<InitialState, Params>(
        'https://movie-db-omega-ten.vercel.app/movies/latest', 
        {} as InitialState, 
        params
    );

    const noImgFound = require('../assets/images/no-image-found.jpg');

    if (loading && showLoading) {
        return <div className='loading' />
    }

    return (
        <div>
            <div className='data-container'>
                <div className='heading-buttons'>
                    <h2>Latest</h2>
                    <button style={{ backgroundColor: mediaType === 'movie' ? 'rgb(142, 233, 142)' : 'white' }} onClick={() => setMediaType('movie')}>Movies</button>
                    <button style={{ backgroundColor: mediaType === 'movie' ? 'white' : 'rgb(142, 233, 142)' }} onClick={() => setMediaType('tv')}>TV Shows</button>
                </div>

                <br></br>

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        mediaType === 'movie' ?
                        latest?.results?.map(movie => (
                            <div key={movie.id} className='data'>
                                <Link to={`/details/movie/${movie.id}/${movie.title?.replace(/\s+/g, '-')}`}>
                                    <img 
                                        src={ movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : noImgFound } 
                                        alt={movie.title}
                                    />
                                </Link>
                                <h5>{ movie.title }</h5>
                                <p>{ movie.release_date }</p>
                            </div>
                        ))
                        :
                        latest?.results?.map(show => (
                            <div key={show.id} className='data'>
                                <Link to={`/details/tv/${show.id}/${show.name?.replace(/\s+/g, '-')}`}>
                                    <img 
                                        src={ show.poster_path ? `https://image.tmdb.org/t/p/w500/${show.poster_path}` : noImgFound } 
                                        alt={show.title}
                                    />
                                </Link>
                                <h5>{ show.name }</h5>
                                <p>{ show.first_air_date }</p>
                            </div>
                        ))                
                    }
                </div>
            </div>
        </div>
    )
}

export default Latest;