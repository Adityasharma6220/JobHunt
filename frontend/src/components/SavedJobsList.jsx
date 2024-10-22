import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

// Component to display saved/bookmarked jobs
const SavedJobsList = ({ savedJobs = [] }) => {
  if (savedJobs.length === 0) {
    return <p className="text-center">No bookmarked jobs yet.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bookmarked Jobs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedJobs.map((job) => (
          <div
            key={job._id}
            className="p-4 border rounded-md shadow-sm bg-white flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={job?.company?.logo} />
              </Avatar>
              <div>
                <h3 className="font-bold text-lg">{job.company.name}</h3>
                <p className="text-sm text-gray-500">{job.title}</p>
              </div>
            </div>
            <Button
              onClick={() => navigate(`/description/${job._id}`)}
              className="mt-2"
              variant="outline"
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

  

export default SavedJobsList;
