import useAxios from "../hooks/useAxios";
import '../styles/Person.css';
import { Credits, Details } from "../typeAliases/Person";
import { Link, useParams } from "react-router-dom";
import noImgFound from "../assets/images/no-image-found.jpg";

const Person = () => {
    const { id } = useParams();

    const { data: person, loading: personLoading } = useAxios<Details, {}>(`https://movie-db-omega-ten.vercel.app/people/${id}`, {});
    const { data: credits, loading: creditsLoading } = useAxios<Credits, {}>(`https://movie-db-omega-ten.vercel.app/people/credits/${id}`, {});

    if (personLoading || creditsLoading) {
        return <div className='loading' />
    }

    if (!person) {
        return <div>No data</div>
    }

    if (!credits) {
        return <div>No data</div>
    }

    return (
        <div className='person-container'>
            <>
                <div>
                    <img 
                        className='person-img' 
                        src={person.profile_path ? `https://image.tmdb.org/t/p/w300/${person.profile_path}` : noImgFound} 
                        alt={person.name} 
                    />

                    <div className='person-sidebar'>
                        <h3>Known For</h3>
                        <p>{person.known_for_department}</p>
                        <h3>Gender</h3>
                        <p>{person.gender === 1 ? 'Female' : 'Male'}</p>
                        <h3>Birth Date</h3>
                        <p>{person.birthday}</p>
                        {
                            person.deathday && (
                                <>
                                    <h3>Died</h3>
                                    <p>{person.deathday}</p>
                                </>
                            )
                        }
                        <h3>Place of Birth</h3>
                        <p>{person.place_of_birth}</p>
                    </div>
                </div>
                
                <div> 
                    <div className='person-info'>
                        <div>
                            <h2>{person.name}</h2>
                            <h3>Biography</h3>
                            <p>{person.biography}</p>
                        </div>

                        <div>
                            <div>
                                <h3>Known For</h3>
                            </div>

                            <div className='known-for'>
                                {
                                    credits.cast.sort((a, b) => b.vote_count - a.vote_count).map(credit => (
                                        <Link 
                                            key={credit.id} 
                                            to={
                                                `/details/${credit.media_type === 'movie' ? 
                                                `movie/${credit.id}/${credit.title.replace(/\s+/g, '-')}` : 
                                                `tv/${credit.id}/${credit.name.replace(/\s+/g, '-')}` }`
                                            }
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'column', color: 'black' }}>
                                                <img 
                                                    src={person.profile_path ? `https://image.tmdb.org/t/p/w300/${credit.poster_path}` : noImgFound} 
                                                    alt={credit.title} 
                                                />
                                                <span>{credit.media_type === 'movie' ? credit.title : credit.name}</span>
                                            </div>
                                        </Link>
                                    )).slice(0, 10)
                                }
                            </div>
                        </div>
                    </div>

                    <div className='person-credits-container'>
                        {
                            credits.cast.length > 0 && (
                                <>
                                    <h3>Acting</h3>
                                    {
                                        credits.cast.map(credit => (
                                            <Link 
                                                key={`${credit.id}-${credit.character}`} 
                                                to={
                                                    `/details/${credit.media_type === 'movie' ? 
                                                    `movie/${credit.id}/${credit.title.replace(/\s+/g, '-')}` : 
                                                    `tv/${credit.id}/${credit.name.replace(/\s+/g, '-')}`}`
                                                }
                                            >
                                                <div className='person-credits pointer'>
                                                    <h5>
                                                        {credit.media_type === 'movie' ? credit.title : credit.name}
                                                        { 
                                                            credit.media_type === 'movie' ? 
                                                            credit.release_date.toString().slice(4, 15) : 
                                                            credit.first_air_date.toString().slice(4, 15)  
                                                        }
                                                    </h5> 
                                                    as &nbsp;
                                                    { credit.character }
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </>
                            )
                        }

                        {
                            credits.crew.length > 0 && (
                                <>
                                    <h3>Crew</h3>
                                    {
                                        credits.crew.map(credit => (
                                            <Link 
                                                key={credit.id}
                                                to={
                                                    `/details/${credit.media_type === 'movie' ? 
                                                    `movie/${credit.id}/${credit.title.replace(/\s+/g, '-')}` : 
                                                    `tv/${credit.id}/${credit.name.replace(/\s+/g, '-')}`}`
                                                }
                                            >
                                                <div className='person-credits pointer'>
                                                    <h5>
                                                        { credit.media_type === 'movie' ? credit.title : credit.name }
                                                        { 
                                                            credit.media_type === 'movie' ? 
                                                            credit.release_date.toString().slice(4, 15) : 
                                                            credit.first_air_date.toString().slice(4, 15)  
                                                        }
                                                    </h5> 
                                                    { credit.job }
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </>
        </div>
    )
}

export default Person;