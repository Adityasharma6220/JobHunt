import React, { useState } from 'react';
import { Button } from './ui/button';
import { Bookmark, AlertTriangle } from 'lucide-react'; // Import AlertTriangle for reporting
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job, savedJobs, setSavedJobs }) => {
    const navigate = useNavigate();
    
    const [showBookmarkPopup, setShowBookmarkPopup] = useState(false);
    const [showReportPopup, setShowReportPopup] = useState(false);
    const [isReported, setIsReported] = useState(false); // State to track if job is reported

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    const handleBookmark = () => {
        if (savedJobs.some(savedJob => savedJob._id === job._id)) {
            setSavedJobs(savedJobs.filter(savedJob => savedJob._id !== job._id));
            setShowBookmarkPopup(false); // Close popup when unbookmarking
        } else {
            setSavedJobs([...savedJobs, job]);
            setShowBookmarkPopup(true); // Show popup when bookmarking
        }
    };

    const handleReport = () => {
        if (isReported) {
            // Reset reported state
            setIsReported(false);
            setShowReportPopup(false); // Hide report popup
        } else {
            // Mark job as reported
            setIsReported(true);
            // Handle reporting the job (e.g., send to server)
            console.log(`Reported job: ${job.company.name} as fake`);
            setShowReportPopup(true); // Show report confirmation popup
        }
    };

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 h-full flex flex-col justify-between'>
            <div>
                <div className='flex items-center justify-between'>
                    <p className='text-sm text-gray-500'>
                        {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </p>
                    <div className="flex gap-2">
                        <Button onClick={handleBookmark} variant="outline" className="rounded-full" size="icon">
                            <Bookmark color={savedJobs.some(savedJob => savedJob._id === job._id) ? 'blue' : 'gray'} />
                        </Button>
                        <Button 
                            onClick={handleReport} 
                            variant="outline" 
                            className={`rounded-full ${isReported ? 'bg-red-100 text-white' : 'bg-gray-200 text-gray-700'}`} 
                            size="icon"
                        >
                            <AlertTriangle color={isReported ? 'red' : 'white'} />
                        </Button>
                    </div>
                </div>

                <div className='flex items-center gap-4 my-4'>
                    <Button onClick={() => navigate(`/description/${job?._id}`)} className="p-6" variant="outline" size="icon">
                        <Avatar>
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                    </Button>
                    <div className='overflow-hidden'>
                        <h1 className='font-bold text-lg whitespace-nowrap overflow-ellipsis overflow-hidden'>{job?.company?.name}</h1>
                        <p className='text-sm text-gray-500'>India</p>
                    </div>
                </div>

                <div>
                    <h1 className='font-medium text-lg my-2 overflow-hidden overflow-ellipsis line-clamp-2'>{job?.title}</h1>
                    <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
                </div>

                <div className='flex flex-wrap gap-2 mt-4'>
                    <Badge className='text-blue-700 font-bold text-sm' variant="ghost">
                        {job?.position} Positions
                    </Badge>
                    <Badge className='text-blue-700 font-bold text-sm' variant="ghost">
                        {job?.location} location
                    </Badge>
                    <Badge className='text-[#F83002] font-bold text-sm' variant="ghost">
                        {job?.jobType}
                    </Badge>
                    <Badge className='text-[#7209b7] font-bold text-sm' variant="ghost">
                        {job?.salary} lpa  
                    </Badge>
                    <Badge className='text-[#7209b7] font-bold text-sm' variant="ghost">
                        {job?.experienceLevel} EXP
                    </Badge>
                </div>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
                    Details
                </Button>
                <Button className="bg-[#7209b7]">
                    Save For Later
                </Button>
            </div>

            {/* Bookmark Popup */}
            {showBookmarkPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <p className="text-lg">Job bookmarked!</p>
                        <button onClick={() => setShowBookmarkPopup(false)} className="mt-4 text-blue-500">Close</button>
                    </div>
                </div>
            )}

            {/* Report Popup */}
            {showReportPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white  p-5 rounded shadow-lg">
                        <p className="text-lg">You have reported this company as fake.</p>
                        <button onClick={() => setShowReportPopup(false)} className="mt-4 text-red-500 underline">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Job;
