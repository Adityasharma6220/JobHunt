import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const CompanyDetails = () => {
    const { id } = useParams(); 
    const [company, setCompany] = useState(null);

    useEffect(() => {
        // Fetch the company details using the ID
        const fetchCompany = async () => {
            try {
                const response = await fetch(`/api/company/${id}`); 
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data); // Log the data to check its structure
                setCompany(data);
            } catch (error) {
                console.error("Error fetching company details:", error);
            }
        };

        fetchCompany();
    }, [id]);

    // Handle loading and empty company state
    if (!company || Object.keys(company).length === 0) {
        return <div>Loading company details...</div>;
    }

    return (
        <div className='max-w-6xl mx-auto p-8 bg-white'>
            <div className='flex justify-between items-center'>
               
                <div className='flex items-center gap-4'>
                    <img src={company.logo} alt={company.name} className='w-16 h-16' />
                    <div>
                        <h1 className='text-3xl font-bold'>{company.name}</h1>
                        <div className='flex items-center gap-2 mt-1'>
                            <Badge>{company.industry}</Badge>
                            <Badge>{company.type}</Badge>
                            <Badge>{company.location}</Badge>
                        </div>
                    </div>
                </div>
                {/* Follow Button */}
                <Button className='bg-blue-600 text-white'>+ Follow</Button>
            </div>

            {/* Company Rating and Reviews */}
            <div className='mt-6 flex justify-between'>
                <div className='text-lg'>
                    <span className='font-semibold'>Rating:</span>
                    <span className='ml-2'>{company.rating} ★</span>
                    <span className='text-gray-500 ml-2'>({company.reviewsCount} reviews)</span>
                </div>
                <div>
                    <p>Write a review & help millions!</p>
                    <Button variant="outline">Write Review</Button>
                </div>
            </div>

            {/* Jobs Section */}
            <div className='mt-10'>
                <h2 className='text-2xl font-bold'>Jobs</h2>
                {company.jobs.length === 0 ? (
                    <div className='flex items-center justify-center my-4'>
                        <p>No jobs available right now.</p>
                    </div>
                ) : (
                    <div>
                        {company.jobs.map((job) => (
                            <div key={job.id} className='border-t py-4'>
                                <h3 className='text-lg font-semibold'>{job.title}</h3>
                                <p>{job.description}</p>
                            </div>
                        ))}
                    </div>
                )}
                <Button variant="outline" className='mt-4'>Create Job Alert</Button>
            </div>

            {/* Reviews by Job Profile Section */}
            <div className='mt-10'>
                <h2 className='text-2xl font-bold'>Reviews by Job Profile</h2>
                <div className='grid grid-cols-2 gap-4 mt-4'>
                    {company.reviewsByJob.map((review) => (
                        <div key={review.jobTitle} className='flex justify-between'>
                            <p>{review.jobTitle}</p>
                            <span>{review.rating} ★</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interview Questions Section */}
            <div className='mt-10'>
                <h2 className='text-2xl font-bold'>Interview Questions</h2>
                <div className='flex gap-2 flex-wrap mt-4'>
                    {company.interviewQuestions.map((question, index) => (
                        <Badge key={index} className='bg-gray-200'>{question}</Badge>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyDetails;
