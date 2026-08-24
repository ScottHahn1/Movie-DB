import { API_URL } from "../config/api";
import useAxios from "../hooks/useAxios";
import { DetailsType } from "../typeAliases/Details";
import { useParams } from "react-router-dom";
import { noImgFound } from "../assets/images/no-image-found.jpg";

const Facts = () => {
    const { id, type } = useParams();

    const { data, loading } = useAxios<DetailsType, {}>(
        `${API_URL}/movies/details/${type}/${id}`, 
        {}
    );

    if (loading) {
        return <div className='loading' />
    }

    return (
        <div className='facts'>
            <p> <b>Status</b> <br></br> { data?.status } </p>
            <p> <b>Original Language</b> <br></br> { data?.spoken_languages[0]?.english_name } </p>
            {
                type === 'movie' ? (
                    <>
                        <p> <b>Budget</b> <br></br> { data?.budget } </p>
                        <p> <b>Revenue</b> <br></br> { data?.revenue } </p>
                    </>
                ) :
                    <>
                        <b>Network</b>
                        
                        <img src={ 
                            data?.networks[0]?.logo_path ? 
                            `https://image.tmdb.org/t/p/w92/${data.networks[0].logo_path}` 
                            : 
                            noImgFound 
                        } 
                            alt={data?.networks[0]?.name} />
                        <p> <b>Type</b> <br></br>{ data?.type } </p>
                    </>

            }
        </div>
    )
}

export default Facts;