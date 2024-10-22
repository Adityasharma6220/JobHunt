import React from 'react'; 
import { useLocation } from 'react-router-dom'; // Import useLocation
import one from '../assets/1.png';
import two from '../assets/2.png';
import three from '../assets/3.png';
import four from '../assets/4.png';
import five from '../assets/5.png';
import six from '../assets/6.png';
import seven from '../assets/7.png';
import eight from '../assets/8.png';
import nine from '../assets/9.png';
import ten from '../assets/10.png';
import eleven from '../assets/11.png';
import twelve from '../assets/12.png';
import thirten from '../assets/13.png';
import fourten from '../assets/14.png';
import fiften from '../assets/15.png';
import Navbar from './shared/Navbar';
import sixten from '../assets/path.jpeg';

const testimonialsData = [
  { id: 1, image: one },
  { id: 2, image: two },
  { id: 3, image: three },
  { id: 4, image: four },
  { id: 5, image: five },
  { id: 6, image: six },
  { id: 7, image: seven },
  { id: 8, image: eight },
  { id: 9, image: nine },
  { id: 10, image: ten },
  { id: 11, image: eleven },
  { id: 12, image: twelve },
  { id: 13, image: thirten },
  { id: 14, image: fourten },
  { id: 15, image: fiften },
];

const testimonialsimg = [
  { id: 16, image: sixten }
];

const Testimonials = () => {
  const location = useLocation(); 

  const isHomePage = location.pathname === "/";

  return (
    <div>
      {/* Only show Navbar if not on home page */}
      {!isHomePage && <Navbar/>}

      <div className="flex flex-col items-center justify-start min-h-screen bg-white overflow-hidden">
        
        {/* Show heading and description text only if not on home page */}
        {!isHomePage && (
          <>
            {/* Heading for Testimonials */}
            <h1 className="text-3xl font-bold text-center my-8">
              Hear from the Community: Search Experience Insights
            </h1>

            {/* Description Text */}
            <p className="text-lg text-center mb-6 max-w-3xl">
              We asked, you answered! Our recent survey reveals the latest trends and preferences in job search experiences. Discover what these respondents from diverse backgrounds have to say about finding their dream job.
            </p>
          </>
        )}

        {/* Testimonials Images Grid */}
        <div className="grid gap-4 w-full">
          {isHomePage ? (
            // Show only the sixten image on the homepage
            testimonialsimg.map(({ id, image }) => (
              <div key={id} className="flex justify-center">
                <img src={image} alt={`Testimonial ${id}`} className="w-96 h-auto" />
              </div>
            ))
          ) : (
            // Show all testimonials on other pages
            testimonialsData.map(({ id, image }) => (
              <div key={id} className="flex justify-center items-center bg-white p-4 rounded-lg">
                <img src={image} alt={`Testimonial ${id}`} className="object-contain w-full h-auto max-h-80" />
              </div>
            ))
          )}
        </div>

        {/* Show iframe only if not on home page */}
        {!isHomePage && (
          <div className="w-full max-w-6xl mb-6">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSd6IBKWChdr0X6olUWR5oxEUx6CLe9jLL2X_I1ckzlUgkmUIA/viewform?embedded=true"
              className="w-full h-[800vh] rounded-lg shadow-lg"
              frameBorder="0"
              allowFullScreen
              title="Testimonials Form"
              scrolling="no"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
