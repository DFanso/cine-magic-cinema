import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './css/Testimonial-Section.css'; // Assuming you have a CSS file for styling

const testimonials = [
    {
        quote: "The film's stunning visuals and innovative sound design create an immersive experience that's both enthralling and evocative.",
        name: "Jenny Wilson",
        position: "Project Manager at Microsoft"
    },
    {
        quote: "The story unfolds with a balanced mix of suspense and drama, keeping the audience on the edge of their seats while also allowing for moments of heartfelt emotion",
        name: "Robert Fox",
        position: "Founder at Brain.co"
    },
    {
        quote: "The film is an exemplary showcase of filmmaking that will resonate with audiences and spark conversations long after the credits roll.",
        name: "Kristin Watson",
        position: "UX Designer at Google"
    }
];

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    // StarRating component
    const StarRating = ({ rating }) => {
        return (
            <div className="star-rating">
                {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className={`star ${index < rating ? 'filled' : 'empty'}`}>
                        {index < rating ? '★' : '☆'}
                    </span>
                ))}
            </div>
        );
    };


    return (
        <div className="testimonial-section">
            <Slider {...settings}>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-card">
                        {/* <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" /> */}
                        <h5 className="testimonial-name">{testimonial.name}</h5>
                        <p className="testimonial-quote">{testimonial.quote}</p>
                        <StarRating rating={4} /> {/* Example fixed rating */}
                        {/* <p className="testimonial-position">{testimonial.position}</p> */}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Testimonials;
