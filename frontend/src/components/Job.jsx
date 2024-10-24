import React, { useState } from 'react';
import { Button } from './ui/button';
import { Bookmark, AlertTriangle } from 'lucide-react'; 
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job, savedJobs, setSavedJobs }) => {
    const navigate = useNavigate();
    
    const [showBookmarkPopup, setShowBookmarkPopup] = useState(false);
    const [showReportPopup, setShowReportPopup] = useState(false);
    const [isReported, setIsReported] = useState(false);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    const handleBookmark = () => {
        if (savedJobs.some(savedJob => savedJob._id === job._id)) {
            setSavedJobs(savedJobs.filter(savedJob => savedJob._id !== job._id));
            setShowBookmarkPopup(false); 
        } else {
            setSavedJobs([...savedJobs, job]);
            setShowBookmarkPopup(true);
        }
    };

    const handleReport = () => {
        if (isReported) {
            setIsReported(false);
            setShowReportPopup(false);
        } else {
            setIsReported(true);
            console.log(`Reported job: ${job.company.name} as fake`);
            setShowReportPopup(true);
        }
    };

    return (
        <div className='w-full bg-white shadow-lg rounded-lg p-5 border border-gray-200 h-full flex flex-col justify-between transition-transform transform hover:scale-105'>
            <div>
                <div className='flex items-center justify-between'>
                    <p className='text-sm text-gray-500'>
                        {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </p>
                    <div className="flex gap-2">
                        <Button onClick={handleBookmark} variant="outline" className="rounded-full p-2" size="icon">
                            <Bookmark color={savedJobs.some(savedJob => savedJob._id === job._id) ? 'blue' : 'gray'} />
                        </Button>
                        <Button 
                            onClick={handleReport} 
                            variant="outline" 
                            className={`rounded-full p-2 ${isReported ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`} 
                            size="icon"
                        >
                            <AlertTriangle color={isReported ? 'white' : 'gray'} />
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
                        <h1 className='font-bold text-[#7c4cce] text-lg whitespace-nowrap overflow-ellipsis'>{job?.company?.name}</h1>
                        <p className='text-sm text-gray-500'>India</p>
                    </div>
                </div>

                <div>
                    <h1 className='font-medium text-lg my-2 overflow-hidden overflow-ellipsis line-clamp-2'>{job?.title}</h1>
                    <p className='text-sm text-[#6A38C2] line-clamp-3'>{job?.description}</p>
                </div>

                <div className='flex flex-wrap gap-2 mt-4'>
                    <Badge className='text-[#6A38C2] font-bold text-sm' variant="ghost">
                        {job?.position} Positions
                    </Badge>
                    
                    <Badge className='text-[#6A38C2] font-bold text-sm' variant="ghost">
                        {job?.location} location
                    </Badge>
                    <Badge className='text-[#7c4cce] font-bold text-sm' variant="ghost">
                        {job?.jobType}
                    </Badge>
                    <Badge className='text-[#6A38C2] font-bold text-sm' variant="ghost">
                        {job?.salary}
                    </Badge>
                    <Badge className='text-[#6A38C2] font-bold text-sm' variant="ghost">
                        {job?.experienceLevel} EXP
                    </Badge>
                </div>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="flex-1">
                    Details
                </Button>
                <Button className="bg-[#7209b7] text-white flex-1">
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
                    <div className="bg-white p-5 rounded shadow-lg">
                        <p className="text-lg">You have reported this company as fake.</p>
                        <button onClick={() => setShowReportPopup(false)} className="mt-4 text-red-500 underline">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Job;
