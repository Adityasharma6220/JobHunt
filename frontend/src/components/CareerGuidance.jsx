

import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Link } from 'react-router-dom';
import salaryImage from '../assets/salary.png'; 
import civilEngineeringImage from '../assets/civil1.jpg';
import mernstack from '../assets/mernstack.png';
import mernexp from '../assets/mernexperince.jpg'
import javaexp from '../assets/javaexper.jpg'
import dataexp from '../assets/dataexperince.webp'
import java from '../assets/java1.png';
import dataany from '../assets/DataAny.png';

const CareerGuidance = () => {

  const [selectedCategory, setSelectedCategory] = useState('QandA');
  const cardData = {
    QandA: [
      {
        id: 1,
        imgSrc: salaryImage,
        altText: "Salary Expectations",
        title: "How to Answer 'What Is Your Salary Expectations?'",
        description: "Best Answers For...",
        readTime: "9 min read",
        views: "24,945 views",
        likes: "3 likes",
        link : "https://www.youtube.com/shorts/-dNj_NE6Uno"
      },
      {
        id: 2,
        imgSrc: civilEngineeringImage,
        altText: "Civil Engineering Interview Questions",
        title: "Civil Engineering Interview Questions (For Freshers)",
        description: "Important Questions with Answers...",
        readTime: "8 min read",
        views: "6,069 views",
        likes: "4 likes",
        link:"https://www.youtube.com/shorts/OlkLOofKjgk"
      },
      {
        id: 3,
        imgSrc: mernstack,
        altText: "MERN Stack Interview Questions",
        title: "MERN Stack Interview Questions (For Freshers)",
        description: "Important Questions with Answers...",
        readTime: "8 min read",
        views: "6,069 views",
        likes: "4 likes",
        link:"https://www.youtube.com/shorts/ufyVoKzlzzg"
      },
      {
        id: 4,
        imgSrc: java,
        altText: "Java Interview Questions",
        title: "Java Interview Questions (For Freshers)",
        description: "Important Questions with Answers...",
        readTime: "8 min read",
        views: "6,069 views",
        likes: "4 likes",
        link :"https://www.youtube.com/shorts/hasloamb29o"
      },
      {
        id: 5,
        imgSrc: dataany,
        altText: "Data Analyst Interview Questions",
        title: "Data Analyst Interview Questions (For Freshers)",
        description: "Important Questions with Answers...",
        readTime: "8 min read",
        views: "6,069 views",
        likes: "4 likes",
        link: "https://www.youtube.com/shorts/eLJAALcpd2A"
      }
    ],
    InterviewExperience: [
      {
        id: 1,
        imgSrc: mernexp,
        altText: "MERN Stack Expereince",
        title: "MERN Stack Interview Questions (For Freshers)",
        description: "Important Questions with Answers...",
        readTime: "8 min read",
        views: "6,069 views",
        likes: "4 likes",
        link:"https://www.youtube.com/shorts/eLJAALcpd2A"
      },
      {
        id: 2,
        imgSrc: javaexp,
        altText: "Java Expereince",
        title: "Java Interview Questions (For Freshers)",
        description: "Important Questions with Answers...",
        readTime: "8 min read",
        views: "6,069 views",
        likes: "4 likes",
        link:"https://www.youtube.com/shorts/eLJAALcpd2A"
      },
      {
        id: 3,
        imgSrc: dataexp,
        altText: "Data Expereince",
        title: "Java Interview Questions (For Freshers)",
        description: "Important Questions with Answers...",
        readTime: "8 min read",
        views: "6,069 views",
        likes: "4 likes",
        link:"https://www.youtube.com/shorts/eLJAALcpd2A"
      },
    ],
    Leaders: [
      {
        id: 5,
        imgSrc: dataany,
        altText: "Data Analyst Interview Questions",
        title: "Data Analyst Interview Questions (For Freshers)",
        description: "Important Questions with Answers...",
        readTime: "8 min read",
        views: "6,069 views",
        likes: "4 likes",
        link:"https://www.youtube.com/shorts/eLJAALcpd2A"
      },
    ],
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-2xl mb-8">Career Guidance</h1>

        <div className='flex items-center justify-around mx-auto max-w-7xl h-16  border-black-500 border-b-2 mb-6'>
          <button onClick={() => handleCategoryChange('QandA')} className={`px-4 py-2 rounded-md ${
              selectedCategory === 'QandA' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}>
            Question & Answers
          </button>
          <button onClick={() => handleCategoryChange('InterviewExperience')} className={`px-4 py-2 rounded-md ${
              selectedCategory === 'InterviewExperience' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}>
            Interview Experience
          </button>
          <button onClick={() => handleCategoryChange('Leaders')} className={`px-4 py-2 rounded-md ${
              selectedCategory === 'Leaders' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}>
            Learn from Leaders
          </button>
          {/* <div>
            <Link to="/view-all" className="text-blue-500">View all</Link>
          </div> */}
        </div>

  
        <div className="flex space-x-4 grid-rows-*">
       
          {cardData[selectedCategory].map((card) => (
            <a key={card.id} 
                 href={card.link} className="col-span-4 bg-white rounded-lg shadow-lg border border-gray-200 w-20px">
              <div className="card-image">
                <img
                  src={card.imgSrc}
                  alt={card.altText}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.description}</p>

                <div className="text-gray-500 text-sm flex justify-between">
                  <span>{card.readTime}</span>
                  <span>{card.views}</span>
                  <span>{card.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerGuidance;


