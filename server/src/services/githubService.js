/**
 * Fetch GitHub profile data using public API
 * @param {string} username - GitHub username
 * @returns {Promise<object>} - GitHub profile and repository data
 */
export const fetchGitHubProfile = async (username) => {
  // Validate username format
  const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  if (!usernameRegex.test(username)) {
    throw new Error('Invalid GitHub username format');
  }

  try {
    // Fetch user profile
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    
    if (userResponse.status === 404) {
      throw new Error(`GitHub user '${username}' not found`);
    }
    
    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.statusText}`);
    }
    
    const userData = await userResponse.json();

    // Fetch user's repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    const reposData = reposResponse.ok ? await reposResponse.json() : [];

    // Calculate profile statistics
    const stats = calculateProfileStats(userData, reposData);

    return {
      username: userData.login,
      name: userData.name,
      bio: userData.bio,
      company: userData.company,
      location: userData.location,
      blog: userData.blog,
      public_repos: userData.public_repos,
      public_gists: userData.public_gists,
      followers: userData.followers,
      following: userData.following,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
      hireable: userData.hireable,
      avatar_url: userData.avatar_url,
      repos: reposData.map(repo => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated_at: repo.updated_at,
        has_readme: true // Assumption, would need separate API call to verify
      })),
      stats: stats
    };
  } catch (error) {
    if (error.message.includes('not found') || error.message.includes('Invalid')) {
      throw error;
    }
    throw new Error(`Failed to fetch GitHub profile: ${error.message}`);
  }
};

/**
 * Calculate profile statistics
 * @param {object} userData - User profile data
 * @param {Array} reposData - User repositories data
 * @returns {object} - Calculated statistics
 */
const calculateProfileStats = (userData, reposData) => {
  const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
  const languages = [...new Set(reposData.map(repo => repo.language).filter(Boolean))];
  
  // Calculate account age in years
  const createdDate = new Date(userData.created_at);
  const accountAge = Math.floor((Date.now() - createdDate) / (1000 * 60 * 60 * 24 * 365));
  
  // Calculate activity score (simplified)
  const lastUpdate = reposData.length > 0 ? new Date(reposData[0].updated_at) : null;
  const daysSinceLastActivity = lastUpdate 
    ? Math.floor((Date.now() - lastUpdate) / (1000 * 60 * 60 * 24))
    : 999;

  return {
    totalStars,
    totalForks,
    languages,
    accountAgeYears: accountAge,
    daysSinceLastActivity,
    reposWithDescription: reposData.filter(repo => repo.description).length,
    reposAnalyzed: reposData.length
  };
};
