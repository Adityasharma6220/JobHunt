import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react'; // Search icon from lucide-react

const Browse = () => {
    useGetAllJobs(); // Hook to get all jobs
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    const [searchOpen, setSearchOpen] = useState(false); // Toggle search input visibility
    const [searchTerm, setSearchTerm] = useState(""); // Search input state
    const [filteredJobs, setFilteredJobs] = useState(allJobs); // Filtered jobs

    // Clear search query on unmount
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    // Update filtered jobs when search term changes
    useEffect(() => {
        const filtered = allJobs.filter((job) => {
            // Ensure job.company is not null or undefined and job.company.name is a string
            const companyName = job.company?.name || ''; // Fallback to an empty string if undefined
            return (
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                companyName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        // Sort filtered jobs by company name in alphabetical order
        const sortedFilteredJobs = filtered.sort((a, b) => {
            const companyA = a.company?.name?.toLowerCase() || '';
            const companyB = b.company?.name?.toLowerCase() || '';
            return companyA.localeCompare(companyB);
        });

        setFilteredJobs(sortedFilteredJobs);
    }, [searchTerm, allJobs]);

    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className='max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between'>
                    {/* Replace Browse with Search Icon */}
                    <h1 className='font-bold text-xl my-10 flex items-center'>
                        <Search 
                            className="mr-2 cursor-pointer" 
                            onClick={() => setSearchOpen(!searchOpen)} 
                        />
                        Search Results ({filteredJobs.length})
                    </h1>
                </div>

                {/* Conditionally render search input */}
                {searchOpen && (
                    <div className="mb-6">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                            placeholder="Search by job title, description, or company name..."
                        />
                    </div>
                )}

                {/* Grid for Job Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
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
