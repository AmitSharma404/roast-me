import OpenAI from 'openai';
import { ROAST_LEVELS, ROAST_PROMPTS } from '../utils/constants.js';

// Initialize OpenAI client only if API key is available
let openai = null;
const apiKey = process.env.OPENAI_API_KEY;
if (apiKey && apiKey !== 'your_openai_api_key_here') {
  openai = new OpenAI({ apiKey });
}

/**
 * Generate a roast using OpenAI
 * @param {string} type - Type of content to roast (resume, github, portfolio)
 * @param {string|object} content - Content to analyze
 * @param {string} level - Roast intensity level (mild, spicy, extra-burn)
 * @returns {Promise<object>} - Generated roast with feedback
 */
export const generateRoast = async (type, content, level = 'spicy') => {
  const levelConfig = ROAST_LEVELS.find(l => l.id === level) || ROAST_LEVELS[1];
  const typePrompt = ROAST_PROMPTS[type];

  if (!typePrompt) {
    throw new Error(`Invalid roast type: ${type}`);
  }

  const contentString = typeof content === 'object' ? JSON.stringify(content, null, 2) : content;

  const systemPrompt = `You are a brutally honest but helpful AI that roasts professional materials.
Your roast intensity level is: ${levelConfig.name} (${levelConfig.description})

Guidelines for ${levelConfig.name} level:
${levelConfig.guidelines}

IMPORTANT: While being funny and witty, always include actionable feedback that helps the person improve.
Format your response as JSON with the following structure:
{
  "roast": "Your main roast/critique (2-3 sentences, funny and memorable)",
  "burns": ["array of 3-5 specific roast points"],
  "constructive": ["array of 3-5 actionable improvement suggestions"],
  "score": number between 1-10 rating the quality,
  "summary": "A brief one-line summary of the overall assessment"
}`;

  const userPrompt = `${typePrompt}

Here's the content to roast:
${contentString}

Generate a ${levelConfig.name.toLowerCase()} roast that is both entertaining and helpful.`;

  // If OpenAI API is not configured, return a mock response
  if (!openai) {
    return getMockRoast(type, level);
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: levelConfig.temperature,
      max_tokens: 1000,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content);
    result.intensity = levelConfig.name;
    return result;
  } catch (error) {
    // If OpenAI API fails, return a mock response with error info
    console.error('OpenAI API error:', error.message);
    return getMockRoast(type, level);
  }
};

/**
 * Generate a mock roast when OpenAI is not available
 */
const getMockRoast = (type, level) => {
  const mockRoasts = {
    resume: {
      roast: "Your resume looks like it was formatted by someone who thinks Comic Sans is a professional font choice. The skills section is longer than your actual work experience - we see what you're doing there.",
      burns: [
        "Your 'proficient in Microsoft Word' made us laugh out loud",
        "That objective statement sounds like it was written by a motivational poster factory",
        "We've seen better formatting on a ransom note",
        "Your hobbies section suggests you have more free time than actual skills"
      ],
      constructive: [
        "Focus on quantifiable achievements rather than responsibilities",
        "Remove outdated skills that are now expected (like 'email')",
        "Use a clean, modern template - first impressions matter",
        "Tailor your resume to each specific job application",
        "Add metrics and numbers to demonstrate impact"
      ],
      score: 5,
      summary: "Needs work, but we've all been there. Start with the basics."
    },
    github: {
      roast: "Your contribution graph looks like a barcode for a discontinued product. The commit messages suggest you've mastered the art of 'fixed stuff' and 'asdf'.",
      burns: [
        "Your most popular repo has 0 stars - even you haven't starred it",
        "The README files are basically just the default 'Hi there 👋'",
        "Your commit history suggests you code exclusively during existential crises",
        "Half your repos are incomplete tutorials you'll 'finish later'"
      ],
      constructive: [
        "Write meaningful commit messages that explain the 'why'",
        "Create detailed README files with installation instructions",
        "Contribute to open source projects to build visibility",
        "Complete your profile with a bio and profile picture",
        "Pin your best repositories to showcase your work"
      ],
      score: 4,
      summary: "Your GitHub needs some TLC - start by finishing those abandoned projects."
    },
    portfolio: {
      roast: "Your portfolio loads slower than your career progression. The design choices suggest you thought 'more is more' - it's not.",
      burns: [
        "The spinning logo animation was cool... in 1999",
        "Your 'About Me' section is longer than your project descriptions",
        "The color scheme looks like a highlighter threw up on the page",
        "Mobile responsiveness is a myth according to your site"
      ],
      constructive: [
        "Optimize images and assets for faster loading",
        "Focus on showcasing 3-5 best projects rather than everything",
        "Ensure the site is fully responsive on all devices",
        "Add case studies that explain your process and impact",
        "Include clear calls-to-action and contact information"
      ],
      score: 5,
      summary: "Less flash, more substance - quality over quantity."
    }
  };

  const levelConfig = ROAST_LEVELS.find(l => l.id === level) || ROAST_LEVELS[1];
  const mock = mockRoasts[type] || mockRoasts.resume;
  
  return {
    ...mock,
    intensity: levelConfig.name,
    note: "This is a demo response. Configure OPENAI_API_KEY for real AI-powered roasts."
  };
};
