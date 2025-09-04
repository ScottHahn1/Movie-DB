import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Trending from "../components/Trending";
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Latest from "../components/Latest";

const Home = ({ searched, setSearched }: { searched: string, setSearched: Dispatch<SetStateAction<string>> }) => {
  const navigate = useNavigate();

  const [isTrendingLoaded, setIsTrendingLoaded] = useState(false);

  useEffect(() => {
    setSearched('');
  }, [setSearched])

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
                navigate(`/search/${searched.replace(/\s+/g, '-')}`);
              }
            }}
          />

          <Link to='/search'>
            <FontAwesomeIcon 
              icon={faMagnifyingGlass} 
              className='search-icon'
            />
          </Link>
        </div>
      </div>

      <Trending setTrendingLoading={setIsTrendingLoaded} />
      <Latest showLoading={isTrendingLoaded} />
    </div>
  )
};

export default Home;