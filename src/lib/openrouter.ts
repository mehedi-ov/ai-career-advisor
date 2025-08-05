import axios from 'axios';
// Correct line
import type { AIResponse } from '../types';

export const getAiSuggestions = async (
  skills: string,
  interests: string,
  goals: string
): Promise<AIResponse> => {
  const prompt = `
    Act as an expert career advisor. Based on the following user profile, provide career advice.
    User's Current Skills: ${skills}
    User's Interests: ${interests}
    User's Career Goals: ${goals}

    Provide your response in a structured JSON format ONLY. Do not include any text outside the JSON object.
    The JSON object must have these exact keys: "jobRoles", "learningPath", "recommendedCourses".

    Example format:
    {
      "jobRoles": [
        { "title": "Frontend Developer", "description": "Builds user interfaces for websites and web applications." },
        { "title": "UX/UI Designer", "description": "Designs user-friendly and visually appealing digital products." }
      ],
      "learningPath": [
        "Master HTML, CSS, and JavaScript fundamentals.",
        "Learn a modern frontend framework like React or Vue.",
        "Build a portfolio of 3-5 projects.",
        "Study data structures and algorithms.",
        "Practice for technical interviews."
      ],
      "recommendedCourses": [
        { "name": "The Complete Web Developer in 2024 by ZTM", "link": "https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery/" },
        { "name": "Google UX Design Professional Certificate", "link": "https://www.coursera.org/professional-certificates/google-ux-design" }
      ]
    }
  `;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "qwen/qwen3-30b-a3b-instruct-2507",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }, // Enforce JSON output
      },
      {
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        },
      }
    );

    const content = response.data.choices[0].message.content;
    // The API should return valid JSON, so we parse it.
    return JSON.parse(content) as AIResponse;

  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    throw new Error("Failed to get suggestions from AI. Please check your API key and try again.");
  }
};