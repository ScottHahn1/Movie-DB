import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import MorePages from '../components/MorePages';
import { API_URL } from '../config/api';

type TopRatedResponse = {
    results: {
        backdrop_path: string,
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

const TopRated = () => {
    const [totalPages, setTotalPages] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const { type: mediaType } = useParams<{ type: string }>();
    const page = Number(searchParams.get('page')) || 1;

    const { data, loading, error } = useAxios<TopRatedResponse, { page: number }>(
        `${API_URL}/${mediaType}/topRated`,
        { page }
    );

    const noImgFound = require('../assets/images/no-image-found.jpg');

    useEffect(() => {
        if (!data) return;
        setTotalPages(Math.min(data.total_pages, 500));
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
                mediaType === 'movies' ? 
                <h2>Top Rated Movies</h2> 
                : 
                <h2>Top Rated TV Shows</h2> 
            }

            {
                error ? 
                <div className='error'>Error loading top rated {mediaType === 'movies' ? 'movies' : 'TV shows'}.</div>
                :
                (!data || !data.results) && 
                <div className='error'>No top rated {mediaType === 'movies' ? 'movies' : 'TV shows'} available.</div>
            }

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    data?.results?.map(movie => (
                        <div key={movie.id} className='data'>
                            <Link to={
                                mediaType === 'movies' ?
                                `/details/movie/${movie.id}/${movie.title?.replace(/\s+/g, '-')}` 
                                :
                                `/details/tv/${movie.id}/${movie.name?.replace(/\s+/g, '-')}` 
                            }>
                                <img 
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : noImgFound} 
                                    alt={mediaType === 'movies' ? movie.title : movie.name}
                                />
                            </Link>
                            <h5>{mediaType === 'movies' ? movie.title : movie.name}</h5>
                            <p>{mediaType === 'movies' ? movie.release_date : movie.first_air_date}</p>
                        </div>
                    ))
                }
            </div>

              {
                data?.results && (
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
                )
            }
        </div>
    )
}

export default TopRated;