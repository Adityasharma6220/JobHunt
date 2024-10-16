import React from 'react';
import { useLocation } from 'react-router-dom';

const ResumePreview = () => {
    const location = useLocation();
    const { generatedResume } = location.state || {};

    if (!generatedResume) {
        return <p>No resume data available.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-10 shadow-xl rounded-lg w-full max-w-4xl border-2 border-gray-300" style={{ height: '11in', width: '8.5in' }}>
                <h2 className="text-3xl font-bold mb-4 text-center">Resume</h2>
                <div className="space-y-4">
                    <p><strong>First Name:</strong> {generatedResume.firstname}</p>
                    <p><strong>Last Name:</strong> {generatedResume.lastname}</p>
                    <p><strong>Skills:</strong> {generatedResume.profile.skills.join(', ') || "No skills provided"}</p>
                    <p><strong>Bio:</strong> {generatedResume.profile.bio || "No bio provided"}</p>
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;
