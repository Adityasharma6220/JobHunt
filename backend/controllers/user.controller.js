import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { generateResumeText } from '../utils/generateResumeText .js'; 
export const register = async (req, res) => {
  try {
    const { firstname ,lastname,email, phoneNumber, password, role } = req.body;

    if (!firstname|| !lastname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        firstname,
        lastname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
        secure: true
      })
      .json({
        message: `Welcome back ${user.firstname}`,
        user,
        success: true,
      });

    // return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
    //     message: `Welcome back ${user.fullname}`,
    //     user,
    //     success: true
    // })
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token","", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { firstname,lastname,email, phoneNumber, bio, skills,resumeUrl } = req.body;

    // const file = req.file;
    // // cloudinary ayega idhar
    // const fileUri = getDataUri(file);
    // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    // updating data
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    if (resumeUrl) {
        user.profile.resume = resumeUrl; 
        user.profile.resumeOriginalName = "Uploaded Resume"; 
      }
    // resume comes later here...
    // if (cloudResponse) {
    //   user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
    //   user.profile.resumeOriginalName = file.originalname; // Save the original file name
    // }

    await user.save();

    user = {
      _id: user._id,
      firstname: user.firstname,
      lastname:user.lastname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// const resumeText = await generateResumeText({ firstname, lastname, skills, bio });

// In user.controller.js
export const generateResume = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { firstname, lastname, contact, profile, education, experience } = req.body;
    const { skills, bio } = profile || {};

    // Validate the input
    if (!profile || !Array.isArray(skills) || !skills.length) {
      return res.status(400).json({ success: false, message: 'Profile with skills (array) and bio are required' });
    }

    if (!contact || !contact.phone || !contact.email) {
      return res.status(400).json({ success: false, message: 'Complete contact information (phone, email) is required' });
    }
    const validatedEducation = Array.isArray(education) ? education : [];
    const validatedExperience = Array.isArray(experience) ? experience : [];

    // Create resume text dynamically
// const resumeText = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Resume - Ayush Mahariye</title>
//         <style>
//             body {
//                 font-family: Arial, sans-serif;
//                 margin: 0;
//                 padding: 0;
//                 background-color: #f4f4f4;
//                 color: #333;
//                 font-size: 14px;
//             }
//             .container {
//                 width: 85%;
//                 margin: 20px auto;
//                 background-color: #fff;
//                 padding: 20px;
//                 box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//             }
//             header {
//                 text-align: center;
//                 margin-bottom: 15px;
//             }
//             header h1 {
//                 margin: 0;
//                 font-size: 1.8em;
//                 color: #2c3e50;
//             }
//             header p {
//                 font-size: 1em;
//                 color: #7f8c8d;
//             }
//             h2 {
//                 font-size: 1.2em;
//                 color: #2980b9;
//                 border-bottom: 1px solid #2980b9;
//                 padding-bottom: 3px;
//                 margin-bottom: 10px;
//             }
//             ul {
//                 list-style-type: none;
//                 padding: 0;
//                 margin: 0;
//             }
//             ul li {
//                 margin-bottom: 5px;
//             }
//             .skills ul {
//                 display: flex;
//                 flex-wrap: wrap;
//             }
//             .skills li {
//                 background-color: #ecf0f1;
//                 padding: 5px 10px;
//                 margin-right: 8px;
//                 margin-bottom: 8px;
//                 border-radius: 3px;
//             }
//             .contact-info, .summary, .skills, .experience, .education {
//                 margin-bottom: 15px;
//             }
//             .experience li, .education li {
//                 line-height: 1.4;
//             }
//             @media (max-width: 768px) {
//                 .container {
//                     width: 95%;
//                 }
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <header>
//                 <h1>${firstname} ${lastname}</h1>
//                 <p>Data Scientist</p>
//             </header>

//             <section class="contact-info">
//                 <h2>Contact Information</h2>
//                 <p><strong>Phone:</strong> ${contact.phone}</p>
//                 <p><strong>Email:</strong> ${contact.email}</p>
//                 <p><strong>LinkedIn:</strong> ${contact.linkedin || 'undefined'}</p>
//                 <p><strong>GitHub:</strong> ${contact.github || 'undefined'}</p>
//             </section>

//             <section class="summary">
//                 <h2>Summary</h2>
//                 <p>${bio}</p>
//             </section>

//             <section class="skills">
//                 <h2>Skills</h2>
//                 <ul>
//                     ${skills.map(skill => `<li>${skill}</li>`).join('')}
//                 </ul>
//             </section>

//             <section class="experience">
//                 <h2>Experience</h2>
//                 <ul>
//                     ${experience.map(exp => `
//                     <li>
//                         <strong>${exp.role}</strong> | ${exp.company} (${exp.duration})
//                         <br> - ${exp.description}
//                     </li>
//                     `).join('')}
//                 </ul>
//             </section>

//             <section class="education">
//                 <h2>Education</h2>
//                 <ul>
//                     ${education.map(edu => `
//                     <li>
//                         <strong>${edu.degree}</strong>
//                         <br> ${edu.institution} (${edu.year})
//                     </li>
//                     `).join('')}
//                 </ul>
//             </section>
//         </div>
//     </body>
//     </html>
// `;
const resumeText = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume - ${firstname} ${lastname}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
                font-size: 14px;
            }
            .container {
                width: 85%;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            header {
                text-align: center;
                margin-bottom: 15px;
            }
            header h1 {
                margin: 0;
                font-size: 1.8em;
                color: #2c3e50;
            }
            header p {
                font-size: 1em;
                color: #7f8c8d;
            }
            h2 {
                font-size: 1.2em;
                color: #2980b9;
                border-bottom: 1px solid #2980b9;
                padding-bottom: 3px;
                margin-bottom: 10px;
            }
            ul {
                list-style-type: none;
                padding: 0;
                margin: 0;
            }
            ul li {
                margin-bottom: 5px;
            }
            .skills ul {
                display: flex;
                flex-wrap: wrap;
            }
            .skills li {
                background-color: #ecf0f1;
                padding: 5px 10px;
                margin-right: 8px;
                margin-bottom: 8px;
                border-radius: 3px;
            }
            .contact-info, .summary, .skills, .experience, .education {
                margin-bottom: 15px;
            }
            .experience li, .education li {
                line-height: 1.4;
            }
            @media (max-width: 768px) {
                .container {
                    width: 95%;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <header>
                <h1>${firstname} ${lastname}</h1>
                <p>Highly motivated Developer</p>
            </header>

            <section class="contact-info">
                <h2>Contact Information</h2>
                <p><strong>Phone:</strong> ${contact.phone}</p>
                <p><strong>Email:</strong> ${contact.email}</p>
            </section>

            <section class="summary">
                <h2>Summary</h2>
                <p>${bio}</p>
            </section>

            <section class="skills">
                <h2>Skills</h2>
                <ul>
                    ${skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </section>

            <section class="experience">
                <h2>Experience</h2>
                <ul>
                    ${experience.map(exp => `
                    <li>
                        <strong>${exp.role}</strong> | ${exp.company} (${exp.duration})
                        <br> - ${exp.description}
                    </li>
                    `).join('')}
                </ul>
            </section>

            <section class="education">
                <h2>Education</h2>
                <ul>
                    ${education.map(edu => `
                    <li>
                        <strong>${edu.degree}</strong>
                        <br> ${edu.institution} (${edu.year})
                    </li>
                    `).join('')}
                </ul>
            </section>
        </div>
    </body>
    </html>
`;


    //   const resumeText = await generateResumeText({
    //   firstname,
    //   lastname,
    //   contact,   
    //   skills,
    //   bio,
    //   education : validatedEducation,
    //   experience : validatedExperience
    // });
    // Send response
    return res.json({ success: true, resume: resumeText });
  } catch (error) {
    console.error('Error generating resume:', error);
    return res.status(500).json({ success: false, message: 'Resume generation failed' });
  }
};






export const uploadResume = async (req, res) => {
    try {
        const file = req.file; // The uploaded file
        // Logic to handle the uploaded resume (e.g., saving to a database, etc.)
        return res.json({ success: true, message: 'Resume uploaded successfully', file });
    } catch (error) {
        console.error('Error uploading resume:', error);
        return res.status(500).json({ success: false, message: 'Resume upload failed' });
    }
};
  

 // const resumeText = "Resume\n\nName: Aditya Sharma\n\nSummary:\nExperienced developer with strong skills in HTML, CSS, Java, Salesforce, and JavaScript. Adept at creating dynamic and visually appealing web applications.\n\nSkills:\n- HTML\n- CSS\n- Java\n- Salesforce\n- JavaScript\n\nExperience:\nNo experience listed\n\nEducation:\nNo education listed\n\nAdditional information:\n- Portfolio: [insert portfolio link]\n- LinkedIn: [insert LinkedIn profile link]\n- GitHub: [insert GitHub profile link]\n\nContact information:\nEmail: adityasharma@example.com\nPhone: (123) 456-7890\nLocation: City, State\n\n(Note: Add detailed information on experience and education if available)";