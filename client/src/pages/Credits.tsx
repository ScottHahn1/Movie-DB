import useAxios from '../components/useAxios';
import '../styles/Details.css';
import { Clicked } from '../App';
import '../styles/Credits.css';
import { CreditsType } from '../typeAliases/Credits';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

const Credits = ({ clicked, setClicked }: { clicked: Clicked, setClicked: Dispatch<SetStateAction<Clicked>> }) => {
    const { data: credits, loading } = useAxios<CreditsType, {}>(`https://movie-db-omega-ten.vercel.app/movies/credits/${clicked.type}/${clicked.id}`, {} as CreditsType, {});

    const noImgFound = require('../assets/images/no-image-found.jpg');

    return (
        <div className='credits-crew'>
            {
                !loading ? (
                    <>
                        <div className='cast'>
                            <h4>Cast ({ credits.cast.length })</h4>
                            {
                                credits.cast.map(person => (
                                    <div className='cast-member' key={person.id}>
                                        <Link to='/person'>
                                            <img 
                                                src={ person.profile_path ? `https://image.tmdb.org/t/p/w300/${person.profile_path}` : noImgFound} 
                                                alt={person.name} 
                                                onClick={() => setClicked({ type: 'person', id: person.id })}
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
                                    <div className='crew-member' key={person.id}>
                                        <Link to='/person'>
                                            <img 
                                                src={ person.profile_path ? `https://image.tmdb.org/t/p/w300/${person.profile_path}` : noImgFound } 
                                                alt={person.name} 
                                                onClick={() => setClicked({ type: 'person', id: person.id })}
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
                )
                :
                <div className='loading'>
                </div>
            }
        </div>
    )
}

export default Credits;