/**
 * Analyze a portfolio website
 * Note: This is a simplified implementation. For production,
 * consider using a headless browser for full JavaScript rendering.
 * @param {string} url - Portfolio website URL
 * @returns {Promise<object>} - Portfolio analysis data
 */
export const analyzePortfolio = async (url) => {
  // Validate URL format
  let validUrl;
  try {
    validUrl = new URL(url);
    if (!['http:', 'https:'].includes(validUrl.protocol)) {
      throw new Error('URL must use HTTP or HTTPS protocol');
    }
  } catch {
    throw new Error(`Invalid URL format: ${url}`);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(validUrl.href, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RoastMe/1.0; +https://github.com/AmitSharma404/roast-me)'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Website returned status ${response.status}`);
    }

    const html = await response.text();
    const analysis = analyzeHTML(html, validUrl.href);

    return {
      url: validUrl.href,
      accessible: true,
      ...analysis
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Website took too long to respond');
    }
    throw new Error(`Failed to analyze portfolio: ${error.message}`);
  }
};

/**
 * Analyze HTML content
 * @param {string} html - HTML content
 * @param {string} baseUrl - Base URL for reference
 * @returns {object} - Analysis results
 */
const analyzeHTML = (html, _baseUrl) => {
  const analysis = {
    hasTitle: /<title[^>]*>[^<]+<\/title>/i.test(html),
    hasMetaDescription: /<meta[^>]*name=["']description["'][^>]*>/i.test(html),
    hasViewport: /<meta[^>]*name=["']viewport["'][^>]*>/i.test(html),
    hasFavicon: /<link[^>]*rel=["']icon["'][^>]*>/i.test(html) || 
                /<link[^>]*rel=["']shortcut icon["'][^>]*>/i.test(html),
    hasOpenGraph: /<meta[^>]*property=["']og:/i.test(html),
    
    // Content analysis
    h1Count: (html.match(/<h1[^>]*>/gi) || []).length,
    imageCount: (html.match(/<img[^>]*>/gi) || []).length,
    linkCount: (html.match(/<a[^>]*>/gi) || []).length,
    scriptCount: (html.match(/<script[^>]*>/gi) || []).length,
    
    // Check for common portfolio elements
    hasContactForm: /<form[^>]*>/i.test(html) || 
                    /contact/i.test(html),
    hasProjects: /project/i.test(html) || /portfolio/i.test(html) || /work/i.test(html),
    hasAbout: /about/i.test(html),
    hasSocialLinks: /linkedin|twitter|github|instagram/i.test(html),
    
    // Performance hints
    hasExternalScripts: (html.match(/src=["']https?:\/\//gi) || []).length,
    estimatedSize: Math.round(html.length / 1024) // KB
  };

  // Calculate a basic score
  let score = 0;
  if (analysis.hasTitle) score += 10;
  if (analysis.hasMetaDescription) score += 10;
  if (analysis.hasViewport) score += 10;
  if (analysis.hasFavicon) score += 5;
  if (analysis.hasOpenGraph) score += 5;
  if (analysis.h1Count === 1) score += 10;
  if (analysis.hasContactForm) score += 10;
  if (analysis.hasProjects) score += 15;
  if (analysis.hasAbout) score += 10;
  if (analysis.hasSocialLinks) score += 15;

  analysis.technicalScore = score;

  // Extract title if present
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    analysis.title = titleMatch[1].trim();
  }

  return analysis;
};
