import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import NavLinks from './NavLinks';
import LoginRegister from './LoginRegister';

const Navbar = () => {
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

        <LoginRegister />
    </nav>
  )
}

export default Navbar;