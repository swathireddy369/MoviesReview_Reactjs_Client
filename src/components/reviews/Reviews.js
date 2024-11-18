import { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import ReviewForm from "../reviewForm/ReviewForm";


const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, [])

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;
        try {
            if(rev.value != null && rev.value.length !== 0  )
                {
                    const response = await api.post("/api/v1/reviews", { reviewBody: rev.value, imdbId: movieId })
                const updateReviews = [...reviews, { body: rev.value }]
                rev.value = ""
                setReviews(updateReviews);
            }
           
           
        } catch (error) {
            console.log("err", error);
        }

    }


   
    
    return (
        <Container>
            <Row>
                <Col ><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText={"Write a Review"}></ReviewForm>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                      reviews&&  reviews?.map((r, i) => {
                            return (
                                <div key={i}>
                                    <Row >
                                        <Col >{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}
export default Reviews;