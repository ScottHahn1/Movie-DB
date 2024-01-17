import { Link, useNavigate } from "react-router-dom";

type Props = {
    itemOne: string,
    itemTwo?: string,
    itemThree?: string,
    itemFour?: string,
    linkTo: string,
    mediaType?: string
}

const Dropdown = ({ itemOne, itemTwo, itemThree, itemFour, linkTo}: Props ) => {
    const navigate = useNavigate();
    
    return (
        <div className='dropdown'>
            <p onClick={() => {
                navigate(`/popular/${linkTo}`);
            }}>{itemOne}</p>
            
            { 
                itemTwo && <p onClick={() => {
                    navigate(`/nowPlaying/${linkTo}`);
                }}>{itemTwo}</p> 
            }

            { 
                itemThree && <p onClick={() => {
                    navigate(`/topRated/${linkTo}`);
                }}>{itemThree}</p> 
            }

            { 
                itemFour && <p onClick={() => {
                    navigate(`/upcoming/${linkTo}`);
                }}>{itemFour}</p> 
            }
        </div>
    )
}

export default Dropdown;