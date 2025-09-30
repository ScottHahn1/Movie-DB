import { Link, useParams } from "react-router-dom";
import { CreditsResponse } from "../typeAliases/Credits";
import useAxios from "./useAxios";

const Cast = () => {
    const { id, type } = useParams();

    const { data: credits, loading } = useAxios<CreditsResponse, {}>(
        `https://movie-db-omega-ten.vercel.app/movies/credits/${type}/${id}`, 
        {}
    );

    const noImgFound = require('../assets/images/no-image-found.jpg');

    if (loading) {
        return <div className='loading' />
    }

    return (
        <div className='credits-cast'>
            {
                credits?.cast?.map(person => (
                    <div className='person' key={`${person.id}-${person.character}`}>
                        <Link to={`/person/${person.id}/${person.name.replace(/\s+/g, '-')}`}>
                            <img 
                                src={person.profile_path ? `https://image.tmdb.org/t/p/w300/${person.profile_path}` : noImgFound} 
                                alt={person.name}
                            />

                            <h5>{person.name}</h5>
                        </Link>

                        {person.character}
                    </div>
                ))
            }
        </div>
    )
}

export default Cast;