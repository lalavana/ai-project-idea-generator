export const transformGitHubProject = (repo) => {
    let difficulty;
    if (repo.stargazers_count < 500) {
        difficulty = 'beginner';
    }
    else if (repo.stargazers_count >=500  && repo.stargazers_count < 5000) {
        difficulty = 'intermediate';
    } else {
        difficulty = 'advanced';
    }
  // TODO: Extract the language from repo.language
  // TODO: Determine difficulty based on repo.stargazers_count
  //       - <500 stars = beginner
  //       - 500-5000 stars = intermediate  
  //       - >5000 stars = advanced
  // TODO: Use repo.topics to determine tech stack

   // Extract tech stack from topics and language
  const techStack = [
    repo.language,
    ...repo.topics.filter(topic => 
      ['react', 'javascript', 'python', 'nodejs', 'css'].includes(topic)
    )
  ].filter(Boolean); // Remove null/undefined values
  
  
  return {
    
  id: "unique_id",
  title: "Project Name",
  description: "Description",
  difficulty: "beginner", // or "intermediate" or "advanced"
  techStack: techStack,
  category: 'GitHub Project',
  githubUrl: repo.html_url,
  stars: repo.stargazers_count,
  source: 'GitHub'
}
  };

  // data tranformer (turning messy API into clean and conssitent format)
export const transformPublicAPI = (api) => {
  // Determine difficulty based on authentication type
  let difficulty; // Declare without assigning yet
  
  if (api.Auth && api.Auth !== 'No') {
    // Check if it's OAuth (more complex)
    if (api.Auth.includes('OAuth')) {
      difficulty = 'advanced';
    } else {
      // Any other auth (API Key, etc.) is intermediate
      difficulty = 'intermediate';
    }
  } else {
    difficulty = 'beginner'; // No auth means beginner
  }
  
  return {
    // /\s+/g is a regex (pattern matcher)
// \s+ means "one or more spaces"
// g means "global" (replace ALL spaces, not just first)
    id: `api_${api.API.replace(/\s+/g, '_').toLowerCase()}`,
    title: `${api.API} Integration Project`,
    description: `Build a project using ${api.API}: ${api.Description}`,
    difficulty: difficulty,
    techStack: ['JavaScript', 'API Integration', api.Category],
    category: api.Category,
    githubUrl: api.Link,
    stars: 0,
    source: 'Public APIs'
  }; 
};


export const transformJobToProject = (job) => {
  // Extract skills from job description
  const skillKeywords = ['react', 'javascript', 'python', 'node', 'css', 'html', 'api'];
  const description = (job.description || '').toLowerCase();
  
  const foundSkills = skillKeywords.filter(skill => description.includes(skill));
  
  return {
    id: `job_${job.slug}`,
    title: `${job.title} Portfolio Project`,
    description: `Build a portfolio project demonstrating skills for: ${job.title}`,
    difficulty: foundSkills.length > 3 ? 'intermediate' : 'beginner',
    techStack: foundSkills.length > 0 ? foundSkills : ['JavaScript'],
    category: job.tags[0] || 'General',
    githubUrl: job.url,
    stars: 0,
    source: 'Job Market',
    location: job.location,
    company: job.company_name
  };
};