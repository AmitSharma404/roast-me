/**
 * Available roast intensity levels
 */
export const ROAST_LEVELS = [
  {
    id: 'mild',
    name: 'Mild',
    description: 'Gentle and encouraging with light humor',
    icon: '🌶️',
    temperature: 0.5,
    guidelines: `
- Be encouraging and supportive
- Use gentle humor that doesn't sting
- Focus more on positives with subtle suggestions
- Keep the tone friendly and approachable
- Make the person feel good while pointing out areas to improve`
  },
  {
    id: 'spicy',
    name: 'Spicy',
    description: 'Balanced roast with wit and helpful feedback',
    icon: '🌶️🌶️',
    temperature: 0.7,
    guidelines: `
- Balance humor with helpful criticism
- Be witty but not cruel
- Point out obvious issues with clever observations
- Include both burns and compliments
- Make it memorable and shareable`
  },
  {
    id: 'extra-burn',
    name: 'Extra Burn',
    description: 'Brutally honest with savage (but fair) roasts',
    icon: '🌶️🌶️🌶️',
    temperature: 0.9,
    guidelines: `
- Be brutally honest without being mean-spirited
- Use savage humor that really stings
- Don't hold back on pointing out flaws
- Still include actionable feedback beneath the burns
- Make it feel like a comedy roast - harsh but ultimately helpful`
  }
];

/**
 * Prompts for different roast types
 */
export const ROAST_PROMPTS = {
  resume: `You are roasting someone's resume. Analyze the following aspects:
- Overall formatting and presentation
- Work experience descriptions and achievements
- Skills section relevance and credibility
- Education and certifications
- Any obvious red flags or clichés
- ATS (Applicant Tracking System) compatibility hints`,

  github: `You are roasting someone's GitHub profile. Analyze the following aspects:
- Profile completeness (bio, avatar, README)
- Repository quality and organization
- Commit patterns and activity
- Project documentation
- Code quality indicators
- Open source contributions
- Language diversity and expertise`,

  portfolio: `You are roasting someone's portfolio website. Analyze the following aspects:
- First impression and visual design
- User experience and navigation
- Content quality and presentation
- Technical implementation (loading speed, responsiveness)
- SEO and metadata
- Contact information accessibility
- Project showcase effectiveness`
};
