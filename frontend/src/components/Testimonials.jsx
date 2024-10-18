import React from 'react';
import Navbar from './shared/Navbar';
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

const Testimonials = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-start min-h-screen bg-white overflow-hidden">
     
    

        {/* Testimonials Images Grid */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-6xl">
          {testimonialsData.map(({ id, image }) => (
            <div key={id} className="flex justify-center items-center bg-white p-4 rounded-lg">
              <img src={image} alt={`Testimonial ${id}`} className="object-contain w-full h-auto max-h-80" />
            </div>
          ))}
        </div>
        <div className="w-full  max-w-6xl mb-6">
  <iframe
    src="https://docs.google.com/forms/d/e/1FAIpQLSd6IBKWChdr0X6olUWR5oxEUx6CLe9jLL2X_I1ckzlUgkmUIA/viewform?embedded=true"
    className="w-full h-[800vh] rounded-lg shadow-lg" 
    frameBorder="0"
    allowFullScreen
    title="Testimonials Form"
    scrolling="no"
  ></iframe>
</div>
      </div>
    
    </div>

  );
};

export default Testimonials;
