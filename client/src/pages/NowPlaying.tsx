import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxios from '../components/useAxios';
import MorePages from '../components/MorePages';

type Data = {
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

const Popular = () => {
    const [totalPages, setTotalPages] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const { type } = useParams<{ type: string }>();
    const mediaType = type ? type : 'movie';
    const page = Number(searchParams.get('page')) || 1;
    
    const { data, loading } = useAxios<Data, { page: number, mediaType: string }>(
        `https://movie-db-omega-ten.vercel.app/${mediaType}/nowPlaying`,
        {} as Data, 
        { page, mediaType }
    );

    const noImgFound = require('../assets/images/no-image-found.jpg');
    
    useEffect(() => {
        if (!data) return;
        setTotalPages(Math.min(data.total_pages, 500))
    }, [data])

    const goToPage = (newPage: number) => {
        searchParams.set('page', newPage.toString());
        setSearchParams(searchParams);
    }

    if (loading) {
        return <div className='loading' />
    }

    return (
        <div className='data-container'>
            { 
                mediaType === 'movie' ? 
                <h2>Now Showing</h2> 
                : 
                <h2>On The Air</h2> 
            }

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    data.results && data.results.map((movie, index) => (
                        <div key={ index } className='data'>
                            <Link to={
                                mediaType === 'movies' ?
                                `/details/movie/${movie.id}/${movie.title?.replace(/\s+/g, '-')}` 
                                :
                                `/details/tv/${movie.id}/${movie.name?.replace(/\s+/g, '-')}` 
                            }>
                                <img 
                                    src={ movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : noImgFound } 
                                    alt={mediaType === 'movies' ? movie.title : movie.name}
                                />
                            </Link>
                            <h5>
                                { mediaType === 'movies' ? movie.title : movie.name }
                            </h5>
                            <p>
                                { mediaType === 'movies' ? movie.release_date : movie.first_air_date }
                            </p>
                        </div>
                    ))
                }
            </div>

            <div className='pages'>
                {
                    page !== 1 &&
                    <button onClick={() => goToPage(Math.max(page - 1, 1))}>
                        Previous
                    </button>
                }

                <MorePages 
                    currentPage={page} 
                    setSearchParams={setSearchParams} 
                    totalPages={totalPages} 
                />

                {
                    totalPages && page !== totalPages &&
                    <button onClick={() => goToPage(totalPages ? Math.min(page + 1, totalPages) : page + 1)}>
                        Next
                    </button>
                }
            </div>
        </div>
    )
}

export default Popular;