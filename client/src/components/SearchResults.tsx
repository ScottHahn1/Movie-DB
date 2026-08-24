import { Link } from "react-router-dom";
import { noImgFound } from "../assets/images/no-image-found.jpg";

type Props = {
    actingCredits?: string;
    id: number;
    image: string;
    name: string;
    releaseDate?: string;
    overview?: string;
    searchResultsType: string;
};

const generateLink = (searchResultsType: string, id: number, name: string) => {
    if (searchResultsType === 'people') {
        return `/person/${id}/${name.replace(/\s+/g, '-')}`;
    } else {
        return (
            `/details/${searchResultsType === 'movies' ? 
            `movie/${id}/${name.replace(/\s+/g, '-')}` :
            `tv/${id}/${name.replace(/\s+/g, '-')}`}`
        )
    }
}

const SearchResults = ({ actingCredits, id, image, name, releaseDate, overview, searchResultsType }: Props) => {
    return (
        <div className='search-movie'>
            <Link 
                to={generateLink(searchResultsType, id, name)}
            >
                <div>
                    <img src={ image ? `https://image.tmdb.org/t/p/w300/${image}` : noImgFound } alt={name} />
                </div>
            </Link>

            {searchResultsType === 'people' ?
                <div>
                    <Link to={generateLink(searchResultsType, id, name)}>
                        <h4 style={{ color: 'black' }}>{name}</h4>
                    </Link>

                    <p>{actingCredits}</p>
                </div>
                :
                <div>
                    <Link to={generateLink(searchResultsType, id, name)}>
                        <h4 style={{ color: 'black' }}>{name}</h4>
                    </Link>

                    <p>{releaseDate && new Date(releaseDate).toString().slice(4, 15)}</p>
                    <p>{overview}</p>
                </div>
            }
        </div>
    )
};

export default SearchResults;