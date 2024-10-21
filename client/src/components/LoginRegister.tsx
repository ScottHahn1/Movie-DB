import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginRegister = () => {
  const navigate = useNavigate();
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  return (
    <>
       <div className='login-register'>
          {
            !sessionStorage.getItem('token') ? (
              <button onClick={() => navigate('/login')}>Login</button>
            ) : (
              <button onClick={() => sessionStorage.removeItem('token')}>Logout</button>
            )
          }

          <Link to='/register'>
              <button>Register</button> 
          </Link>

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
        </div>
    </>
  )
}

export default LoginRegister