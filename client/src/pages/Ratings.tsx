import { useNavigate } from "react-router-dom";
import useAxios from "../components/useAxios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Clicked } from "../App";
import axios from "axios";
import { Rate } from "../components/Rate";
import '../styles/Ratings.css';

type Params = { 
    userId: string,
    mediaType: string
 };

type Movies = {
    id: number
    movieId: number,
    posterPath: string,
    title: string,
    releaseDate: string,
    mediaId: number,
    overview: string,
    name: string,
    firstAirDate: string,
    voteAverage: number,
    runtime: number
}[];

const Ratings = ({ setClicked }: { setClicked: Dispatch<SetStateAction<Clicked>> }) => {
    const [mediaType, setMediaType] = useState('movie');
    const [rerender, setRerender] = useState(false);

    const noImgFound = require('../assets/images/no-image-found.jpg');

    const params = { 
        userId: sessionStorage.getItem('userId')!,
        mediaType: mediaType 
    };
    const { data, loading } = useAxios<Movies, Params>(`https://movie-db-omega-ten.vercel.app/ratings`, {} as Movies, params, mediaType, rerender);

    const navigate = useNavigate();

    const deleteMovie = (id: number) => {
        axios.delete(`https://movie-db-omega-ten.vercel.app/ratings/delete/${id}`, {
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
                    <div className='favourites'>
                        <div className='heading-buttons'>
                            <h2>{ sessionStorage.getItem('username') }'s Ratings</h2>
                            <button style={{ backgroundColor: mediaType === 'movie' ? 'blue' : 'white' }} onClick={() => setMediaType('movie')}>Movies</button>
                            <button style={{ backgroundColor: mediaType === 'movie' ? 'white' : 'blue' }} onClick={() => setMediaType('tv')}>TV Shows</button>
                        </div>
                        {
                            data.map(item => (
                                <div className='saved-movie'>
                                    <div>
                                        <img onClick={() => {
                                                setClicked({ id: item.movieId, type: 'movie' });
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
                                                    setClicked({ id: item.movieId, type: 'movie' });
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
                                        { item.runtime } minutes
                                        <p>{ item.overview }</p>

                                        <div>
                                            <div>
                                                <p>Rating</p>

                                                <div className='ratings-bar'>
                                                    <Rate 
                                                        id={item.mediaId} 
                                                        title={mediaType === 'movie' ? item.title : item.name} 
                                                        release_date={mediaType === 'movie' ? item.releaseDate : item.firstAirDate} 
                                                        poster_path={item.posterPath} 
                                                        media_type={mediaType}
                                                        vote_average={item.voteAverage}
                                                        overview={item.overview} 
                                                        runtime={item.runtime}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className='pointer' onClick={() => deleteMovie(item.id)}>
                                                <h4>Remove</h4>
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

export default Ratings;