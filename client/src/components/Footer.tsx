import '../styles/Footer.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faLinkedin, faGithub, } from '@fortawesome/free-brands-svg-icons';
import { faHome, faPeopleGroup, faFilm, faTv } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <ul className="footer-nav-links">
          <Link to="/">
            <li>Home &nbsp; <FontAwesomeIcon icon={faHome} /></li>
          </Link>

          <Link to="/popular/people">
            <li>People &nbsp; <FontAwesomeIcon icon={faPeopleGroup} /></li>
          </Link>

          <Link to="/popular/movies">
            <li>Movies &nbsp; <FontAwesomeIcon icon={faFilm} /></li>
          </Link>

          <Link to="/popular/tv">
            <li>TV Shows <FontAwesomeIcon icon={faTv} /></li>
          </Link>
        </ul>

        <ul className="social-media-links">
          <a href="https://www.linkedin.com/in/scott-hahn" target="_blank" >
            <li>LinkedIn &nbsp; <FontAwesomeIcon icon={faLinkedin} /></li>
          </a>
          <a href='https://github.com/ScottHahn1' target='_blank'>
            <li>GitHub &nbsp; <FontAwesomeIcon icon={faGithub}/></li>  
          </a>
        </ul>
      </div>

      <div className="made-by">
          Made by Scott Hahn  
      </div>
    </footer>
  )
}

export default Footer;