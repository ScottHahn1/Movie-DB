import useAxios from '../components/useAxios';
import '../styles/Details.css';
import '../styles/Credits.css';
import { CreditsType } from '../typeAliases/Credits';
import { Link, useParams } from 'react-router-dom';

const Credits = () => {
    const { id, type } = useParams();

    const { data: credits, loading } = useAxios<CreditsType, {}>(`https://movie-db-omega-ten.vercel.app/movies/credits/${type}/${id}`, {} as CreditsType, {});

    const noImgFound = require('../assets/images/no-image-found.jpg');

    if (loading) {
        return <div className='loading' />
    }

    return (
        <div className='credits-crew'>
            <>
                <div className='cast'>
                    <h4>Cast ({ credits.cast.length })</h4>
                    {
                        credits.cast.map(person => (
                            <div className='cast-member' key={person.id}>
                                <Link to={`/person/${person.id}/${person.name.replace(/\s+/g, '-')}`}>
                                    <img 
                                        src={ person.profile_path ? `https://image.tmdb.org/t/p/w300/${person.profile_path}` : noImgFound} 
                                        alt={person.name} 
                                    />
                                </Link>
                                <div>
                                    <p><b>{ person.name }</b></p>
                                    <p>{ person.character }</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className='crew'>
                    <h4>Crew ({ credits.crew.length })</h4>
                    {
                        credits.crew.map(person => (
                            <div className='crew-member' key={`${person.id}-${person.job}`}>
                                <Link to={`/person/${person.id}/${person.name.replace(/\s+/g, '-')}`}>
                                    <img 
                                        src={ person.profile_path ? `https://image.tmdb.org/t/p/w300/${person.profile_path}` : noImgFound } 
                                        alt={person.name} 
                                    />
                                </Link>
                                <div>
                                    <p><b>{ person.name }</b></p>
                                    <p>{ person.job }</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </>
        </div>
    )
}

export default Credits;