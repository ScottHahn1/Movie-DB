import { Link } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Clicked } from '../App';
import useAxios from '../components/useAxios';

type InitialState = {
    results: {
        backdrop_path: 'string',
        genre_ids: [],
        id: number,
        overview: string,
        poster_path: string,
        release_date: string,
        first_air_date: string,
        title: string,
        name: string,
        video: boolean,
        vote_average: number
    }[],
    total_pages: number,
    total_results: number
}

const Upcoming = ({ setClicked }: { setClicked: Dispatch<SetStateAction<Clicked>> }) => {
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { data, loading } = useAxios<InitialState, {page: number}>('http://localhost:8000/movies/upcoming', {} as InitialState, { page: pageNum }, pageNum);

    const noImgFound = require('../assets/images/no-image-found.jpg');

    useEffect(() => {
        data && setTotalPages(data.total_pages);
        data && data.total_pages < 500 && setTotalPages(data.total_pages);
    }, [data])
    
    useEffect(() => {
        totalPages && totalPages > 500 && setTotalPages(500);
    }, [totalPages])

    return (
        <div>
            {
                !loading ? (
                    <div className='data-container'>
                        <h2>Upcoming Movies</h2>

                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {
                                data.results && data.results.map((movie, index) => (
                                    <div key={ index } className='data'>
                                        <Link to='/details'>
                                            <img 
                                                src={ movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : noImgFound } 
                                                onClick={() => setClicked({ id: movie.id, type: 'movie' })}
                                                alt={movie.title}
                                            />
                                        </Link>
                                        <h5>{ movie.title }</h5>
                                        <p> { movie.release_date }</p>
                                    </div>
                                ))
                            }
                        </div>

                        <div className='next'>
                            {
                                pageNum > 2 && (
                                    <button onClick={() => setPageNum(prev => prev - 2)}>{ pageNum - 2 }</button>
                                )
                            }

                            {
                                pageNum > 1 && (
                                    <button onClick={() => setPageNum(prev => prev - 1)}>{ pageNum - 1 }</button>
                                )
                            }

                            { pageNum < totalPages && <button>{ pageNum }</button> }

                            { pageNum + 1 < totalPages && <button onClick={() => setPageNum(prev => prev + 1)}>{ pageNum + 1 }</button> }
                            { pageNum + 2 < totalPages && <button onClick={() => setPageNum(prev => prev + 2)}>{ pageNum + 2 }</button> }
                            { pageNum + 3 < totalPages && <button onClick={() => setPageNum(prev => prev + 3)}>{ pageNum + 3 }</button> }
                            { pageNum + 4 < totalPages && <button onClick={() => setPageNum(prev => prev + 4)}>{ pageNum + 4 }</button> }
                            ...
                            <button onClick={() => setPageNum(500)}>{ totalPages }</button> 
                            { pageNum < totalPages && <button onClick={() => setPageNum(prev => prev + 1)}>Next</button> }
                        </div>

                    </div>
                )
                :
                <div className='loading'>
                </div>
            }
        </div>
    )
}

export default Upcoming;