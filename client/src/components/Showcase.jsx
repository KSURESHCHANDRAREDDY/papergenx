import React from "react";
import { Carousel } from "react-bootstrap";

function Showcase() {
  const reviews = [
    {
      name: "Riya Sharma",
      role: "Teacher, Delhi Public School",
      text: "PaperGenX made it incredibly easy to generate custom question papers for my students. It saved me hours of work!",
      rating: 5,
    },
    {
      name: "Aditya Patel",
      role: "Class 10 Student",
      text: "The generated papers are perfectly structured and aligned with our syllabus. Great for practice tests!",
      rating: 4,
    },
    {
      name: "Neha Verma",
      role: "Principal, Bright Minds Academy",
      text: "An excellent tool for educators. The question papers are well-balanced and professional in presentation.",
      rating: 5,
    },
    {
      name: "Rahul Mehta",
      role: "Coaching Institute Owner",
      text: "I love how easily we can create papers of different difficulty levels. Highly recommend to all teachers!",
      rating: 5,
    },
  ];

  return (
    <div
      className="py-5"
      
    >
      <div className="container text-center">
        <h2 className="fw-bold mb-4" style={{ color: "#5b4b8a" }}>
          What People Say About Us
        </h2>
        <p className="text-muted mb-5">
          Real feedback from teachers, students, and institutions using PaperGenX.
        </p>

        <Carousel indicators={false} controls={false} interval={3500} pause={false}>
          {reviews.map((review, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
                <div
                  className="card border-0 shadow-lg rounded-4 p-4"
                  style={{ maxWidth: "700px", backgroundColor: "#fff" }}
                >
                  <div className="card-body">
                    <p
                      className="fst-italic mb-4"
                      style={{ fontSize: "1.1rem", lineHeight: "1.7" }}
                    >
                      “{review.text}”
                    </p>

                    <div className="d-flex flex-column align-items-center">
                      <h5 className="fw-bold mb-0">{review.name}</h5>
                      <small className="text-muted">{review.role}</small>

                      <div className="mt-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} style={{ color: "#ffc107", fontSize: "1.2rem" }}>
                            ★
                          </span>
                        ))}
                        {[...Array(5 - review.rating)].map((_, i) => (
                          <span key={i} style={{ color: "#e4e5e9", fontSize: "1.2rem" }}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Showcase;
