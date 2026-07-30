import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import '../styles/Favourites.css';
import { useState } from "react";
import axios from "axios";
import { User } from "../hooks/useAuth";
import { API_URL } from "../config/api";
import noImgFound from '../assets/images/no-image-found.jpg';

type Params = { 
    userId: string | number | undefined,
    mediaType: string
}

type Movies = {
    id: number
    mediaId: number,
    posterPath: string,
    title: string,
    releaseDate: string,
    overview: string,
    voteAverage: number,
    runtime: number,
    mediaType: string,
    name: string,
}[]

type Props = {
    user: User | null
}

const Favourites = ({ user }: Props) => {
    const [mediaType, setMediaType] = useState('movie');
    const [rerender, setRerender] = useState(false);

    const params = {
        userId: user?.userId,
        mediaType: mediaType
    }

    const { data, loading } = useAxios<Movies, Params>(
        `${API_URL}/favourites`, 
        params, 
        true
    );

    const navigate = useNavigate();
    
    const deleteFromFavourites = (id: number) => {
        axios.delete(`${API_URL}/favourites/delete/${id}`, { 
            params: { 
                userId: user?.userId
            } 
        })
        .then(res => {
            setRerender(!rerender);
        })
        .catch(err => {
            console.log(err);
        })
    }

    if (loading) {
        return <div className='loading' />
    }

    if (!data || data.length === 0) {
        return (
            <div className='favourites'>
                <h2>No favourites to return.</h2>
            </div>
        )
    }

    return (
        <div className='favourites'>
            <div className='heading-buttons'>
                <h2>
                    { user?.username }'s Favourites
                </h2>

                <button 
                    style={{ backgroundColor: mediaType === 'movie' ? 'blue' : 'white' }} 
                    onClick={() => setMediaType('movie')}
                >
                    Movies
                </button>

                <button 
                    style={{ backgroundColor: mediaType === 'movie' ? 'white' : 'blue' }} 
                    onClick={() => setMediaType('tv')}
                >
                    TV Shows
                </button>
            </div>
            
            {
                data.map(item => (
                    <div className='saved-movie'>
                        <div>
                            <img onClick={() => {
                                    navigate('/details');
                                }}  
                                src={ item.posterPath ? `https://image.tmdb.org/t/p/w300/${item.posterPath}` : noImgFound } alt={item.title} 
                            />
                        </div>
                        
                        <div>
                            <div className='title-rating'>
                                <h4 
                                    className='pointer'
                                    onClick={() => {
                                        navigate('/details');
                                    }} 
                                    >
                                        {item.title}
                                </h4>
                                <div className='rating' 
                                    style={{
                                        borderColor: (item.voteAverage < 4.1) ? 'red' :
                                        (item.voteAverage > 4 && item.voteAverage < 6.1) ? 'yellow' :
                                        (item.voteAverage > 6 && item.voteAverage < 7.1) ? 'orange' :
                                        'green' 
                                    }}
                                >
                                    <b>{ Math.ceil(item.voteAverage * 10) }%</b>
                                </div>
                            </div>

                            { new Date(item.releaseDate).toString().slice(4, 15) } &nbsp; &#x2022; &nbsp;
                            { mediaType === 'movie' && `${item.runtime} minutes` } 
                            <p>{ item.overview }</p>

                            <div>
                                <div className='pointer' onClick={() => deleteFromFavourites(item.id)}>
                                    <p>Remove</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Favourites;