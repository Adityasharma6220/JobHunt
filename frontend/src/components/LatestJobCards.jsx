import React from 'react';
import { useSelector } from 'react-redux';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((store) => store.auth);

  // Handle "Apply Now" button click
  const handleApplyClick = (e) => {
    e.stopPropagation(); // Prevent the card click from navigating to details
    if (!isAuthenticated) {
      alert("Please log in to apply for this job."); // Simple prompt, you can use a modal here instead
    } else {
      navigate(`/job/apply/${job._id}`); // Navigate to apply page if authenticated
    }
  };

  // Check if company data is valid
  const companyName = job.company?.name || "Unknown Company"; // Fallback to "Unknown Company" if name is not available

  return (
    <div 
      onClick={() => navigate(`/description/${job._id}`)} 
      className="relative bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-lg p-6 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
    >
      <p className="text-2xl font-bold text-gray-900">{companyName}</p>
      <h2 className="text-2xl font-medium text-gray-900 mb-2">{job.title}</h2>
      <p className="text-lg font-medium text-gray-700">{companyName}</p>
      <p className="text-md text-gray-600 mt-1">{job.location}</p>

      {/* Badges for Location, Salary, etc. */}
      <div className="mt-4 flex justify-start space-x-2 items-center">
        <Badge className="bg-indigo-500 text-white py-1 px-3 rounded-full">Location: {job.location}</Badge>
        <Badge className="bg-green-500 text-white py-1 px-3 rounded-full">Salary: {job.salary}</Badge>
      </div>

      {/* Apply Now button */}
      <div className="mt-4 flex justify-between items-center">
        <button 
          onClick={handleApplyClick} 
          className="bg-[#6A38C2] text-white py-2 px-4 rounded-full hover:bg-[#4a2491] transition-all duration-200"
        >
          Apply Now
        </button>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-transparent to-purple-600 opacity-10 rounded-lg"></div>
    </div>
  );
};

export default LatestJobCards;
