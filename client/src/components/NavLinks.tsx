import { useState } from "react";
import Dropdown from "./Dropdown";

const NavLinks = () => {
    const [moviesDropdownVisible, setMoviesDropdownVisible] = useState(false);
    const [showsDropdownVisible, setShowsDropdownVisible] = useState(false);
    const [peopleDropdownVisible, setPeopleDropdownVisible] = useState(false);
    
    return (
        <>
            <li onMouseEnter={() => setMoviesDropdownVisible(true)} onMouseLeave={() => setMoviesDropdownVisible(false)}>
                <span style={{ color: 'white' }}>Movies</span>
                {
                    moviesDropdownVisible && (
                        <Dropdown 
                            linkNames={ ['Popular', 'Now Showing', 'Top Rated', 'Upcoming'] }
                            linkURLs={ ['/popular/movies', '/nowPlaying/movies', '/topRated/movies', '/upcoming/movies'] }
                        />
                    )
                }
            </li>

            <li onMouseEnter={() => setShowsDropdownVisible(true)} onMouseLeave={() => setShowsDropdownVisible(false)}>
                <span style={{ color: 'white' }}>TV Shows</span>
                {
                    showsDropdownVisible && (
                        <Dropdown 
                            linkNames={ ['Popular', 'Now Showing', 'Top Rated'] }
                            linkURLs={ ['/popular/tv', '/nowPlaying/tv', '/topRated/tv'] }
                        />
                    )
                }
            </li>

            <li onMouseEnter={() => setPeopleDropdownVisible(true)} onMouseLeave={() => setPeopleDropdownVisible(false)}>
                <span style={{ color: 'white' }}>People</span>
                {
                    peopleDropdownVisible && (
                        <Dropdown 
                            linkNames={ ['Popular'] }
                            linkURLs={ ['/popular/people'] }
                        />
                    )
                }
            </li>
        </>
    )
}

export default NavLinks;