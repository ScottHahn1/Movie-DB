import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import '../styles/Search.css';
import SearchResults from "./SearchResults";
import { useParams, useSearchParams } from "react-router-dom";
import MorePages from "./MorePages";
import { API_URL } from "../config/api";

type Params = { 
    query?: string,
    page: number
}

type SearchResponse= {
    results: {
        backdrop_path: string,
        genre_ids: [],
        id: number,
        media_type: string,
        overview: string,
        poster_path: string,
        profile_path: string,
        release_date: string,
        title: string,
        vote_average: number,
        first_air_date: string,
        name: string,
        known_for_department: string
    }[],
    total_pages: number,
    total_results: number
}

const Search = () => {
    const [totalPages, setTotalPages] = useState(0);
    const [searchResultsType, setSearchResultsType] = useState('movies');

    const [searchParams, setSearchParams] = useSearchParams();
    const { query } = useParams<{ query: string }>();
    const page = Number(searchParams.get('page')) || 1;

    const params = { 
        query,
        page,
        limit: 20
    };

    const { data: movies, loading: moviesLoading } = useAxios<SearchResponse, Params>(
        `${API_URL}/search/movies`, params
    );
    
    const { data: shows, loading: showsLoading } = useAxios<SearchResponse, Params>(
        `${API_URL}/search/shows`, params
    );
    
    const { data: people, loading: peopleLoading } = useAxios<SearchResponse, Params>(
        `${API_URL}/search/people`, params
    );

    useEffect(() => {
        if (movies && shows && people) {
            if (searchResultsType === 'movies') {
                setTotalPages(movies.total_pages);
            } else if (searchResultsType === 'shows') {
                setTotalPages(shows.total_pages);
            } else if (searchResultsType === 'people') {
                setTotalPages(people.total_pages);
            }
        }
    }, [movies, shows, people, page, searchResultsType])

    const handleSearchTypeChange = (type: string) => {
        setSearchResultsType(type);
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('page', '1');
            return newParams;
        });
    }

    const goToPage = (newPage: number) => {
        searchParams.set('page', newPage.toString());
        setSearchParams(searchParams);
    }

    if (moviesLoading || showsLoading || peopleLoading) {
        return <div className='loading' />
    }

    return (
        <div className='search-container'>
            <div className='search-results'>
                <div className='search-results-heading' style={{ backgroundColor: 'lightgreen', width: '100%'}}>
                    <h4>Search Results</h4>
                </div>

                <div 
                    className={ searchResultsType === 'movies' ? 'search-results-type active' : 'search-results-type' } 
                    onClick={() => handleSearchTypeChange('movies')}
                >
                    <span>Movies</span>
                    <span style={{ fontWeight: 'normal' }}>({ movies?.total_results })</span>
                </div>
                
                <div 
                    className={ searchResultsType === 'shows' ? 'search-results-type active' : 'search-results-type' } 
                    onClick={() => handleSearchTypeChange('shows')}
                >
                    <span>TV Shows</span>
                    <span style={{ fontWeight: 'normal' }}>({ shows?.total_results })</span>
                </div>

                <div 
                    className={ searchResultsType === 'people' ? 'search-results-type active' : 'search-results-type' } 
                    onClick={() => handleSearchTypeChange('people')}
                >
                    <span>People</span>
                    <span style={{ fontWeight: 'normal' }}>({ people?.total_results })</span>
                </div>
            </div>

            <div className='search-data'>
                {
                    searchResultsType === 'movies' && 
                    movies &&
                    movies?.results?.length > 0 &&
                    movies?.results?.map(movie => (
                        <SearchResults 
                            key={movie.id}
                            id={movie.id}
                            image={movie.poster_path} 
                            name={movie.title} 
                            overview={movie.overview}
                            releaseDate={movie.release_date} 
                            searchResultsType={searchResultsType} 
                        />
                    ))
                }

                {
                    searchResultsType === 'shows' && 
                    shows &&
                    shows?.results?.length > 0 &&
                    shows?.results?.map(show => (
                        <SearchResults 
                            key={show.id}
                            id={show.id}
                            image={show.poster_path} 
                            name={show.name} 
                            overview={show.overview} 
                            releaseDate={show.first_air_date}
                            searchResultsType={searchResultsType} 
                        />
                    ))
                }

                {
                    searchResultsType === 'people' && 
                    people &&
                    people?.results?.length > 0 &&
                    people?.results?.map(person => (
                        <SearchResults 
                            key={person.id}
                            actingCredits={person.known_for_department}
                            id={person.id}
                            image={person.poster_path} 
                            name={person.name} 
                            searchResultsType={searchResultsType} 
                        />
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

export default Search;