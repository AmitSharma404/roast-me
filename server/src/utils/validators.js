import { ROAST_LEVELS } from './constants.js';

/**
 * Validate roast level
 * @param {string} level - Level to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateRoastLevel = (level) => {
  const validLevels = ROAST_LEVELS.map(l => l.id);
  if (!validLevels.includes(level)) {
    return `Invalid roast level. Must be one of: ${validLevels.join(', ')}`;
  }
  return null;
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether URL is valid
 */
export const isValidUrl = (url) => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

/**
 * Validate GitHub username format
 * @param {string} username - Username to validate
 * @returns {boolean} - Whether username is valid
 */
export const isValidGitHubUsername = (username) => {
  const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  return usernameRegex.test(username);
};
