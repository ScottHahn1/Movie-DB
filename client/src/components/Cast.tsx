import { Link } from "react-router-dom";
import { CreditsType } from "../typeAliases/Credits";
import useAxios from "./useAxios";
import { Dispatch, SetStateAction } from "react";
import { Clicked } from '../App';

const Cast = ({ clicked, setClicked }: { clicked: Clicked, setClicked: Dispatch<SetStateAction<Clicked>> }) => {
    const { data: credits, loading } = useAxios<CreditsType, {}>(`http://localhost:8000/movies/credits/${clicked.type}/${clicked.id}`, {} as CreditsType, {});

    const noImgFound = require('../assets/images/no-image-found.jpg');

    return (
        <div className='credits-cast'>
            {
                !loading && (
                    credits.cast.map(person => (
                        <div className='person' key={person.id}>
                            <Link to='/person'>
                                <img 
                                    src={  person.profile_path ? `https://image.tmdb.org/t/p/w300/${person.profile_path}` : noImgFound } 
                                    alt={person.name}
                                    onClick={() => setClicked({ id: person.id, type: 'person' })}
                                />

                            </Link>
                            <h5>{ person.name }</h5>
                            { person.character }
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Cast;