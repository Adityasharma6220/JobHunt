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


    
  const resumeText ="<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Resume - Jyotiraditya K Sharma</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            margin: 0;\n            padding: 0;\n            background-color: #f4f4f4;\n            color: #333;\n            font-size: 14px;\n        }\n        .container {\n            width: 85%;\n            margin: 20px auto;\n            background-color: #fff;\n            padding: 20px;\n            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n        }\n        header {\n            text-align: center;\n            margin-bottom: 15px;\n        }\n        header h1 {\n            margin: 0;\n            font-size: 1.8em;\n            color: #2c3e50;\n        }\n        header p {\n            font-size: 1em;\n            color: #7f8c8d;\n        }\n        h2 {\n            font-size: 1.2em;\n            color: #2980b9;\n            border-bottom: 1px solid #2980b9;\n            padding-bottom: 3px;\n            margin-bottom: 10px;\n        }\n        ul {\n            list-style-type: none;\n            padding: 0;\n            margin: 0;\n        }\n        ul li {\n            margin-bottom: 5px;\n        }\n        .skills ul {\n            display: flex;\n            flex-wrap: wrap;\n        }\n        .skills li {\n            background-color: #ecf0f1;\n            padding: 5px 10px;\n            margin-right: 8px;\n            margin-bottom: 8px;\n            border-radius: 3px;\n        }\n        .contact-info, .summary, .skills, .experience, .education {\n            margin-bottom: 15px;\n        }\n        .experience li, .education li {\n            line-height: 1.4;\n        }\n        @media (max-width: 768px) {\n            .container {\n                width: 95%;\n            }\n        }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <header>\n            <h1>Jyotiraditya K Sharma</h1>\n            <p>Web Developer | Salesforce Enthusiast</p>\n        </header>\n\n        <section class=\"contact-info\">\n            <h2>Contact Information</h2>\n            <p><strong>Phone:</strong> 08869847016</p>\n            <p><strong>Email:</strong> <a href=\"mailto:adityasharma6220@gmail.com\">adityasharma6220@gmail.com</a></p>\n        </section>\n\n        <section class=\"summary\">\n            <h2>Summary</h2>\n            <p>Highly skilled web developer with expertise in HTML, CSS, Java, Salesforce, and JavaScript (JS). Passionate about creating responsive and visually appealing web solutions.</p>\n        </section>\n\n        <section class=\"skills\">\n            <h2>Skills</h2>\n            <ul>\n                <li>HTML</li>\n                <li>CSS</li>\n                <li>Java</li>\n                <li>Salesforce</li>\n                <li>JavaScript (JS)</li>\n            </ul>\n        </section>\n\n        <section class=\"experience\">\n            <h2>Experience</h2>\n            <ul>\n                <li>\n                    <strong>Web Developer</strong> | ABC Company (Jan 2020 - Present)<br>\n                    - Led the development of innovative web applications.<br>\n                    - Implemented cutting-edge technologies for enhanced user experience.<br>\n                    - Collaborated with cross-functional teams to achieve project goals.\n                </li>\n            </ul>\n        </section>\n\n        <section class=\"education\">\n            <h2>Education</h2>\n            <ul>\n                <li>\n                    <strong>Bachelor of Technology in Computer Science</strong><br>\n                    XYZ University, Graduated in 2018.\n                </li>\n            </ul>\n        </section>\n    </div>\n</body>\n</html>"
 
 

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