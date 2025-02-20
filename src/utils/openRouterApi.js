import axios from 'axios';

const OPENROUTER_API_KEY = 'YOUR_OPENROUTER_API_KEY'; // Replace with your actual API key
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function generateCMMN(scenario) {
  const systemPrompt = `You are an expert in Case Management Model and Notation (CMMN) and banking processes. Your task is to generate a CMMN XML representation for the following banking scenario: "${scenario}". 
  Provide a detailed CMMN XML that includes appropriate case file items, human tasks, process tasks, and milestones. Ensure the XML is valid and follows CMMN 1.1 specifications.`;

  const userPrompt = `Generate a CMMN XML for the "${scenario}" banking scenario. Include relevant case elements, tasks, and milestones.`;

  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'anthropic/claude-2-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating CMMN:', error);
    throw error;
  }
}
