// import { Job } from "../models/job.model.js";

// // admin post krega job
// export const postJob = async (req, res) => {
//     try {
//         const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
//         const userId = req.id;

//         if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
//             return res.status(400).json({
//                 message: "Somethin is missing.",
//                 success: false
//             })
//         };
//         const job = await Job.create({
//             title,
//             description,
//             requirements: requirements.split(","),
//             salary: Number(salary),
//             location,
//             jobType,
//             experienceLevel: experience,
//             position,
//             company: companyId,
//             created_by: userId
//         });
//         return res.status(201).json({
//             message: "New job created successfully.",
//             job,
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
// // student k liye
// export const getAllJobs = async (req, res) => {
//     try {
//         const keyword = req.query.keyword || "";
//         const query = {
//             $or: [
//                 { title: { $regex: keyword, $options: "i" } },
//                 { description: { $regex: keyword, $options: "i" } },
//             ]
//         };
//         const jobs = await Job.find(query).populate({
//             path: "company"
//         }).sort({ createdAt: -1 });
//         if (!jobs) {
//             return res.status(404).json({
//                 message: "Jobs not found.",
//                 success: false
//             })
//         };
//         return res.status(200).json({
//             jobs,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// // student
// export const getJobById = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         const job = await Job.findById(jobId).populate({
//             path:"applications"
//         });
//         if (!job) {
//             return res.status(404).json({
//                 message: "Jobs not found.",
//                 success: false
//             })
//         };
//         return res.status(200).json({ job, success: true });
//     } catch (error) {
//         console.log(error);
//     }
// }
// // admin kitne job create kra hai abhi tk
// export const getAdminJobs = async (req, res) => {
//     try {
//         const adminId = req.id;
//         const jobs = await Job.find({ created_by: adminId }).populate({
//             path:'company',
//             createdAt:-1
//         });
//         if (!jobs) {
//             return res.status(404).json({
//                 message: "Jobs not found.",
//                 success: false
//             })
//         };
//         return res.status(200).json({
//             jobs,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

import { Job } from "../models/job.model.js";

// Function to handle sending responses
const sendResponse = (res, status, message, data = {}) => {
    return res.status(status).json({ message, success: status < 400, ...data });
};

// Admin: Post a new job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        // Validation check
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return sendResponse(res, 400, "Something is missing.");
        }

        // Ensure salary is a number
        const parsedSalary = parseFloat(salary); // Use parseFloat to handle string inputs
        if (isNaN(parsedSalary)) {
            return sendResponse(res, 400, "Salary must be a valid number.");
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: parsedSalary, // Save the parsed salary
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return sendResponse(res, 201, "New job created successfully.", { job });
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, "Internal server error.");
    }
};


// Student: Get all jobs
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 });

        return sendResponse(res, 200, "Jobs retrieved successfully.", { jobs });
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, "Internal server error.");
    }
};

// Student: Get a job by ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({ path: "applications" });

        if (!job) {
            return sendResponse(res, 404, "Job not found.");
        }

        return sendResponse(res, 200, "Job retrieved successfully.", { job });
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, "Internal server error.");
    }
};

// Admin: Get jobs created by admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({ path: 'company' }).sort({ createdAt: -1 });

        if (!jobs.length) { // Changed to check if jobs is an empty array
            return sendResponse(res, 404, "No jobs found.");
        }

        return sendResponse(res, 200, "Jobs retrieved successfully.", { jobs });
    } catch (error) {
        console.error(error);
        return sendResponse(res, 500, "Internal server error.");
    }
};
