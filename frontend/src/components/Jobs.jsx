import React, { useEffect, useState } from 'react'; 
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// Utility function to calculate the difference in days between two dates
const getDaysDifference = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        // Function to filter jobs based on the selected filters
        const filteredJobs = allJobs.filter(job => {
            const matchesLocation = searchedQuery["Location"]?.length ? searchedQuery["Location"].includes(job.location) : true;
            const matchesIndustry = searchedQuery["Industry"]?.length ? searchedQuery["Industry"].includes(job.industry) : true;
            const matchesDepartment = searchedQuery["Role"]?.length ? searchedQuery["Role"].includes(job.title) : true;
            const matchSalary = searchedQuery["Salary"]?.length ? searchedQuery["Salary"].includes(job.salary) : true;
            const matchesExperience = searchedQuery["Experience"]?.length ? searchedQuery["Experience"].includes(job.experienceLevel) : true;
            const matchJobType = searchedQuery["Job Type"]?.length ? searchedQuery["Job Type"].includes(job.jobType) : true;

            // Match job posting date filter
            const matchJobPost = searchedQuery["Job Post"]?.length ? searchedQuery["Job Post"].some(postingFilter => {
                const jobDate = new Date(job.createdAt.split("T")[0]); // Extract the date part from 'createdAt'
                const currentDate = new Date(); // Current date
                const daysDifference = getDaysDifference(jobDate, currentDate); // Get the difference in days

                // Match against the selected filters for job posting date
                if (postingFilter === "< 1 Days" && daysDifference <= 1) return true;
                if (postingFilter === "< 2 Days" && daysDifference <= 2) return true;
                if (postingFilter === "< 3 Days" && daysDifference <= 3) return true;
                if (postingFilter === "< 4 Days" && daysDifference <= 4) return true;
                if (postingFilter === "< 6 Days" && daysDifference <= 6) return true;
                if (postingFilter === "< 7 Days" && daysDifference <= 7) return true;
                return false; // If no match, return false
            }) : true;

            return matchesLocation && matchesIndustry && matchesDepartment && matchesExperience && matchSalary && matchJobType && matchJobPost;
        });

        // Sorting the filtered jobs by company name
        const sortedJobs = filteredJobs.length > 0
            ? [...filteredJobs].sort((a, b) => {
                const nameA = a.company?.name || ""; // Fallback to empty string
                const nameB = b.company?.name || ""; // Fallback to empty string
                return nameA.localeCompare(nameB);
              })
            : [...allJobs].sort((a, b) => {
                const nameA = a.company?.name || ""; // Fallback to empty string
                const nameB = b.company?.name || ""; // Fallback to empty string
                return nameA.localeCompare(nameB);
              });

        setFilterJobs(sortedJobs);
    }, [allJobs, searchedQuery]); // Re-run the filter whenever allJobs or searchedQuery changes

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 p-4 '>
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
                                            <Job 
                                                job={job} 
                                                savedJobs={savedJobs} 
                                                setSavedJobs={setSavedJobs} 
                                            />
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
};

export default Jobs;
