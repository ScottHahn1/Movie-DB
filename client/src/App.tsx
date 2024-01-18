import "./styles//App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Trending from "./components/Trending";
import Details from "./pages/Details";
import { useEffect, useState } from "react";
import Person from "./pages/Person";
import Credits from "./pages/Credits";
import People from "./pages/People";
import Search from "./components/Search";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Favourites from "./pages/Favourites";
import Ratings from "./pages/Ratings";
import Popular from "./pages/Popular";
import NowPlaying from "./pages/NowPlaying";
import TopRated from './pages/TopRated';
import Upcoming from './pages/Upcoming';
import Footer from "./components/Footer";
import Latest from "./components/Latest";
import axios from "axios";

export type Clicked = {
  id?: string | number,
  title?: string,
  type?: string,
}

function App() {
  const [clicked, setClicked] = useState<Clicked>({} as Clicked);
  const [searched, setSearched] = useState(sessionStorage.getItem('searched') as string);

  //clicked storage
  let storedClickd = sessionStorage.getItem('clicked');

  useEffect(() => {
    if (storedClickd) {
      setClicked(JSON.parse(storedClickd));
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('clicked', JSON.stringify(clicked));
  }, [clicked])

  //searched storage
  let storedSearch = sessionStorage.getItem('searched');

  useEffect(() => {
    if (storedSearch) {
      setSearched(JSON.parse(storedSearch));
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('searched', JSON.stringify(searched));
  }, [searched])

  // axios.defaults.withCredentials = true;

  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/register' element={ <Register /> } />
          <Route path='/login' element={ <Login /> } />
      
          <Route index element={<Home searched={searched} setSearched={setSearched} setClicked={setClicked} />} />
          
          <Route path='/movies' element={ <Trending url='https://movie-db-omega-ten.vercel.app/movies/trending' setClicked={setClicked} /> } />
          <Route path='/movies' element={ <Latest url='https://movie-db-omega-ten.vercel.app/movies/latest' setClicked={setClicked} /> } />
          { clicked.id && clicked.type && <Route path='/details' element={ <Details clicked={clicked} setClicked={setClicked} /> } /> }
          { clicked.id && clicked.type === 'person' && <Route path='/person' element={ <Person clicked={clicked} setClicked={setClicked} /> } /> }
          { clicked.id && <Route path='/credits' element={ <Credits clicked={clicked} setClicked={setClicked} /> } /> }
          <Route path='/popular/people' element={ <People setClicked={setClicked} /> } /> 
          <Route path='/search' element={ <Search clicked={clicked} setClicked={setClicked} searched={searched} /> } />

          { sessionStorage.getItem('userId') && <Route path='/favourites' element={ <Favourites setClicked={setClicked} /> } /> }
          { sessionStorage.getItem('userId') && <Route path='/ratings' element={ <Ratings setClicked={setClicked} /> } /> }

          <Route path='/popular/movies' element={ <Popular url='https://movie-db-omega-ten.vercel.app/movies/popular' mediaType='movie' setClicked={setClicked} /> } />
          <Route path='/popular/tv' element={ <Popular url='https://movie-db-omega-ten.vercel.app/tv/popular' mediaType='tv' setClicked={setClicked} /> } />

          <Route path='/nowPlaying/movies' element={ <NowPlaying url='https://movie-db-omega-ten.vercel.app/movies/nowPlaying' mediaType='movie' setClicked={setClicked} /> } />
          <Route path='/nowPlaying/tv' element={ <NowPlaying url='https://movie-db-omega-ten.vercel.app/tv/onTheAir' mediaType='tv' setClicked={setClicked} /> } />

          <Route path='/topRated/movies' element={ <TopRated url='https://movie-db-omega-ten.vercel.app/movies/topRated' mediaType='movie' setClicked={setClicked} /> } />
          <Route path='/topRated/tv' element={ <TopRated url='https://movie-db-omega-ten.vercel.app/tv/topRated' mediaType='tv' setClicked={setClicked} /> } />
          
          <Route path='/upcoming/movies' element={ <Upcoming setClicked={setClicked} /> } />

          <Route path='*' element={<NoPage />} />
        </Routes>
        <Footer /> 
      </BrowserRouter>
    </div>
  );
}

export default App;