import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import '../styles/Details.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { DetailsType } from '../typeAliases/Details';
import { CreditsResponse } from '../typeAliases/Credits';
import Cast from '../components/Cast';
import Facts from '../components/Facts';
import { User } from '../hooks/useAuth';
import { API_URL } from '../config/api';
import FavouritesAndRating from '../components/FavouritesAndRating';
import noImgFound from "../assets/images/no-image-found.jpg";

type Props = {
    user: User | null
}

const Details = ({ user }: Props) => {
    const { id, type } = useParams();

    const { data: details, loading: detailsLoading } = useAxios<DetailsType, {}>(
        `${API_URL}/movies/details/${type}/${id}`, 
        {}
    );

    const { data: credits, loading: creditsLoading } = useAxios<CreditsResponse, {}>(
        `${API_URL}/movies/credits/${type}/${id}`, 
        {}
    );

    const [isFavourited, setIsFavourited] = useState(false);

    useEffect(() => {
        if (user && !detailsLoading && details) {
            const checkIfFavourited = async () => {
                try {
                    const res = await axios.get(`${API_URL}/favourites/${user?.userId}/${details.id}`, {
                        params: { mediaType: type }, 
                        withCredentials: true
                    });
                    res.data.length > 0 ? setIsFavourited(true) : setIsFavourited(false);
                } catch (err) {
                    console.log(err);
                }
            }

            checkIfFavourited();
        }
    }, [user, detailsLoading, details, type])

    if (detailsLoading || creditsLoading) {
        return <div className='loading' />
    }

    if (!details) {
        return <div>No details to show</div>
    }

    return (
        <div className='details-container'>
            <div className='details'>
                <div className='movie-container' style={{ background: `url(https://image.tmdb.org/t/p/w780/${details.backdrop_path})` }}>
                    <img 
                        src={details.poster_path ? `https://image.tmdb.org/t/p/w300/${details.poster_path}` : noImgFound} 
                        alt={ details.title } 
                    />
                    <div className='movie'>
                        <h3>{type === 'movie' ? details.title : details.name}</h3>

                        <div className='rating' 
                            style={{
                                borderColor: (details.vote_average < 4.1) ? 'red' :
                                (details.vote_average > 4 && details.vote_average < 6.1) ? 'yellow' :
                                (details.vote_average > 6 && details.vote_average < 7.1) ? 'orange' :
                                'green' 
                            }}
                        >
                            <b>{Math.ceil(details.vote_average * 10)}%</b>
                        </div>
                        
                        <div className='movie-info'>
                            <p>
                                { type === 'movie' ? details.release_date : details.first_air_date } 
                                &#x2022;
                            </p> 
                            &nbsp;
                            <p>
                                { 
                                    details.genres.length && 
                                    details.genres.map(genre => genre.name).join(', ') } {type === 'movie' && 
                                    <>&#x2022;</>
                                } 
                            </p> 
                            &nbsp;
                            {type === 'movie' && <p>{ details.runtime } Minutes</p>}
                        </div>

                        <div className='overview'>
                            <h4>Overview</h4>
                            <p>{details.overview}</p>
                        </div>

                        <FavouritesAndRating 
                            user={user}
                            isFavourited={isFavourited}
                            setIsFavourited={setIsFavourited}
                            details={details}
                            mediaType={type}
                        />

                        {
                            type === 'movie' ? (
                                <div>
                                    <h4>Director</h4>
                                    <p>
                                        {
                                            credits?.crew && 
                                            credits.crew.length > 0 && 
                                            credits.crew.find(person => person.job === 'Director')?.name
                                        }
                                    </p>
                                </div>
                            )
                            :
                            (
                                <div className='creators'>
                                    { 
                                        details.created_by.length > 0 && details.created_by.map(creator => (
                                            <p>{creator.name} <br></br> Creator</p>
                                        ))
                                    }
                                </div>
                            )
                        }
                        
                    </div>
                </div>
            </div>

            <div className='credits-container'>
                <Cast />
                <Facts />
            </div>

            <div className='full-cast-crew'>
                <Link to={`/credits/${type}/${id}`}>
                    <h3>Full Cast And Crew</h3>
                </Link>
            </div>
        </div>
    )
}

export default Details;