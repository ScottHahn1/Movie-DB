import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import NavLinks from './NavLinks';
import LoginRegister from './LoginRegister';
import { Dispatch, SetStateAction } from 'react';
import { User } from '../hooks/useAuth';

type Props = {
  loggedIn: boolean,
  setLoggedIn: Dispatch<SetStateAction<boolean>>,
  user: User | null,
  setUser: Dispatch<SetStateAction<User | null>>
}

const Navbar = ({ loggedIn, setLoggedIn, user, setUser }: Props) => {
  return (
    <nav>
        <Link to='/'>
            <h1 style={{ cursor: 'pointer', textDecoration: 'none' }}>FilmAve</h1>
        </Link>
        
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>

            <NavLinks />
        </ul>

        <LoginRegister loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} />
    </nav>
  )
}

export default Navbar;