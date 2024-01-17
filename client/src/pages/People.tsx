import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Clicked } from "../App";
import useAxios from "../components/useAxios";
import '../styles/People.css';
import { Link } from "react-router-dom";

type People = {
    page: number,
    results: {
        id: number,
        known_for: {
            id: number,
            media_type: string,
            poster_path: string,
            title: string,
            release_date: string,
            vote_count: number
        }[],
        known_for_department: string,
        name: string,
        profile_path: string
    }[],
    total_pages: number,
    total_results: number
}

const People = ({ setClicked }: { setClicked: Dispatch<SetStateAction<Clicked>> }) => {
    const [pageNum, setPageNum] = useState(1);
    const { data: people, loading, error } = useAxios<People, { page: number }>('https://movie-db-omega-ten.vercel.app/people/popular', {} as People, {page: pageNum}, pageNum);
    const [totalPages, setTotalPages] = useState(0);

    const noImgFound = require('../assets/images/no-image-found.jpg');
    
    useEffect(() => {
        people && setTotalPages(people.total_pages);
        people && people.total_pages < 500 && setTotalPages(people.total_pages);
    }, [people])
    
    useEffect(() => {
        totalPages && totalPages > 500 && setTotalPages(500);
    }, [totalPages])

    return (
        <div className='people-container'>
            <div className='heading'>
                <h2>Popular People</h2>
            </div>
            <div className='people'>
                {
                    !loading && (
                        people.results.map(person => (
                            <div className='person' key={person.id}>
                                <Link to='/person'>
                                    <img 
                                        src={ person.profile_path ? `https://image.tmdb.org/t/p/w300/${person.profile_path}` : noImgFound } 
                                        alt={ person.name } 
                                        onClick={ () => setClicked({ id: person.id, type: 'person' }) }
                                    />
                                    <h4>{ person.name }</h4>
                                </Link>
                                { person.known_for_department }
                            </div>
                        ))
                    )
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
                <h3>{pageNum}</h3>
            </div>
        </div>
    )
}

export default People;