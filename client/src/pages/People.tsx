import { useEffect, useState } from "react";
import useAxios from "../components/useAxios";
import '../styles/People.css';
import { Link, useSearchParams } from "react-router-dom";
import MorePages from "../components/MorePages";

type PeopleData = {
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

const People = () => {
    const [totalPages, setTotalPages] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;

    const { data: people, loading } = useAxios<PeopleData, { page: number }>(
        'https://movie-db-omega-ten.vercel.app/people/popular', 
        {} as PeopleData, 
        { page }
    );

    const noImgFound = require('../assets/images/no-image-found.jpg');
    
    useEffect(() => {
        if (!people) return;
        setTotalPages(Math.min(people.total_pages, 500))
    }, [people])

    const goToPage = (newPage: number) => {
        searchParams.set('page', newPage.toString());
        setSearchParams(searchParams);
    }

    if (loading) {
        return <div className='loading' />
    }
    
    return (
        <div className='people-container'>
            <div className='heading'>
                <h2>Popular People</h2>
            </div>

            <div className='people'>
                {
                    people.results.map(person => (
                        <div className='person' key={person.id}>
                            <Link to={`/person/${person.id}/${person.name.replace(/\s+/g, '-')}`}>
                                <img 
                                    src={person.profile_path ? `https://image.tmdb.org/t/p/w300/${person.profile_path}` : noImgFound} 
                                    alt={person.name} 
                                />
                                <h4>{person.name}</h4>
                            </Link>
                            { person.known_for_department }
                        </div>
                    ))
                }
            </div>

            <div className='pages' style={{ marginTop: '2rem', marginLeft: '4rem' }}>
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

export default People;