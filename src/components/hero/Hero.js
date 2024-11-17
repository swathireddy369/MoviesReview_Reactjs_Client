import React from 'react'
import "./Hero.css"
import Carousel from "react-material-ui-carousel";
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button";
const Hero = ({ movies }) => {
    const navigate = useNavigate();
    function reviews(movieId) {
        navigate(`/Reviews/${movieId}`)
    }
    console.log("--------", movies)
    return (
        <div>
            <Carousel>
                {
                    movies && movies.map((item, index) => {
                        return (
                            <Paper key={index}>

                                <div className='movie-card-container'>
                                    <div className='movie-card' style={{ "--img": `url(${item.backdrops[0]})` }}>
                                        <div className='movie-detail'>
                                            <div className='movie-poster'>
                                                <img src={item.poster} alt=""></img>

                                            </div>
                                            <div className='movie-title'>
                                                <h4>
                                                    {item.title}
                                                </h4>

                                            </div>
                                            <div className='movie-buttons-container'>
                                                <Link to={`Trailer/${item.trailerLink.substring(item.trailerLink.length - 11)}`}>
                                                    <div className='play-button-icon-conatiner'>
                                                        <FontAwesomeIcon className='play-button-icon' icon={faCirclePlay}></FontAwesomeIcon>
                                                    </div>
                                                </Link>
                                                <div className='movie-review-button-container'>
                                                    <Button variant="info" onClick={() => reviews(item.imdbId)} >Reviews</Button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </Paper>

                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default Hero
