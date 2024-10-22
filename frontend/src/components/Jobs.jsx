import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import SavedJobsList from "./SavedJobsList"; 
import { useSelector } from "react-redux";
import { motion } from "framer-motion";


const getDaysDifference = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};


const isSalaryMatch = (salary, selectedSalaries) => {
  const salaryValue = parseInt(salary, 10);
  return selectedSalaries.some((range) => {
    if (range.startsWith("<")) {
      const limit = parseInt(range.split(" ")[1], 10);
      return salaryValue < limit;
    } else if (range.startsWith(">=")) {
      const limit = parseInt(range.split(" ")[1], 10);
      return salaryValue >= limit;
    }
    return false;
  });
};

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]); 

  useEffect(() => {
   
    const filteredJobs = allJobs.filter((job) => {
      const matchesLocation = searchedQuery["Location"]?.length
        ? searchedQuery["Location"].includes(job.location)
        : true;
      const matchesIndustry = searchedQuery["Industry"]?.length
        ? searchedQuery["Industry"].includes(job.industry)
        : true;
      const matchesDepartment = searchedQuery["Role"]?.length
        ? searchedQuery["Role"].includes(job.title)
        : true;
      const matchSalary = searchedQuery["Salary"]?.length
        ? isSalaryMatch(job.salary, searchedQuery["Salary"])
        : true; // Call the salary matching function
      const matchesExperience = searchedQuery["Experience"]?.length
        ? searchedQuery["Experience"].includes(job.experienceLevel)
        : true;
      const matchJobType = searchedQuery["Job Type"]?.length
        ? searchedQuery["Job Type"].includes(job.jobType)
        : true;

      const matchJobPost = searchedQuery["Job Post"]?.length
        ? searchedQuery["Job Post"].some((postingFilter) => {
            const jobDate = new Date(job.createdAt.split("T")[0]); 
            const currentDate = new Date(); // Current date
            const daysDifference = getDaysDifference(jobDate, currentDate); 

           
            return (
              (postingFilter === "< 1 Days" && daysDifference <= 1) ||
              (postingFilter === "< 2 Days" && daysDifference <= 2) ||
              (postingFilter === "< 3 Days" && daysDifference <= 3) ||
              (postingFilter === "< 4 Days" && daysDifference <= 4) ||
              (postingFilter === "< 5 Days" && daysDifference <= 5) ||
              (postingFilter === "< 6 Days" && daysDifference <= 6) ||
              (postingFilter === "< 7 Days" && daysDifference <= 7)
            );
          })
        : true;

      return (
        matchesLocation &&
        matchesIndustry &&
        matchesDepartment &&
        matchesExperience &&
        matchSalary &&
        matchJobType &&
        matchJobPost
      );
    });

    const sortedJobs =
      filteredJobs.length > 0
        ? [...filteredJobs].sort((a, b) => {
            const nameA = a.company?.name || "";
            const nameB = b.company?.name || "";
            return nameA.localeCompare(nameB);
          })
        : [...allJobs].sort((a, b) => {
            const nameA = a.company?.name || "";
            const nameB = b.company?.name || "";
            return nameA.localeCompare(nameB);
          });

    setFilterJobs(sortedJobs);
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 p-4 ">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/4">
            <FilterCard />
          </div>
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <span className="text-center">Job not found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            )}
          </div>
        </div>
        {/* Saved jobs section */}
        <div className="mt-8">
          <SavedJobsList savedJobs={savedJobs} />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
