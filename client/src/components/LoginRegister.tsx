import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate, Link, NavigateFunction } from "react-router-dom";
import { User } from "../hooks/useAuth";
import axios from "axios";
import { API_URL } from "../config/api";

type Props = {
  loggedIn: boolean,
  setLoggedIn: Dispatch<SetStateAction<boolean>>,
  user: User | null,
  setUser: Dispatch<SetStateAction<User | null>>
}

const handleLogin = (navigate: NavigateFunction) => {
  navigate('/login');
}

const handleLogout = async (setLoggedIn: Dispatch<SetStateAction<boolean>>, setUser: Dispatch<SetStateAction<User | null>>) => {
  try {
    await axios.post(
      `${API_URL}/users/logout`, 
      {}, 
      { withCredentials: true }
    );
    setLoggedIn(false);
    setUser(null);
    alert('Successfully logged out.');
  } catch {
    alert('Failed to logout.');
  }
}

const LoginRegister = ({ loggedIn, setLoggedIn, user, setUser }: Props) => {
  const navigate = useNavigate();
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  return (
    <>
       <div className='login-register'>
          {
            !loggedIn ? (
              <button onClick={() => handleLogin(navigate)}>Login</button>
            ) : (
              <button onClick={() => handleLogout(setLoggedIn, setUser)}>Logout</button>
            )
          }

          <Link to='/register'>
              <button>Register</button> 
          </Link>

          {
            user && (
              <div onMouseEnter={() => setProfileDropdownVisible(true)} className='profile' onMouseLeave={() => setProfileDropdownVisible(false)}>
                { user?.username?.slice(0, 1).toUpperCase() }

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
        </div>
    </>
  )
}

export default LoginRegister