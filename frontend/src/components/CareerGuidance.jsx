

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
import edx from '../assets/edx.png';
import udemy from '../assets/udemy.jpeg'
import linkedin from '../assets/linkedin.jpeg'
import dataany from '../assets/DataAny.png';
import coursera from "../assets/Coursera.jpg"
import eventsImage from '../assets/events.webp'; 
import eventsImage2 from '../assets/events2.jpg';// Placeholder for events image
import competitionsImage from '../assets/competition.avif';
import competitionsImage2 from '../assets/competitionsImage2.jpg'; // Placeholder for competitions image
import scholarshipsImage from '../assets/scholarship.jpg';
import scholarshipsImage2 from '../assets/scholarshipsImage2.jpg'; // Placeholder for scholarships image
import jobFairsImage from '../assets/VirtualJobFairs.jpg';
import jobFairsImage2 from '../assets/jobFairsImage2.jpg'; // Placeholder for job fairs image
import webinarImage from '../assets/webinar.jpeg'; // Placeholder for webinars image
import webinarImage2 from '../assets/webinarImage2.jpg';

const CareerGuidance = () => {

  const [selectedCategory, setSelectedCategory] = useState('InterviewExperience');
  const cardData = {
    QandA: [
      // {
      //   id: 1,
      //   imgSrc: salaryImage,
      //   altText: "Salary Expectations",
      //   title: "How to Answer 'What Is Your Salary Expectations?'",
      //   description: "Best Answers For...",
      //   readTime: "9 min read",
      //   views: "24,945 views",
      //   likes: "3 likes",
      //   link : "https://www.youtube.com/shorts/-dNj_NE6Uno"
      // },
      // {
      //   id: 2,
      //   imgSrc: civilEngineeringImage,
      //   altText: "Civil Engineering Interview Questions",
      //   title: "Civil Engineering Interview Questions (For Freshers)",
      //   description: "Important Questions with Answers...",
      //   readTime: "8 min read",
      //   views: "6,069 views",
      //   likes: "4 likes",
      //   link:"https://www.youtube.com/shorts/OlkLOofKjgk"
      // },
      // {
      //   id: 3,
      //   imgSrc: mernstack,
      //   altText: "MERN Stack Interview Questions",
      //   title: "MERN Stack Interview Questions (For Freshers)",
      //   description: "Important Questions with Answers...",
      //   readTime: "8 min read",
      //   views: "6,069 views",
      //   likes: "4 likes",
      //   link:"https://www.youtube.com/shorts/ufyVoKzlzzg"
      // },
      // {
      //   id: 4,
      //   imgSrc: java,
      //   altText: "Java Interview Questions",
      //   title: "Java Interview Questions (For Freshers)",
      //   description: "Important Questions with Answers...",
      //   readTime: "8 min read",
      //   views: "6,069 views",
      //   likes: "4 likes",
      //   link :"https://www.youtube.com/shorts/hasloamb29o"
      // },
      // {
      //   id: 5,
      //   imgSrc: dataany,
      //   altText: "Data Analyst Interview Questions",
      //   title: "Data Analyst Interview Questions (For Freshers)",
      //   description: "Important Questions with Answers...",
      //   readTime: "8 min read",
      //   views: "6,069 views",
      //   likes: "4 likes",
      //   link: "https://www.youtube.com/shorts/eLJAALcpd2A"
      // }
    ],
    InterviewExperience: [
      {
        id: 1,
        companyName :"Infycle Technologies" ,
        imgSrc: "https://images.ctfassets.net/pdf29us7flmy/1AI7g4HlvOAnW3K5WRQ3vV/9bff41707a194ffdc2b06d0306a2c5ed/Interview_tips.jpg",
        altText: "MERN Stack Expereince",
        title: "MERN Stack Interview Questions (For Freshers)",
        description: "Important Questions with Answers...",
        readTime: "8 min read",
        views: "6,069 views",
        likes: "4 likes",
        link:"https://infycletechnologies.com/freshers-interview-questions-answers/"
      },
      {
        id: 2,
        companyName :"Yodli" ,
        imgSrc: "https://images.ctfassets.net/pdf29us7flmy/5y08rbLxVoaMlnRGXxfsms/f455f5430679821cbde1317fd84f43cc/Top_interview_tips.jpg?w=720&q=100&fm=jpg",
        altText: "Java Expereince",
        title: "Java Interview Questions (For Freshers)",
        description: "Important Questions with Answers...",
        readTime: "8 min read",
        views: "6,069 views",
        likes: "4 likes",
        link:"https://yoodli.ai/blog/23-interview-questions-for-freshers-plus-answer"
      },
      {
        id: 3,
        companyName :"Interview Cracker" ,
        imgSrc: "https://images.ctfassets.net/pdf29us7flmy/2S7snvMnmVM1hI7Y3mEJO8/b7c4999d2e1b210b2421cbb9f0af5ac3/UwT7wUKw.png?w=720&q=100&fm=jpg",
        altText: "Data Expereince",
        title: "Java Interview Questions (For Freshers)",
        description: "Top 20 Interview Questions and Answers for Freshers",
        readTime: "8 min read",
        views: "6,069 views",
        likes: "4 likes",
        link:"https://interviewcracker.com/blog/top-20-interview-questions-and-answers-for-freshers-and-interns"
      },{
        id: 4,
        companyName :"Ace Your First Job Interview with Coursera" ,
        imgSrc: "https://images.ctfassets.net/pdf29us7flmy/dPdD5nOKmwMSWaKJDJ4VW/cadd6776536cf0abda678b795227b5d6/7lNdSMQY.png?w=720&q=100&fm=jpg",
        altText: "Data Analyst Interview Questions",
        title: "Data Analyst Interview Questions (For Freshers)",
        description: "Top 11 Questions Freshers Must Prepare For",
        readTime: "8 min read",
        views: "6,069 views",
        likes: "4 likes",
        link: "https://www.coursera.org/in/articles/interview-questions-for-freshers"
      }
    ],
   
    Courses: [
      {
        id: 1,
        imgSrc: coursera,
        altText: 'Coursera',
        title: 'Coursera - Online Courses',
        description: "Explore courses on Coursera",
        link: "https://www.coursera.org/"
      },
      {
        id: 2,
        imgSrc: edx,
        altText: 'edX',
        title: 'edX - Online Courses',
        description: "Explore courses on edX",
        link: "https://www.edx.org/"
      },
      {
        id: 3,
        imgSrc: udemy,
        altText: 'Udemy',
        title: 'Udemy - Online Courses',
        description: "Explore courses on Udemy",
        link: "https://www.udemy.com/"
      },
      {
        id: 4,
        imgSrc: linkedin,
        altText: 'LinkedIn Learning',
        title: 'LinkedIn Learning - Online Courses',
        description: "Explore courses on LinkedIn Learning",
        link: "https://www.linkedin.com/learning/"
      }
    ],
    Events: [
      {
        id: 1,
        companyName:"Gyandhan",
        imgSrc: "https://d1i7580riw15wg.cloudfront.net/gd-assets/newui/home_page_hero_img-d1fd964c7c2ed889688808cc2604996926e6338105c3996295221dced9d03c06.webp",
        altText: 'Upcoming Tech Events',
        title: 'Upcoming Events for Learning and Networking',
        description: "Attend top events in the tech industry.",
        link: "https://www.gyandhan.com/events" // Placeholder for the link
      },
      {
        id: 2,
        companyName:"Techcrunch",
        imgSrc: "https://www.adweek.com/wp-content/uploads/2022/09/techcrunch-subscription-events-revenue-2022.jpg?w=1200",
        altText: 'Webinars on Technology',
        title: 'Webinars on Latest Technologies',
        description: "Stay updated with the latest in tech.",
        link: "https://techcrunch.com/events/" // Placeholder for the link
      },
      {
        id: 3,
        companyName:"Startupgrind",
        imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiewBZvTn97q9Wow8_kCbMW4foRlANixOxeVTqpQUVL5AP56OjZDQPmRulCL1DbpCTsyQ&usqp=CAU",
        altText: 'Upcoming Tech Events',
        title: 'Upcoming Events for Learning and Networking',
        description: "Attend top events in the tech industry.",
        link: "https://www.startupgrind.com/events/" // Placeholder for the link
      },
      {
        id: 4,
        companyName:"Ted",
        imgSrc: "https://tedxwinterpark.com/wp-content/uploads/2019/11/TEDxWinterPark-About-TEDx.jpg",
        altText: 'Upcoming Tech Events',
        title: 'Upcoming Events for Learning and Networking',
        description: "Attend top events in the tech industry.",
        link: "https://www.ted.com/tedx/events" // Placeholder for the link
      },
    ],
    Competitions: [
      {
        id: 1,
        imgSrc: competitionsImage,
        altText: 'Google Hash Code',
        title: 'Google Hash Code',
        description: "A team-based programming competition.",
        link: "https://codingcompetitions.withgoogle.com/hashcode"
      },
      {
        id: 2,
        imgSrc: competitionsImage2,
        altText: 'Microsoft Imagine Cup',
        title: 'Microsoft Imagine Cup',
        description: "Global student technology competition.",
        link: "https://www.imaginecup.com/"
      },
    ],
    Scholarships: [
      {
        id: 1,
        imgSrc: scholarshipsImage,
        altText: 'Fulbright Scholarship',
        title: 'Fulbright Scholarship',
        description: "Opportunities for international educational exchange.",
        link: "https://fulbright.org/"
      },
      {
        id: 2,
        imgSrc: scholarshipsImage2,
        altText: 'Chevening Scholarship',
        title: 'Chevening Scholarship',
        description: "UK government’s global scholarship program.",
        link: "https://www.chevening.org/"
      },
    ],
    VirtualJobFairs: [
      {
        id: 1,
        imgSrc: jobFairsImage,
        altText: 'ibentos Virtual Job Fair',
        title: 'ibentos Virtual Job & Career Fair Platform',
        description: "Find career opportunities.",
        link: "https://ibentos.com/"
      },
      {
        id: 2,
        imgSrc: jobFairsImage2,
        altText: 'Tech Career Fair',
        title: 'Tech Career Fair',
        description: "Connect with top tech companies.",
        link: "https://www.techcareerfair.com/"
      },
    ],
    Webinars: [
      {
        id: 1,
        imgSrc: webinarImage,
        altText: 'AI & Machine Learning Webinar',
        title: 'AI & Machine Learning - What’s Next?',
        description: "Join us for insights into the future of AI.",
        link: "https://www.example.com/webinar/ai" 
      },
      {
        id: 2,
        imgSrc: webinarImage2,
        altText: 'Web Development Trends Webinar',
        title: 'Web Development Trends in 2024',
        description: "Stay updated with the latest trends.",
        link: "https://www.example.com/webinar/webdev" 
      },
      {
        id: 3,
        imgSrc: webinarImage,
        altText: 'AI & Machine Learning Webinar',
        title: 'AI & Machine Learning - What’s Next?',
        description: "Join us for insights into the future of AI.",
        link: "https://www.example.com/webinar/ai" 
      },
      {
        id: 4,
        imgSrc: webinarImage,
        altText: 'AI & Machine Learning Webinar',
        title: 'AI & Machine Learning - What’s Next?',
        description: "Join us for insights into the future of AI.",
        link: "https://www.example.com/webinar/ai" 
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
          {/* <button onClick={() => handleCategoryChange('QandA')} className={`px-4 py-2 rounded-md ${
              selectedCategory === 'QandA' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}>
            {/* Question & Answers */}
          {/* </button>  */}
          <button onClick={() => handleCategoryChange('InterviewExperience')} className={`px-4 py-2 rounded-md ${
              selectedCategory === 'InterviewExperience' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}>
            Interview Experience
          </button>
    
          <button onClick={() => handleCategoryChange('Courses')} className={`px-4 py-2 rounded-md ${
              selectedCategory === 'Courses' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}>
            Courses
          </button>
          <button onClick={() => handleCategoryChange('Events')} className={`px-4 py-2 rounded-md ${
              selectedCategory === 'Events' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}>
            Events
          </button>
          <button onClick={() => handleCategoryChange('Competitions')} className={`px-4 py-2 rounded-md ${
              selectedCategory === 'Competitions' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}>
           Competitions
          </button>
          <button onClick={() => handleCategoryChange('Scholarships')} className={`px-4 py-2 rounded-md ${
              selectedCategory === 'Scholarships' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}>
            Scholarships
          </button>
          <button onClick={() => handleCategoryChange('VirtualJobFairs')} className={`px-4 py-2 rounded-md ${
              selectedCategory === 'VirtualJobFairs' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}>
            VirtualJob Fairs
          </button>
          <button onClick={() => handleCategoryChange('Webinars')} className={`px-4 py-2 rounded-md ${
              selectedCategory === 'Webinars' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}>
            Webinars
          </button>
          {/* <div>
            <Link to="/view-all" className="text-blue-500">View all</Link>
          </div> */}
        </div>

  
        <div className="flex space-x-4 grid-rows-*">
       
          {cardData[selectedCategory].map((card) => (
            <a key={card.id} 

                 href={card.link}
                 target="_blank" // Open link in a new tab
                 rel="noopener noreferrer"  className="col-span-4 bg-white rounded-lg shadow-lg border border-gray-200 w-20px">
              <div className="card-image">
                <img
                  src={card.imgSrc}
                  alt={card.altText}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h1 className="text-lg font-semibold mb-2"> {card.companyName}</h1>
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
}

export default CareerGuidance;


