import axios from "axios";
import { API_URL } from "../config/api";
import { User } from "../hooks/useAuth";
import { Dispatch, SetStateAction } from "react";
import { DetailsType } from "../typeAliases/Details";

const addMovieToFavourites = async (
    user: User,
    setIsFavourited: Dispatch<SetStateAction<boolean>>,
    mediaId: number,
    title: string,
    releaseDate: string,
    posterPath: string,
    voteAverage: number,
    overview: string,
    mediaType: string,
    runtime?: number,
) => {
    await axios.post(
        `${API_URL}/favourites/add`,
        {
            userId: user?.userId,
            mediaId: mediaId,
            title: title,
            releaseDate: releaseDate,
            posterPath: posterPath,
            overview: overview,
            voteAverage: voteAverage,
            runtime: runtime,
            mediaType: mediaType,
        },
        {
            withCredentials: true,
        }
    );
    setIsFavourited(true);
};

const deleteMovie = async (
    user: User | null,
    id: number, 
    setIsFavourited?: Dispatch<SetStateAction<boolean>>
) => {
    try {
        await axios.delete(`${API_URL}/favourites/delete/${id}`, { 
            params: { userId: user?.userId },
            withCredentials: true
        });
        
        if (setIsFavourited) {
            setIsFavourited(false);
        }
    } catch (err) {
        console.log(err);
    }
}

const handleFavouriteClick = (
    user: User | null, 
    isFavourited: boolean, 
    setIsFavourited: Dispatch<SetStateAction<boolean>>,
    details: DetailsType,
    mediaType: string | undefined,
    setFavouritedError: Dispatch<SetStateAction<boolean>>,
    setShowRatingsBar: Dispatch<SetStateAction<boolean>>
) => {
    if (user && mediaType) {
        if (isFavourited) {
            if (details) {
                deleteMovie(user, details.id, setIsFavourited);
            }
        } else {
            if (mediaType === 'movie') {
                if (details) {
                    addMovieToFavourites(
                        user,
                        setIsFavourited,
                        details.id, 
                        details.title, 
                        details.release_date, 
                        details.poster_path, 
                        details.vote_average, 
                        details.overview, 
                        mediaType,
                        details.runtime
                    ) 
                }
            } else {
                if (details) {
                    addMovieToFavourites(
                        user,
                        setIsFavourited,
                        details.id, 
                        details.name, 
                        details.first_air_date, 
                        details.poster_path, 
                        details.vote_average, 
                        details.overview,
                        mediaType,
                    )
                }
            }
        }
    } else {
        setFavouritedError(true);
        setShowRatingsBar(false)
    }
}

export { addMovieToFavourites, deleteMovie, handleFavouriteClick };