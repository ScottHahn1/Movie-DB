import "./styles//App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Details from "./pages/Details";
import { useState } from "react";
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

function App() {
  const [searched, setSearched] = useState('');

  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/register' element={ <Register /> } />
          <Route path='/login' element={ <Login /> } />
      
          <Route index element={<Home searched={searched} setSearched={setSearched} />} />
          
          <Route path='/details/:type/:id/:title' element={ <Details /> } />
          <Route path='/person/:id/:name' element={ <Person /> } /> 
          <Route path='/credits/:type/:id' element={ <Credits /> } /> 
          <Route path='/popular/people' element={ <People /> } /> 
          <Route path='/search/:query' element={ <Search /> } />

          { sessionStorage.getItem('userId') && <Route path='/favourites' element={ <Favourites /> } /> }
          { sessionStorage.getItem('userId') && <Route path='/ratings' element={ <Ratings /> } /> }

          <Route path='/popular/:type' element={ <Popular /> } />
          <Route path='/nowPlaying/:type' element={ <NowPlaying /> } />
          <Route path='/topRated/:type' element={ <TopRated /> } />
          <Route path='/upcoming/movies' element={ <Upcoming /> } />

          <Route path='*' element={<NoPage />} />
        </Routes>

        <Footer /> 
      </BrowserRouter>
    </div>
  );
}

export default App;