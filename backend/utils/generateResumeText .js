import axios from 'axios';

// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const generateResumeText = async (user) => {
  const { firstname, lastname, contact = {
    phone: "No phone number provided",
    email: "No email provided",
  }, skills = "", bio = "No bio available", education = [], experience = [] } = user;

  const skillsList = skills.length > 0 ,
  const educationList = education.length > 0 ? education.map(edu => `${edu.degree} from ${edu.institution} (${edu.year})`).join('; ') : "No education listed";
const experienceList = experience.length > 0 ? experience.map(exp => `${exp.role} at ${exp.company} (${exp.duration})`).join('; ') : "No experience listed";

const prompt =`
Generate a sleek, compact, and responsive HTML5 resume template using the dynamic data provided for each section. Ensure that the design is visually appealing and utilizes modern web practices for responsiveness.

### Resume Structure:
1. **Name**: ${firstname} ${lastname}
2. **Contact Information**: 
   - Phone: ${contact.phone}
   - Email: ${contact.email}
   - LinkedIn: ${contact.linkedin}
   - GitHub: ${contact.github}
   
3. **Summary**: ${bio}
4. **Skills**: 
   - ${skillsList}
5. **Experience**: 
   - ${experienceList}
6. **Education**: 
   - ${educationList}

ADD DETAILS FROM YOUR SIDE USING THE ABOVE DETAILS

### HTML and CSS Formatting:
- Use "<header>" for the user's name and basic details.
- Use "<section>" for each part of the resume (contact info, summary, skills, experience, education, projects).
- For skills, implement a flexbox layout for compact presentation with skill tags.
- For experience and education, use inline formatting to conserve space, listing roles and institutions next to each other.
- Use "<ul>" and "<li>" elements for projects, ensuring clear separation.
- Make sure the resume is fully mobile-responsive, employing media queries for better readability on smaller screens.
- Include minimal, yet elegant CSS styling to enhance visual appeal while keeping it professional.

Use the below given template as a reference

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - Aditya  Sharma</title>
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
            <h1></h1>
            <p></p>
        </header>

        <section class="contact-info">
            <h2>Contact Information</h2>
            <p><strong>Phone:</strong> (+91) your Number</p>
            <p><strong>Email:</strong> mailto:yourmail@.com</p>
        </section>

        <section class="summary">
            <h2>Summary</h2>
            <p>Web developer with expertise in front-end technologies like HTML, CSS, JavaScript, and experience working with Salesforce. Strong focus on performance optimization and responsive design.</p>
        </section>

        <section class="skills">
            <h2>Skills</h2>
            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>Java</li>
                <li>Salesforce</li>
                <li>JavaScript (JS)</li>
                <li>Responsive Design</li>
                <li>Git</li>
                <li>APIs</li>
            </ul>
        </section>

        <section class="experience">
            <h2>Experience</h2>
            <ul>
                <li>
                    <strong>Front-End Developer</strong> | XYZ Solutions (Jan 2021 - Present)<br>
                    - Developed responsive websites, improving load time by 25%.<br>
                    - Integrated RESTful APIs and optimized site performance.<br>
                    - Collaborated with team members and mentored junior developers.
                </li>
            </ul>
        </section>

        <section class="education">
            <h2>Education</h2>
            <ul>
                <li>
                    <strong>Bachelor of Technology in Computer Science</strong><br>
                    FY College of Engineering, 55 (Expected)
                </li>
            </ul>
        </section>
    </div>
</body>
</html>

`;

  const apiKey = process.env.OPENAI_API_KEY;

  const body = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    stream: false
  };
  
  const options = {
    method: "POST",
    headers: { 
      Authorization: "Bearer "+ apiKey, 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(body),
  };

  try{
    const response = await fetch("https://chat.freedomgpt.com/api/v1/chat/completions", options)
   const data = await response.json()
    const content  =data.choices[0].message.content;
  console.log(content);
  return content
  
  }catch (err) {
    console.log(err)
  }
  
  

};
