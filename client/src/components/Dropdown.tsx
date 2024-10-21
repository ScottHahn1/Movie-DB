import { NavLink } from "react-router-dom";

type Props = {
    linkNames: string[]
    linkURLs: string[]
}

const Dropdown = ({ linkNames, linkURLs}: Props ) => {
    return (
        <div className='dropdown'>
            {
                linkNames.map((name, index) => (
                    <NavLink key={name} to={linkURLs[index]}>
                        <p>{name}</p>
                    </NavLink>
                ))
            }
        </div>
    )
}

export default Dropdown;