import { useNavigate } from "react-router-dom";
import useAxios from "../components/useAxios";
import '../styles/Favourites.css';
import { Dispatch, SetStateAction, useState } from "react";
import { Clicked } from "../App";
import axios from "axios";

type Params = { 
    userId: string | number,
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

const Favourites = ({ setClicked }: { setClicked: Dispatch<SetStateAction<Clicked>> }) => {
    const [mediaType, setMediaType] = useState('movie');
    const [rerender, setRerender] = useState(false);

    const noImgFound = require('../assets/images/no-image-found.jpg');

    const params = {
        userId: sessionStorage.getItem('userId')!,
        mediaType: mediaType
    }
    const { data, loading } = useAxios<Movies, Params>(`https://movie-db-omega-ten.vercel.app/favourites`, {} as Movies, params, mediaType, rerender);

    const navigate = useNavigate();
    
    const deleteFromFavourites = (id: number) => {
        axios.delete(`https://movie-db-omega-ten.vercel.app/favourites/delete/${id}`, { 
            params: { 
                userId: sessionStorage.getItem('userId')
            } 
        })
        .then(res => {
            console.log(res);
            setRerender(!rerender);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            {
                !loading && (
                    <div className={ data.length > 0 ? 'favourites-margin' : 'favourites' }>
                        <div className='heading-buttons'>
                            <h2>{ sessionStorage.getItem('username') }'s Favourites</h2>
                            <button style={{ backgroundColor: mediaType === 'movie' ? 'blue' : 'white' }} onClick={() => setMediaType('movie')}>Movies</button>
                            <button style={{ backgroundColor: mediaType === 'movie' ? 'white' : 'blue' }} onClick={() => setMediaType('tv')}>TV Shows</button>
                        </div>
                        {
                            data.map(item => (
                                <div className='saved-movie'>
                                    <div>
                                        <img onClick={() => {
                                                setClicked({ id: item.mediaId, type: item.mediaType });
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
                                                    setClicked({ id: item.mediaId, type: item.mediaType });
                                                    navigate('/details');
                                                }} 
                                                >
                                                    { item.title }
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
        </div>
    )
}

export default Favourites;