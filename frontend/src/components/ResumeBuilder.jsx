import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';

const ResumeBuilder = () => {
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        contact: {
            phone: "",
            email: "",
        },
        profile: {
            skills: [],
            bio: "",
        },
        education: [
            { degree: "", institution: "", year: "" }
        ],
        experience: [
            { role: "", company: "", duration: "" }
        ],
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "skills") {
           
            // const skillsArray = value.split(/[\s,]+/).map(skill => skill.trim()).filter(skill => skill !== '');

            setInput(prevInput => ({
                ...prevInput,
                profile: {
                    ...prevInput.profile,
                    skills: value
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
        } else if (name === "phone" || name === "email") {
            setInput(prevInput => ({
                ...prevInput,
                contact: {
                    ...prevInput.contact,
                    [name]: value
                }
            }));
        } else {
            setInput(prevInput => ({
                ...prevInput,
                [name]: value
            }));
        }
    };

    const handleNestedChange = (e, index, field, section) => {
        const { value } = e.target;
        setInput(prevInput => {
            const updatedSection = [...prevInput[section]];
            updatedSection[index][field] = value;
            return {
                ...prevInput,
                [section]: updatedSection
            };
        });
    };

    const addField = (section) => {
        const newField = section === "education"
            ? { degree: "", institution: "", year: "" }
            : { role: "", company: "", duration: "" };

        setInput(prevInput => ({
            ...prevInput,
            [section]: [...prevInput[section], newField]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!input.firstname || !input.lastname || !input.contact.email) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${USER_API_END_POINT}/generate-resume`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success("Resume generated successfully!");
                navigate('/resume-preview', { state: { generatedResume: res.data.resume } });
            }
        } catch (error) {
            console.error("Error generating resume:", error);
            toast.error("Failed to generate resume");
        } finally {
            setLoading(false);
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
                        required = "true"
                        placeholder="First Name"
                        value={input.firstname}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="lastname"
                        required = "true"
                        placeholder="Last Name"
                        value={input.lastname}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Contact Section */}
                    <h3 className="text-xl font-semibold text-gray-700">Contact Information</h3>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={input.contact.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        required = "true"
                        placeholder="Email Address"
                        value={input.contact.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Skills and Bio */}
                    <input
                        type="text"
                        name="skills"
                        placeholder="Skills (comma or space-separated)"
                        value={input.profile.skills}
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

                    {/* Education Section */}
                    <h3 className="text-xl font-semibold text-gray-700">Education</h3>
                    {input.education.map((edu, index) => (
                        <div key={index} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Degree"
                                required = "true"
                                value={edu.degree}
                                onChange={(e) => handleNestedChange(e, index, 'degree', 'education')}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            <input
                                type="text"
                                placeholder="Institution"
                                required = "true"
                                value={edu.institution}
                                onChange={(e) => handleNestedChange(e, index, 'institution', 'education')}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            <input
                                type="text"
                                placeholder="Year"
                                value={edu.year}
                                onChange={(e) => handleNestedChange(e, index, 'year', 'education')}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    ))}
                    {input.education.length > 0 && (
                        <button
                            type="button"
                            onClick={() => addField("education")}
                            className="text-blue-500 hover:text-blue-600 underline"
                        >
                            Add more education
                        </button>
                    )}

                    {/* Experience Section */}
                    <h3 className="text-xl font-semibold text-gray-700">Experience</h3>
                    {input.experience.map((exp, index) => (
                        <div key={index} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Role"
                                value={exp.role}
                                onChange={(e) => handleNestedChange(e, index, 'role', 'experience')}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            <input
                                type="text"
                                placeholder="Company"
                               
                                value={exp.company}
                                onChange={(e) => handleNestedChange(e, index, 'company', 'experience')}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            <input
                                type="text"
                                placeholder="Duration"
                                value={exp.duration}
                                onChange={(e) => handleNestedChange(e, index, 'duration', 'experience')}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    ))}
                    {input.experience.length > 0 && (
                        <button
                            type="button"
                            onClick={() => addField("experience")}
                            className="text-blue-500 hover:text-blue-600 underline"
                        >
                            Add more experience
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-500 text-white py-3 rounded-lg font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 transition duration-300'}`}
                    >
                        {loading ? 'Generating...' : 'Generate Resume'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResumeBuilder;
