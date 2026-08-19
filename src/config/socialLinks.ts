// Social Links Configuration - uses environment variables with sensible fallbacks
export const socialLinks = {
  // Main social profiles
  github: import.meta.env.VITE_GITHUB_URL || 'https://github.com/rotsen93',
  linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/nestor-julio-calderon-26672a1ab/',
  email: import.meta.env.VITE_EMAIL || 'rotse93@gmail.com',

  // GitHub repository URLs
  repositories: {
    nest: import.meta.env.VITE_GITHUB_NEST_URL || 'https://github.com/rotsen93/nestapp',
    nestLive: import.meta.env.VITE_NEST_LIVE_URL || 'https://nestapp-71b49.web.app/',
    fiaocontrol: import.meta.env.VITE_GITHUB_FIAOCONTROL_URL || 'https://github.com/rotsen93',
    musify: import.meta.env.VITE_GITHUB_MUSIFY_URL || 'https://github.com/rotsen93',
    projectFour: import.meta.env.VITE_GITHUB_PROJECT4_URL || 'https://github.com/rotsen93',
  },

  // Formatted display names (extracted from environment variables)
  display: {
    github: (import.meta.env.VITE_GITHUB_URL || 'https://github.com/rotsen93').replace('https://', ''),
    linkedin: (import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/nestor-julio-calderon-26672a1ab/').replace('https://', ''),
    email: import.meta.env.VITE_EMAIL || 'rotse93@gmail.com',
  }
};

export default socialLinks;
