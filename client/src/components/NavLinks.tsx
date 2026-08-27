import { useState } from "react";
import Dropdown from "./Dropdown";

const NavLinks = () => {
    const [moviesDropdownVisible, setMoviesDropdownVisible] = useState(false);
    const [showsDropdownVisible, setShowsDropdownVisible] = useState(false);
    const [peopleDropdownVisible, setPeopleDropdownVisible] = useState(false);
    
    return (
        <>
            <li onMouseLeave={() => setMoviesDropdownVisible(false)}>
                <span onMouseEnter={() => setMoviesDropdownVisible(true)} style={{ color: 'white' }}>
                  Movies
                </span>
                
                <span onMouseLeave={() => setMoviesDropdownVisible(false)}>
                  <Dropdown
                      visible={moviesDropdownVisible}
                      linkNames={ ['Popular', 'Now Showing', 'Top Rated', 'Upcoming'] }
                      linkURLs={ ['/popular/movies', '/nowPlaying/movies', '/topRated/movies', '/upcoming/movies'] }
                  />
                </span>
            </li>

            <li onMouseLeave={() => setShowsDropdownVisible(false)}>
                <span onMouseEnter={() => setShowsDropdownVisible(true)} style={{ color: 'white' }}>
                  Shows
                </span>

                <span onMouseLeave={() => setShowsDropdownVisible(false)}>
                  <Dropdown 
                      visible={showsDropdownVisible}
                      linkNames={ ['Popular', 'Now Showing', 'Top Rated'] }
                      linkURLs={ ['/popular/tv', '/nowPlaying/tv', '/topRated/tv'] }
                  />
                </span>
            </li>

            <li onMouseLeave={() => setPeopleDropdownVisible(false)}>
                <span onMouseEnter={() => setPeopleDropdownVisible(true)} style={{ color: 'white' }}>
                  People
                </span>

              <span onMouseLeave={() => setPeopleDropdownVisible(false)}>
                <Dropdown 
                    visible={peopleDropdownVisible}
                    linkNames={ ['Popular'] }
                    linkURLs={ ['/popular/people'] }
                />
              </span>
            </li>
        </>
    )
}

export default NavLinks;