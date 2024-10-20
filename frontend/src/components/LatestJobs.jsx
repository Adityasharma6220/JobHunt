import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import ValuableResources from './ValuableResources';
import Testimonials from './Testimonials';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    // Create a new array and sort it alphabetically by company name
    const sortedJobs = [...allJobs].sort((a, b) => {
        const titleA = a.company.name.toLowerCase(); // Convert to lowercase for case-insensitive comparison
        const titleB = b.company.name.toLowerCase();
        return titleA.localeCompare(titleB); // Sort alphabetically
    });

    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            <h1 className='text-4xl font-bold text-center'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                {
                    sortedJobs.length <= 0 
                    ? <span>No Job Available</span> 
                    : sortedJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                }
            </div>
            <ValuableResources />
            <Testimonials />
        </div>
    );
};

export default LatestJobs;
