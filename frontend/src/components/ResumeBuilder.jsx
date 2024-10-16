import React, { useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from './shared/Navbar';

const ResumeBuilder = () => {
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        profile: {
            skills: [],
            bio: ""
        }
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "skills") {
            const skillsArray = value.split(',').map(skill => skill.trim());
            setInput(prevInput => ({
                ...prevInput,
                profile: {
                    ...prevInput.profile,
                    skills: skillsArray
                }
            }));
        } else if (name === "bio") {
            setInput(prevInput => ({
                ...prevInput,
                profile: {
                    ...prevInput.profile,
                    bio: value
                }
            }));
        } else {
            setInput(prevInput => ({
                ...prevInput,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${USER_API_END_POINT}/generate-resume`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success("Resume generated successfully!");
                
                // Navigate to ResumePreview with the generated resume data
                navigate('/resume-preview', { state: { generatedResume: res.data.resume } });
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate resume");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">     
                <h2 className="text-3xl font-bold text-gray-800 mb-6">AI Resume Builder</h2>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg space-y-6"
                >
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={input.firstname}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        value={input.lastname}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="skills"
                        placeholder="Skills (comma-separated)"
                        value={input.profile.skills.join(', ')}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        name="bio"
                        placeholder="Bio"
                        value={input.profile.bio}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                    >
                        Generate Resume
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResumeBuilder;
