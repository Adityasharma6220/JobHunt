import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job); // Get all jobs and search query from Redux
    const [filterJobs, setFilterJobs] = useState([]);

    useEffect(() => {
        const filteredJobs = allJobs.filter((job) => {
            // Check if job matches any of the selected filters
            const matchesFilters = Object.keys(searchedQuery).every(filterType => {
                const selectedValues = searchedQuery[filterType];
                if (!selectedValues?.length) return true; // No filters applied for this type
                return selectedValues.some(value => 
                    job[filterType]?.toLowerCase().includes(value.toLowerCase())
                );
            });

            return matchesFilters;
        });

        setFilterJobs(filteredJobs.length > 0 ? filteredJobs : allJobs); // Default to allJobs if none found
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 p-4'>
                <div className='flex flex-col md:flex-row gap-5'>
                    <div className='w-full md:w-1/4'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? (
                            <span className='text-center'>Job not found</span>
                        ) : (
                            <div className='flex-1'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {filterJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            key={job?._id}
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Jobs;
