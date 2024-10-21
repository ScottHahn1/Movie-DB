import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { useState } from 'react';
import NavLinks from './NavLinks';

const Navbar = () => {
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

            <NavLinks />
        </ul>

        <div className='login-register'>
          {
            !sessionStorage.getItem('token') && (
              <button onClick={() => navigate('/login')}>Login</button>
            )
          }

          {
            sessionStorage.getItem('token') && (
              <div onMouseEnter={() => setProfileDropdownVisible(true)} className='profile' onMouseLeave={() => setProfileDropdownVisible(false)}>
                { sessionStorage.getItem('username')?.slice(0, 1).toUpperCase() }

                {
                  profileDropdownVisible && (
                    <div className='profile-dropdown'>
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