import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useAxios from "./useAxios";
import '../styles/Search.css';
import { Clicked } from "../App";

type Params = { 
    query: string,
    page: number
 }

type InitialData = {
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

type Data = {
    backdrop_path: string,
    genre_ids: [],
    id: number,
    media_type: string,
    overview: string,
    poster_path: string,
    profile_path: string,
    release_date: string,
    first_air_date: string,
    name: string,
    title: string,
    vote_average: number,
    known_for_department: string
}[]

const Search = ({ clicked, setClicked, searched }: { clicked: Clicked, setClicked: Dispatch<SetStateAction<Clicked>>, searched: string }) => {
    const [movies, setMovies] = useState<Data>({} as Data);
    const [shows, setShows] = useState<Data>({} as Data);
    const [people, setPeople] = useState<Data>({} as Data);
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const noImgFound = require('../assets/images/no-image-found.jpg');

    const params = { 
        query: searched,
        page: pageNum
    };

    const { data: moviesData } = useAxios<InitialData, Params>(`http://localhost:8000/search/movies`, {} as InitialData, params, pageNum);
    const { data: showsData } = useAxios<InitialData, Params>(`http://localhost:8000/search/shows`, {} as InitialData, params, pageNum);
    const { data: peopleData } = useAxios<InitialData, Params>(`http://localhost:8000/search/people`, {} as InitialData, params, pageNum);
    
    useEffect(() => {
        Object.keys(moviesData).length && setMovies(moviesData.results);
    }, [moviesData])

    useEffect(() => {
        Object.keys(showsData).length && setShows(showsData.results);
    }, [showsData])

    useEffect(() => {
        Object.keys(peopleData).length && setPeople(peopleData.results);
    }, [peopleData])

    useEffect(() => {
        if (moviesData && showsData && peopleData) {
            if (clicked.type === 'movie') {
                setTotalPages(moviesData.total_pages);
                moviesData.total_pages < 500 && setTotalPages(moviesData.total_pages);
            } else if (clicked.type === 'tv') {
                setTotalPages(showsData.total_pages);
                showsData.total_pages < 500 && setTotalPages(showsData.total_pages);
            } else {
                setTotalPages(peopleData.total_pages);
                showsData.total_pages < 500 && setTotalPages(peopleData.total_pages);
            }
        }
    }, [moviesData, showsData, peopleData, clicked.type])

    useEffect(() => {
        setPageNum(1);
    }, [clicked.type])
    
    useEffect(() => {
        totalPages && totalPages > 500 && setTotalPages(500);
    }, [totalPages])

    return (
        <div className='search-container'>
            <div className='search-results'>
                <div className='search-results-heading' style={{ backgroundColor: 'lightgreen', width: '100%'}}>
                    <h4>Search Results</h4>
                </div>
                <div className={ clicked.type === 'movie' ? 'search-results-type active' : 'search-results-type' } onClick={() => setClicked({ type: 'movie' })}>
                    <p>Movies</p>
                    <span style={{ fontWeight: 'normal' }}>({ moviesData.total_results })</span>
                </div>
                <div className={ clicked.type === 'show' ? 'search-results-type active' : 'search-results-type' } onClick={() => setClicked({ type: 'tv' })}>
                    <p>TV Shows</p>
                    <span style={{ fontWeight: 'normal' }}>({ showsData.total_results })</span>
                </div>
                <div className={ clicked.type === 'person' ? 'search-results-type active' : 'search-results-type' } onClick={() => setClicked({ type: 'person' })}>
                    <p>People</p>
                    <span style={{ fontWeight: 'normal' }}>({ peopleData.total_results })</span>
                </div>
            </div>

            <div className='search-data'>
                {
                    movies.length > 0 && clicked.type === 'movie' && movies.map(movie => (
                        <div className='search-movie'>
                            <div>
                                <img src={ movie.poster_path ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}` : noImgFound } alt={movie.title} />
                            </div>
                            <div>
                                <h4>{movie.title}</h4>
                                <p>{ new Date(movie.release_date).toString().slice(4, 15) }</p>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    ))
                }
                {
                    shows.length > 0 && clicked.type === 'tv' && shows.map(show => (
                        <div className='search-movie'>
                            <div>
                                <img src={ show.poster_path ? `https://image.tmdb.org/t/p/w300/${show.poster_path}` : noImgFound } alt={show.name} />
                            </div>
                            <div>
                                <h4>{show.name}</h4>
                                <p>{new Date(show.first_air_date).toString().slice(4, 15)}</p>
                                <p>{show.overview}</p>
                            </div>
                        </div>
                    ))
                }
                {
                    people.length > 0 && clicked.type === 'person' && people.map(person => (
                        <div className='search-movie'>
                            <div>
                                <img src={ person.poster_path ? `https://image.tmdb.org/t/p/w300/${person.profile_path}` : noImgFound } alt={person.name} />
                            </div>
                            <div>
                                <h4>{person.name}</h4>
                                <p>{person.known_for_department}</p>
                            </div>
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
                <button onClick={() => setPageNum(totalPages)}>{ totalPages }</button> 
                { pageNum < totalPages && <button onClick={() => setPageNum(prev => prev + 1)}>Next</button> }
                <h4>{pageNum}</h4>
            </div>
        </div>
    )
}

export default Search;