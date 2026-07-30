import { Dispatch, SetStateAction, useState } from "react";
import { User } from "../hooks/useAuth";
import { handleFavouriteClick } from "../utils/favourites";
import { DetailsType } from "../typeAliases/Details";
import { Rate } from "./Rate";

const handleRateClick = (
    showRatingsBar: boolean, 
    setShowRatingsBar: Dispatch<SetStateAction<boolean>>, 
    setFavouritedError: Dispatch<SetStateAction<boolean>>
) => {
    setShowRatingsBar(!showRatingsBar);
    setFavouritedError(false);
}

type Props = {
    user: User | null,
    isFavourited: boolean,
    setIsFavourited: Dispatch<SetStateAction<boolean>>,
    details: DetailsType,
    mediaType: string | undefined,
}

const FavouritesAndRating = ({ user, isFavourited, setIsFavourited, details, mediaType }: Props) => {
    const [showRatingsBar, setShowRatingsBar] = useState(false);
    const [showFavouritesTooltip, setShowFavouritesTooltip] = useState(false);
    const [showRatingsTooltip, setShowRatingsTooltip] = useState(false);
    const [favouritedError, setFavouritedError] = useState(false);

    return (
         <div className='favourite-rate-container'>
            <div 
                onClick={() => handleFavouriteClick(
                    user,
                    isFavourited,
                    setIsFavourited,
                    details,
                    mediaType,
                    setFavouritedError,
                    setShowRatingsBar
                )}
            >
                <div 
                    className='favourite-rate' 
                    onMouseEnter={() => setShowFavouritesTooltip(true)} 
                    onMouseLeave={() => setShowFavouritesTooltip(false)}
                >
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

            <div 
                className='favourite-rate' 
                onClick={() => handleRateClick(showRatingsBar, setShowRatingsBar, setFavouritedError)} 
                onMouseEnter={() => setShowRatingsTooltip(true)} 
                onMouseLeave={() => setShowRatingsTooltip(false)}
            >
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
                user && showRatingsBar && (
                    <Rate 
                        id={details.id} 
                        title={mediaType === 'movie' ? details.title : details.name} 
                        release_date={mediaType === 'movie' ? details.release_date : details.first_air_date} 
                        poster_path={details.poster_path} 
                        media_type={mediaType!}
                        vote_average={details.vote_average}
                        overview={details.overview} 
                        runtime={details.runtime}
                    />
                )
            }
            
            {
                !user && showRatingsBar && (
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
    )
};

export default FavouritesAndRating;