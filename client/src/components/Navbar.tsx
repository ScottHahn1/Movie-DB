import { Link, useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import '../styles/Navbar.css';
import Search from './Search';
import Dropdown from './Dropdown';
import { useState } from 'react';

const Navbar = () => {
  const [moviesDropdownVisible, setMoviesDropdownVisible] = useState(false);
  const [showsDropdownVisible, setShowsDropdownVisible] = useState(false);
  const [peopleDropdownVisible, setPeopleDropdownVisible] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  const navigate = useNavigate();

  return (
    <nav>
        <Link to='/'>
            <h1 style={{ cursor: 'pointer', textDecoration: 'none' }}>Movie Database</h1>
        </Link>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>

            <li onMouseEnter={() => setMoviesDropdownVisible(true)} onMouseLeave={() => setMoviesDropdownVisible(false)}>
                <span style={{ color: 'white' }}>Movies</span>
                {
                  moviesDropdownVisible && (
                    <>
                      <Dropdown itemOne='Popular' itemTwo='Now Showing' itemThree='Top Rated' itemFour='Upcoming' linkTo='movies' />
                    </>
                  )
                }
            </li>

            <li onMouseEnter={() => setShowsDropdownVisible(true)} onMouseLeave={() => setShowsDropdownVisible(false)}>
                <span style={{ color: 'white' }}>TV Shows</span>
                {
                  showsDropdownVisible && (
                    <>
                      <Dropdown itemOne='Popular' itemTwo='Now Showing' itemThree='Top Rated' linkTo='tv' />
                    </>
                  )
                }
            </li>

            <li onMouseEnter={() => setPeopleDropdownVisible(true)} onMouseLeave={() => setPeopleDropdownVisible(false)}>
              <span style={{ color: 'white' }}>People</span>
                {
                  peopleDropdownVisible && (
                    <>
                      <Dropdown itemOne='Popular' linkTo='people' />
                    </>
                  )
                }
            </li>
        </ul>

        <div className='login-register'>
          {
            !sessionStorage.getItem('token') && (
              <button onClick={() => navigate('/login')}>Login</button>
            )
          }

          {
            sessionStorage.getItem('token') && (
              <div onMouseEnter={() => setProfileDropdownVisible(true)} className='profile'>
                { sessionStorage.getItem('username')?.slice(0, 1) }

                {
                  profileDropdownVisible && (
                    <div className='profile-dropdown' onMouseLeave={() => setProfileDropdownVisible(false)}>
                      <p onClick={() => navigate('/favourites')}>Favourites</p>
                      <p onClick={() => navigate('/ratings')}>Ratings</p>
                    </div>
                  )
                }

              </div>
            )
          }

          <Link to='/register'>
              <button>Register</button> 
          </Link>
        </div>
    </nav>
  )
}

export default Navbar;