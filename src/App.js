import { appServer } from './api/axiosConfig';
import './App.css';
import  { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";
import Auth from "./components/Auth/Auth"
import Signup from './components/Signup/Signup';

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Fetching all movies
  const getMovies = async () => {
    try {
      const response = await appServer.get("/api/v1/movies");
      setMovies(response.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  // Fetching data for a single movie based on its ID
  const getMovieData = async (movieId) => {
    try {
      const response = await appServer.get(`/api/v1/movies/id/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviewIds); // Assuming reviewIds is an array
    } catch (err) {
      console.error("Error fetching movie data:", err);
    }
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        {/* <Route path="/" element={<Layout />} /> */}
        <Route path="/" element={<Navigate to="/login" replace/>}/>
        <Route exact path="/movies" element={<Home movies={movies} />} />
        <Route path="/signup"  element={<Signup/>}/>

        <Route default path="/login" element={<Auth  />}/>

        {/* Dynamic Route for Trailer */}
        <Route path="Trailer/:ytTrailerId" element={<Trailer />} />
        
        {/* Dynamic Route for Reviews - Passing props */}
        <Route
          path="Reviews/:movieId"
          element={
            <Reviews
              getMovieData={getMovieData}
              movie={movie}
              reviews={reviews}
              setReviews={setReviews}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
