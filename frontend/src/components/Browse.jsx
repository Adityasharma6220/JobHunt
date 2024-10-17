import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

const Browse = () => {
    useGetAllJobs(); // Hook to get all jobs
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    // Clear search query on unmount
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className='max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8'>
                <h1 className='font-bold text-xl my-10'>
                    Search Results ({allJobs.length})
                </h1>

                {/* Grid for Job Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {allJobs.length > 0 ? (
                        allJobs.map((job) => (
                            <motion.div
                                className='max-w-xs mx-auto'
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -100 }}
                                transition={{ duration: 0.3 }}
                                key={job._id}
                            >
                                <Job job={job} />
                            </motion.div>
                        ))
                    ) : (
                        <span className='text-center w-full col-span-full'>
                            No jobs found.
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Browse;
