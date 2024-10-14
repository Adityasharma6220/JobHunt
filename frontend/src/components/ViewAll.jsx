import React from 'react';
import Navbar from './shared/Navbar';

const ViewAll = () => {
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-2xl mb-8">All Questions</h1>
        
        {/* Sample list of questions, replace with actual data */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold">How to Answer “What Is Your Salary Expectations?”</h3>
            <p className="text-gray-600">Detailed answers and tips...</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold">Civil Engineering Interview Questions</h3>
            <p className="text-gray-600">Sample questions and answers...</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold">Mern Stack Interview Questions</h3>
            <p className="text-gray-600">Detailed answers and tips...</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold">Java Full Stack Interview Questions</h3>
            <p className="text-gray-600">Detailed answers and tips...</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold">Data Analyst Interview Questions</h3>
            <p className="text-gray-600">Detailed answers and tips...</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ViewAll;
