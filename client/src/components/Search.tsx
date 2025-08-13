import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import '../styles/Search.css';
import SearchResults from "./SearchResults";
import { useParams } from "react-router-dom";
import MorePages from "./MorePages";

type Params = { 
    query?: string,
    page: number
}

type Data = {
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
    const { query } = useParams();
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [searchResultsType, setSearchResultsType] = useState('movies');

    const params = { 
        query,
        page: pageNum,
        limit: 20
    };

    const { data: movies } = useAxios<Data, Params>(`https://movie-db-omega-ten.vercel.app/search/movies`, {} as Data, params, pageNum);
    const { data: shows } = useAxios<Data, Params>(`https://movie-db-omega-ten.vercel.app/search/shows`, {} as Data, params, pageNum);
    const { data: people } = useAxios<Data, Params>(`https://movie-db-omega-ten.vercel.app/search/people`, {} as Data, params, pageNum);

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
    }, [movies, shows, people, pageNum, searchResultsType])

    const handleSearchTypeChange = (type: string) => {
        setSearchResultsType(type);
        setPageNum(1);
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
                    <span style={{ fontWeight: 'normal' }}>({ movies.total_results })</span>
                </div>
                <div 
                    className={ searchResultsType === 'shows' ? 'search-results-type active' : 'search-results-type' } 
                    onClick={() => handleSearchTypeChange('shows')}
                >
                    <span>TV Shows</span>
                    <span style={{ fontWeight: 'normal' }}>({ shows.total_results })</span>
                </div>
                <div 
                    className={ searchResultsType === 'people' ? 'search-results-type active' : 'search-results-type' } 
                    onClick={() => handleSearchTypeChange('people')}
                >
                    <span>People</span>
                    <span style={{ fontWeight: 'normal' }}>({ people.total_results })</span>
                </div>
            </div>

            <div className='search-data'>
                {
                    movies?.results?.length > 0 &&
                    searchResultsType === 'movies' && 
                    movies.results.map(movie => (
                        <SearchResults 
                            key={movie.id}
                            image={movie.poster_path} 
                            name={movie.title} 
                            overview={movie.overview}
                            releaseDate={movie.release_date} 
                            searchResultsType={searchResultsType} 
                        />
                    ))
                }

                {
                    shows?.results?.length > 0 &&
                    searchResultsType === 'shows' && 
                    shows.results.map(show => (
                        <SearchResults 
                            key={show.id}
                            image={show.poster_path} 
                            name={show.name} 
                            overview={show.overview} 
                            releaseDate={show.first_air_date}
                            searchResultsType={searchResultsType} 
                        />
                    ))
                }

                {
                    people?.results?.length > 0 &&
                    searchResultsType === 'people' && 
                    people.results.map(person => (
                        <SearchResults 
                            key={person.id}
                            actingCredits={person.known_for_department}
                            image={person.poster_path} 
                            name={person.name} 
                            searchResultsType={searchResultsType} 
                        />
                    ))
                }
            </div>

            <div className='pages'>

            {
                pageNum !== 1 &&
                <button onClick={() => setPageNum(page => Math.max(page - 1, 1))}>
                    Previous
                </button>
            }

            <MorePages pageNum={pageNum} setPageNum={setPageNum} totalPages={totalPages} />

            {
                totalPages && pageNum !== totalPages &&
                <button 
                    onClick={
                        () => setPageNum(page => (totalPages ? Math.min(page + 1, totalPages) : page + 1))
                    } 
                >
                    Next
                </button>
            }

            </div>
        </div>
    )
}

export default Search;