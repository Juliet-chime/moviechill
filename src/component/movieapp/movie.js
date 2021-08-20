import React from 'react';
import '../../App.css'

const MovieList = (props) => {
    const FavouriteMovie = props.favouriteMovie
	return (
		<>
		{props.movies === null ? (<h1>Nothing found</h1>) : (
			<>
			{props.movies.map((movie, index) => (
				<div className='image-container col mb-5' key={index}>
					<img src={movie.Poster} alt='movie'></img>
                    <div 
                    className='overlay ml-5'
                    onClick={() => props.handleFavouritesClick(movie)}
                    >
						<FavouriteMovie/>
					</div>
				</div>
			))}
		</>
		)}
		</>
	);
};                                                                                                                                                                

export default MovieList;
