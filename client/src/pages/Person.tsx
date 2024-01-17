import { Dispatch, SetStateAction } from "react";
import { Clicked } from "../App";
import useAxios from "../components/useAxios";
import '../styles/Person.css';
import { Credits, Details } from "../typeAliases/Person";
import { useNavigate } from "react-router-dom";

const Person = ({ clicked, setClicked }: { clicked: Clicked, setClicked: Dispatch<SetStateAction<Clicked>> }) => {
    const { data: person, loading: personLoading } = useAxios<Details, {}>(`https://movie-db-omega-ten.vercel.app/people/${clicked.id}`, {} as Details, {});
    const { data: credits, loading: creditsLoading } = useAxios<Credits, {}>(`https://movie-db-omega-ten.vercel.app/people/credits/${clicked.id}`, {} as Credits, {});

    const navigate = useNavigate();
    const noImgFound = require('../assets/images/no-image-found.jpg');

    return (
        <div className='person-container'>
            {
                !personLoading ? !creditsLoading && (
                    <>
                        <div>
                            <img className='person-img' src={ person.profile_path ? `https://image.tmdb.org/t/p/w300/${person.profile_path}` : noImgFound } alt={person.name} />
                            <div className='person-sidebar'>
                                <h3>Known For</h3>
                                <p>{ person.known_for_department }</p>
                                <h3>Gender</h3>
                                <p>{ person.gender === 1 ? 'Female' : 'Male' }</p>
                                <h3>Birth Date</h3>
                                <p>{ person.birthday }</p>
                                {
                                    person.deathday && (
                                        <>
                                            <h3>Died</h3>
                                            <p>{ person.deathday }</p>
                                        </>
                                    )
                                }
                                <h3>Place of Birth</h3>
                                <p>{ person.place_of_birth }</p>
                            </div>
                        </div>
                        
                        <div> 
                            <div className='person-info'>
                                <div>
                                    <h2>{ person.name }</h2>
                                    <h3>Biography</h3>
                                    <p>{ person.biography }</p>
                                </div>

                                <div>
                                    <div>
                                        <h3>Known For</h3>
                                    </div>

                                    <div className='known-for'>
                                        {
                                            credits.cast.sort((a, b) => b.vote_count - a.vote_count).map((credit, index) => (
                                                <div key={index} onClick={() => {
                                                    setClicked({ id: credit.id, type: credit.media_type === 'movie' ? 'movie' : 'tv' })
                                                    navigate('/details')
                                                }}
                                                >
                                                    <img src={ person.profile_path ? `https://image.tmdb.org/t/p/w300/${credit.poster_path}` : noImgFound } alt={credit.title} />
                                                    <p>{ credit.media_type === 'movie' ? credit.title : credit.name }</p>
                                                </div>
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
                                                credits.cast.map((credit, index) => (
                                                    <div 
                                                        className='person-credits pointer' 
                                                        key={index}
                                                        onClick={(() => {
                                                            setClicked({ id: credit.id, type: credit.media_type === 'movie' ? 'movie' : 'tv' })
                                                            navigate('/details')
                                                        })}
                                                    >
                                                        <h5>
                                                            { credit.media_type === 'movie' ? credit.title : credit.name }
                                                            { 
                                                                credit.media_type === 'movie' ? 
                                                                credit.release_date.toString().slice(4, 15) : 
                                                                credit.first_air_date.toString().slice(4, 15)  
                                                            }
                                                        </h5> 
                                                        as &nbsp;
                                                        { credit.character }
                                                    </div>
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
                                                credits.crew.map((credit, index) => (
                                                    <div 
                                                        className='person-credits pointer' 
                                                        key={index}
                                                        onClick={(() => {
                                                            setClicked({ id: credit.id, type: credit.media_type === 'movie' ? 'movie' : 'tv' })
                                                            navigate('/details')
                                                        })}
                                                    >
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
                                                ))
                                            }
                                        </>
                                    )
                                }
                            </div>
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

export default Person;