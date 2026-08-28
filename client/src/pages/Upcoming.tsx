import { Link, useSearchParams } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import MorePages from '../components/MorePages';
import { useEffect, useState } from 'react';
import noImgFound from "../assets/images/no-image-found.jpg";

type UpcomingResponse = {
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

const Upcoming = () => {
    const [totalPages, setTotalPages] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;

    const { data, loading, error } = useAxios<UpcomingResponse, { page: number }>(
        'https://movie-db-omega-ten.vercel.app/movies/upcoming', 
        { page }
    );

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
            <h2>Upcoming Movies</h2>

            {
                error ?
                <div className='error'>Error loading upcoming movies.</div>
                :
                (!data || !data.results) && 
                <div className='error'>No upcoming movies available.</div>
            }

            <div className='movie-show-container'>
                {
                    data?.results?.map(movie => (
                        <div key={movie.id} className='movie-show-card'>
                            <Link to={`/details/movie/${movie.id}/${movie.title?.replace(/\s+/g, '-')}`}>
                                <img
                                    src={ movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : noImgFound } 
                                    alt={movie.title}
                                />
                            </Link>

                            <h5>{movie.title}</h5>
                            <p>{movie.release_date}</p>
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

export default Upcoming;