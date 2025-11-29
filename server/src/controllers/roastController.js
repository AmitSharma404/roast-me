import { generateRoast } from '../services/openaiService.js';
import { parseResume } from '../services/resumeParser.js';
import { fetchGitHubProfile } from '../services/githubService.js';
import { analyzePortfolio } from '../services/portfolioService.js';
import { ROAST_LEVELS } from '../utils/constants.js';
import { validateRoastLevel } from '../utils/validators.js';
import fs from 'fs/promises';

/**
 * Get available roast levels
 */
export const getRoastLevels = (req, res) => {
  res.json({
    success: true,
    levels: ROAST_LEVELS
  });
};

/**
 * Roast a resume
 */
export const roastResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No resume file uploaded'
      });
    }

    const { level = 'spicy' } = req.body;
    const levelError = validateRoastLevel(level);
    if (levelError) {
      return res.status(400).json({ success: false, error: levelError });
    }

    // Parse the resume
    const resumeContent = await parseResume(req.file.path);

    // Generate roast using OpenAI
    const roast = await generateRoast('resume', resumeContent, level);

    // Clean up uploaded file
    await fs.unlink(req.file.path).catch(() => {});

    res.json({
      success: true,
      type: 'resume',
      level: level,
      roast: roast
    });
  } catch (error) {
    // Clean up uploaded file on error
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    next(error);
  }
};

/**
 * Roast a GitHub profile
 */
export const roastGitHub = async (req, res, next) => {
  try {
    const { username, level = 'spicy' } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        error: 'GitHub username is required'
      });
    }

    const levelError = validateRoastLevel(level);
    if (levelError) {
      return res.status(400).json({ success: false, error: levelError });
    }

    // Fetch GitHub profile data
    const profileData = await fetchGitHubProfile(username);

    // Generate roast using OpenAI
    const roast = await generateRoast('github', profileData, level);

    res.json({
      success: true,
      type: 'github',
      username: username,
      level: level,
      roast: roast,
      profileSummary: {
        publicRepos: profileData.public_repos,
        followers: profileData.followers,
        following: profileData.following,
        createdAt: profileData.created_at
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Roast a portfolio website
 */
export const roastPortfolio = async (req, res, next) => {
  try {
    const { url, level = 'spicy' } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'Portfolio URL is required'
      });
    }

    const levelError = validateRoastLevel(level);
    if (levelError) {
      return res.status(400).json({ success: false, error: levelError });
    }

    // Analyze portfolio website
    const portfolioData = await analyzePortfolio(url);

    // Generate roast using OpenAI
    const roast = await generateRoast('portfolio', portfolioData, level);

    res.json({
      success: true,
      type: 'portfolio',
      url: url,
      level: level,
      roast: roast
    });
  } catch (error) {
    next(error);
  }
};
