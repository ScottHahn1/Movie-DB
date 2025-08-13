type Props = {
    actingCredits?: string;
    image: string;
    name: string;
    releaseDate?: string;
    overview?: string;
    searchResultsType: string;
};

const SearchResults = ({ actingCredits, image, name, releaseDate, overview, searchResultsType }: Props) => {
    const noImgFound = require('../assets/images/no-image-found.jpg');

    return (
        <div className='search-movie'>
            <div>
                <img src={ image ? `https://image.tmdb.org/t/p/w300/${image}` : noImgFound } alt={name} />
            </div>

            {searchResultsType !== 'people' ?
                <div>
                    <h4>{name}</h4>
                    <p>{releaseDate && new Date(releaseDate).toString().slice(4, 15)}</p>
                    <p>{overview}</p>
                </div>
            :
                <div>
                    <h4>{name}</h4>
                    <p>{actingCredits}</p>
                </div>
            }
        </div>
    )
};

export default SearchResults;