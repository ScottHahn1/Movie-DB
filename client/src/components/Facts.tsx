import useAxios from "./useAxios";
import { Clicked } from '../App';
import { DetailsType } from "../typeAliases/Details";

const Facts = ({ clicked }: { clicked: Clicked }) => {
    const { data, loading } = useAxios<DetailsType, {}>(`http://localhost:8000/movies/details/${clicked.type}/${clicked.id}`, {} as DetailsType, {});

    const noImgFound = require('../assets/images/no-image-found.jpg');

    return (
        <div>
            {
                !loading && (
                    <div className='facts'>
                        <p> <b>Status</b> <br></br> { data.status } </p>
                        <p> <b>Original Language</b> <br></br> { data.spoken_languages[0].english_name } </p>
                        {
                            clicked.type === 'movie' ? (
                                <>
                                    <p> <b>Budget</b> <br></br> { data.budget } </p>
                                    <p> <b>Revenue</b> <br></br> { data.revenue } </p>
                                </>
                            ) :
                                <>
                                    <p> <b>Network</b> </p>
                                    <img src={ data.networks[0].logo_path ? `https://image.tmdb.org/t/p/w92/${data.networks[0].logo_path}` : noImgFound } alt={data.networks[0].name} />
                                    <p> <b>Type</b> <br></br>{ data.type } </p>
                                </>

                        }
                    </div>
                )
            }
        </div>
    )
}

export default Facts;