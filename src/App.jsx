import { Route, Routes } from "react-router-dom";
import {
  AnimeDetails,
  Home,
  AnimeMovies,
  Genres,
  MostPopular,
  TopAiring,
  Search,
  AnimeWatch,
} from "./pages";
import { Navbar } from "./components";

const App = () => {
  return (
    <div className='flex flex-col bg-black'>
      <div className='block bg-black'>
        <Navbar />
      </div>
      <div className='h-[calc(100vh-64px)] hide-scrollbar overflow-y-scroll '>
        <div className='h-fit'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/anime/:animeId/full' element={<AnimeDetails />} />
            <Route path='/anime-movies/:aphKey' element={<AnimeMovies />} />
            <Route path='/genre/:genreTerm' element={<Genres />} />
            <Route path='/popular' element={<MostPopular />} />
            <Route path='/top-airing' element={<TopAiring />} />
            <Route path='/search/:searchTerm' element={<Search />} />
            <Route path='/anime/:id/episodes' element={<AnimeWatch />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
