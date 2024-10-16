import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const generateResumeText = async (user) => {
  const { firstname, lastname, skills = [], bio = "No bio available", education = [], experience = [] } = user;

  const skillsList = skills.length > 0 ? skills.join(', ') : "No skills listed";
  const educationList = education.length > 0 ? education.join('; ') : "No education listed";
  const experienceList = experience.length > 0 ? experience.join('; ') : "No experience listed";

  const prompt = `
    Create a resume for the following user profile:
    Name: ${firstname} ${lastname}
    Skills: ${skillsList}
    Bio: ${bio}
    Education: ${educationList}
    Experience: ${experienceList}

    Format it properly with sections like 'Summary', 'Skills', 'Experience', 'Education', etc.
  `;

  const apiKey = process.env.OPENAI_API_KEY;

  const config = {
    url: 'https://api.openai.com/v1/chat/completions',
    method: 'post',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    data: {
      model: "gpt-3.5-turbo-0125",
      prompt: prompt,
      max_tokens: 500,
      n: 1,
      stop: null,
      temperature: 0.7
    }
  };

  const MAX_RETRIES = 5;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await axios(config);
      return response.data.choices[0].text.trim();
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.warn(`Rate limit exceeded. Attempt ${attempt + 1} of ${MAX_RETRIES}. Retrying in ${2 ** attempt} seconds...`);
        await delay(2 ** attempt * 1000); // Exponential backoff
      } else {
        console.error("Error generating resume:", error);
        throw new Error("Could not generate resume text.");
      }
    }
  }

  throw new Error("Max retries reached. Could not generate resume text.");
};
