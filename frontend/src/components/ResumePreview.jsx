import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './shared/Navbar';
import { toast } from 'sonner';

const ResumePreview = () => {
    const location = useLocation();
    const { generatedResume } = location.state || {};
    const [loading, setLoading] = useState(true);
    const [iframeUrl, setIframeUrl] = useState(null);
    const iframeRef = useRef(null);

    useEffect(() => {
        if (!generatedResume) {
            toast.error("No resume data available.");
            setLoading(false);
            return;
        }

        // Check if generatedResume is a valid string
        if (typeof generatedResume === 'string' && generatedResume.trim() !== '') {
            setLoading(false);
            const blob = new Blob([generatedResume], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            setIframeUrl(url);

            // Clean up the Blob URL when the component unmounts or when generatedResume changes
            return () => {
                URL.revokeObjectURL(url);
            };
        } else {
            toast.error("Generated resume is not in the expected format.");
            setLoading(false);
        }
    }, [generatedResume]);

    useEffect(() => {
        if (iframeRef.current && iframeUrl) {
            iframeRef.current.src = iframeUrl;
        }
    }, [iframeUrl]);

    const handleDownload = () => {
        if (!generatedResume) {
            toast.error("No resume data available to download.");
            return;
        }

        const blob = new Blob([generatedResume], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.html'; // Name of the file to be downloaded
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up the URL
        toast.success("Resume downloaded successfully!");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Make the Navbar sticky */}
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>

            <div className="flex-grow bg-gray-50 flex flex-col items-center justify-center py-10">
                <div className="bg-white p-10 shadow-2xl rounded-lg w-full max-w-4xl border-2 border-gray-300 relative z-10">
                    <h3 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Generated Resume</h3>
                    <div className="p-6 bg-gray-100 rounded-lg border border-gray-200 max-w-3xl mx-auto text-left text-gray-700 overflow-hidden">
                        {iframeUrl ? (
                            <iframe
                                ref={iframeRef}
                                title="Resume"
                                style={{ width: '100%', height: '80vh', border: 'none' }} // Set iframe height dynamically
                            />
                        ) : (
                            <p className="text-center text-gray-500">No resume data available.</p>
                        )}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button 
                            onClick={handleDownload} 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Download Resume
                        </button>
                    </div>
                    <div className="absolute bottom-4 right-4 text-sm text-gray-500">
                        *Generated using AI Resume Builder
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;
