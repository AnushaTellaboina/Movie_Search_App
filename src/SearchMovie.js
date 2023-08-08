

import React, { useState } from 'react';
import MovieCard from './MovieCard';

export default function SearchMovie() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    if (!query) {
      return; 
    }

    const apiKey = 'e8035dd25b1baeef86f5fd9f71e15395';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.results) {
        setMovies(data.results);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name:
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
