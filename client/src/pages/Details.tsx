import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useAxios from '../components/useAxios';
import '../styles/Details.css';
import { Clicked } from '../App';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DetailsType } from '../typeAliases/Details';
import { CreditsType } from '../typeAliases/Credits';
import { Rate } from '../components/Rate';
import Cast from '../components/Cast';
import Facts from '../components/Facts';

const Details = ({ clicked, setClicked }: { clicked: Clicked, setClicked: Dispatch<SetStateAction<Clicked>> }) => {
    const { data: details, loading: detailsLoading } = useAxios<DetailsType, {}>(`http://localhost:8000/movies/details/${clicked.type}/${clicked.id}`, {} as DetailsType, {});
    const { data: credits, loading: creditsLoading } = useAxios<CreditsType, {}>(`http://localhost:8000/movies/credits/${clicked.type}/${clicked.id}`, {} as CreditsType, {});

    const [showRatingsBar, setShowRatingsBar] = useState(false);
    const [showFavouritesTooltip, setShowFavouritesTooltip] = useState(false);
    const [showRatingsTooltip, setShowRatingsTooltip] = useState(false);

    const [isFavourited, setIsFavourited] = useState(false);
    const [favouritedError, setFavouritedError] = useState(false);

    const noImgFound = require('../assets/images/no-image-found.jpg');

    const checkIfFavourited = (mediaId: number) => {
        axios.get(`http://localhost:8000/favourites/${sessionStorage.getItem('userId')}/${mediaId}`, {
            params: { mediaType: clicked.type }
        })
        .then(res => {
            res.data.length > 0 ? setIsFavourited(true) : setIsFavourited(false);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        sessionStorage.getItem('userId') && !detailsLoading && checkIfFavourited(details.id);
    }, [details])

    const addMovieToFavourites = (mediaId: number, title: string, releaseDate: string, posterPath: string, voteAverage: number, overview: string, runtime?: number) => {
        axios.post('http://localhost:8000/favourites/add', {
            userId: sessionStorage.getItem('userId'),
            mediaId: mediaId,
            title: title,
            releaseDate: releaseDate,
            posterPath: posterPath,
            overview: overview,
            voteAverage: voteAverage,
            runtime: runtime,
            mediaType: clicked.type
        });
        setIsFavourited(true);
    }

    const handleFavouriteClick = () => {
        if (sessionStorage.getItem('token')) {
            if (isFavourited) {
                deleteMovie(details.id);
            } else {
                if (clicked.type === 'movie') {
                    addMovieToFavourites(details.id, details.title, details.release_date, details.poster_path, details.vote_average, details.overview, details.runtime) 
                } else {
                    addMovieToFavourites(details.id, details.name, details.first_air_date, details.poster_path, details.vote_average, details.overview)
                }
            }
        } else {
            setFavouritedError(true);
            setShowRatingsBar(false)
        }
    }

    const handleRateClick = () => {
        setShowRatingsBar(!showRatingsBar);
        setFavouritedError(false);
    }

    const deleteMovie = (id: number) => {
        axios.delete(`http://localhost:8000/favourites/delete/${id}`, { 
            params: { userId: sessionStorage.getItem('userId') } 
        })
        .then(res => {
            setIsFavourited(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='details-container'>
            {
                !detailsLoading ? !creditsLoading && (
                    <>
                    <div className='details'>
                        <div className='movie-container' style={{ background: `url(https://image.tmdb.org/t/p/w780/${details.backdrop_path})` }}>
                            <img src={ details.poster_path ? `https://image.tmdb.org/t/p/w300/${details.poster_path}` : noImgFound } alt={ details.title } />
                            <div className='movie'>
                                <h3>{ clicked.type === 'movie' ? details.title : details.name }</h3>

                                <div className='rating' 
                                    style={{
                                        borderColor: (details.vote_average < 4.1) ? 'red' :
                                        (details.vote_average > 4 && details.vote_average < 6.1) ? 'yellow' :
                                        (details.vote_average > 6 && details.vote_average < 7.1) ? 'orange' :
                                        'green' 
                                    }}
                                >
                                    <b>{ Math.ceil(details.vote_average * 10) }%</b>
                                </div>
                                
                                <div className='movie-info'>
                                    <p>{ clicked.type === 'movie' ? details.release_date : details.first_air_date } &#x2022;</p> &nbsp;
                                    <p>{ details.genres.length && details.genres.map(genre => genre.name).join(', ') } {clicked.type === 'movie' && <>&#x2022;</>} </p> &nbsp;
                                    { clicked.type === 'movie' && <p>{ details.runtime } Minutes</p> }
                                </div>

                                <div className='overview'>
                                    <h4>Overview</h4>
                                    <p>{ details.overview }</p>
                                </div>

                                <div className='favourite-rate-container'>
                                    <div onClick={handleFavouriteClick}>
                                        <div className='favourite-rate' onMouseEnter={() => setShowFavouritesTooltip(true)} onMouseLeave={() => setShowFavouritesTooltip(false)}>
                                            { isFavourited ? <>&#9829;</> : <>&#9825;</> }

                                            {
                                                showFavouritesTooltip && (
                                                    <div className='tooltip'>
                                                        <p className='tooltip-content'>{ isFavourited ? 'Remove from favourites' : 'Add to favourites' }</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className='favourite-rate' onClick={ handleRateClick } onMouseEnter={() => setShowRatingsTooltip(true)} onMouseLeave={() => setShowRatingsTooltip(false)}>
                                        <span className='star'>&#9734;</span>
                                        {
                                            showRatingsTooltip && (
                                                <div className='tooltip'>
                                                    <p className='tooltip-content'>Add a rating</p>
                                                </div>
                                            )
                                        }
                                    </div>

                                    {
                                        sessionStorage.getItem('token') && showRatingsBar && (
                                            <Rate 
                                                id={details.id} 
                                                title={clicked.type === 'movie' ? details.title : details.name} 
                                                release_date={clicked.type === 'movie' ? details.release_date : details.first_air_date} 
                                                poster_path={details.poster_path} 
                                                media_type={clicked.type!}
                                                vote_average={details.vote_average}
                                                overview={details.overview} 
                                                runtime={details.runtime}
                                            />
                                        )
                                    }
                                    
                                    {
                                        !sessionStorage.getItem('token') && showRatingsBar && (
                                            <div>
                                                Sign in required to add ratings
                                            </div>
                                        )
                                    }

                                    {
                                        favouritedError && (
                                            <div>
                                                Sign in required to add to favourites
                                            </div>
                                        )
                                    }
                                </div>

                                {
                                    clicked.type === 'movie' ? (
                                    <div>
                                        <h4>Director</h4>
                                        <p>{ credits.crew && credits.crew.length > 0 && credits.crew.find((person) => person.job === 'Director')?.name }</p>
                                    </div>
                                    )
                                    :
                                    (
                                    <div className='creators'>
                                        { 
                                            details.created_by.length > 0 && details.created_by.map(creator => (
                                                <p>{ creator.name } <br></br> Creator</p>
                                            ))
                                        }
                                    </div>
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>

                    <div className='credits-container'>
                        <Cast clicked={clicked} setClicked={setClicked} />
                        <Facts clicked={clicked} />
                    </div>

                    <div className='full-cast-crew'>
                        <Link to='/credits'>
                            <h3>Full Cast And Crew</h3>
                        </Link>
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

export default Details;