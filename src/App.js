import MovieList from "../src/component/movieapp/movie";
import React, {useState, useEffect} from 'react'
import Movieheading from "../src/component/movieapp/movieheading";
import Searchinput from "../src/component/movieapp/searchinput";
import AddToFavorite from "../src/component/favorite";
import RemoveFavourites from "../src/component/removefavorite";
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favourite, setFavourite] = useState([])

  const getMovieRequest = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
    const response = await fetch(url)
    const responseJson = await response.json()

    if(responseJson.Search){
      setMovies(responseJson.Search)
    }
  }

  useEffect(() => {
    getMovieRequest(searchValue)
  },[searchValue])

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

    if (movieFavourites === null) {
      return false;
      } else {
        setFavourite(movieFavourites)
      };
	}, []);

  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

  const addFavouriteMovie = movie =>{
    const newFavoriteList = [...favourite, movie]
    setFavourite(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }

  const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourite.filter(
			(favourites) => favourites.imdbID !== movie.imdbID
		);

		setFavourite(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
	};

  

  return (
    <div className="App container-fluid movie-app">

       <div className="row p-5 offset-md-1">
         <Movieheading heading="ChillZone"/>
         <Searchinput searchValue={searchValue} setSearchValue={setSearchValue}/>
       </div>
     
     <div className="p-md-5">
     <div className="row offset-md-1">
     <MovieList movies={movies} favouriteMovie={AddToFavorite} handleFavouritesClick={addFavouriteMovie}/>
      </div>
     </div>

     <div className="row p-5 offset-md-1">
         <Movieheading heading="Favourite"/>
       </div>

       <div className="p-md-5">
     <div className="row offset-md-1">
     <MovieList movies={favourite} favouriteMovie={RemoveFavourites} handleFavouritesClick={removeFavouriteMovie}/>
      </div>
     </div>
    </div>
  );
}

export default App;
