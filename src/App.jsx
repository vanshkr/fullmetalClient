import { Route, Routes } from "react-router-dom";
import {
  AnimeDetails,
  Home,
  Genre,
  MostPopular,
  TopAiring,
  Search,
  AnimeWatch,
  Movies,
  Ova,
  Ona,
  Specials,
  MostFavorite,
  Upcoming,
  Sign,
} from "./pages";
import { Navbar } from "./components";

const App = () => {
  return (
    <div className='flex flex-col bg-black '>
      <div className='block bg-black'>
        <Navbar />
      </div>
      <div className='h-[calc(100vh-64px)]  hide-scrollbar overflow-y-scroll'>
        <div className='h-full '>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/anime/:animeId/full' element={<AnimeDetails />} />
            <Route path='/popular' element={<MostPopular />} />
            <Route path='/genre/:genreId/:genreName' element={<Genre />} />
            <Route path='/airing' element={<TopAiring />} />
            <Route path='/favorite' element={<MostFavorite />} />
            <Route path='/upcoming' element={<Upcoming />} />
            <Route path='/movie' element={<Movies />} />
            <Route path='/special' element={<Specials />} />
            <Route path='/ova' element={<Ova />} />
            <Route path='/ona' element={<Ona />} />
            <Route path='/search' element={<Search />} />
            <Route path='/log' element={<Sign />} />
            <Route path='/anime/:id/episodes' element={<AnimeWatch />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
