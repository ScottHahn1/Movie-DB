import { NavLink } from "react-router-dom";

type Props = {
    visible: boolean;
    linkNames: string[];
    linkURLs: string[];
}

const Dropdown = ({ visible, linkNames, linkURLs}: Props ) => {
    return (
        <div className={`dropdown ${visible ? 'dropdown-visible' : ''}`}>
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