import { Dispatch, SetStateAction, useEffect } from "react";
import Trending from "../components/Trending";
import { Clicked } from "../App";
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Latest from "../components/Latest";

const Home = ({ searched, setSearched, setClicked }: { searched: string, setSearched: Dispatch<SetStateAction<string>>, setClicked: Dispatch<SetStateAction<Clicked>> }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setSearched('');
    setClicked({ type: '' });
  }, [])

  return (
    <div className='home'>
      <div className='main-heading'>
        <h1>Find Movies, TV shows and more</h1>
        <div className='search'>
          <input 
            className='search-bar' 
            type='text' 
            placeholder='Search for movies, shows, people...' 
            onChange={e => setSearched(e.target.value)} 
            value={searched ? searched : ''} 
            onKeyDown={e => {
              if (e.key === 'Enter') {
                setClicked({ type: 'movie' })
                navigate('/search');
              }
            }}
          />
          <Link to='/search'>
            <FontAwesomeIcon 
              icon={faMagnifyingGlass} 
              onClick={() => setClicked({ type: 'movie' })} 
              className='search-icon'
            />
          </Link>
        </div>
      </div>
      <Trending setClicked={setClicked} />
      <Latest url='http://localhost:8000/movies/latest' setClicked={setClicked} />
    </div>
  )
};

export default Home;