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

const Latest = ({ url, setClicked }: { url: string, setClicked: Dispatch<SetStateAction<Clicked>> }) => {
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
        releaseDate: mediaType === 'movie' ? `primary_release_date.gte=${lastMonth}&primary_release_date.lte=${today}` : `air_date.gte=${lastMonth}&air_date.lte=${today}`
    }

    const { data, loading } = useAxios<InitialState, Params>(url, {} as InitialState, params, mediaType);

    const noImgFound = require('../assets/images/no-image-found.jpg');

    return (
        <div>
            { 
                !loading && (
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
                            data.results.map((movie, index) => (
                                <div key={ index } className='data'>
                                    <Link to='/details'>
                                        <img 
                                            src={ movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : noImgFound } 
                                            onClick={() => setClicked({ id: movie.id, type: 'movie' })}
                                        />
                                    </Link>
                                    <h5>{ movie.title }</h5>
                                    <p>{ movie.release_date }</p>
                                </div>
                            ))
                            :
                            data.results.map((show, index) => (
                                <div key={ index } className='data'>
                                    <Link to='/details'>
                                        <img 
                                            src={ show.poster_path ? `https://image.tmdb.org/t/p/w500/${show.poster_path}` : noImgFound } 
                                            onClick={() => setClicked({ id: show.id, type: 'tv' })}
                                        />
                                    </Link>
                                    <h5>{ show.name }</h5>
                                    <p>{ show.first_air_date }</p>
                                </div>
                            ))                
                        }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Latest;