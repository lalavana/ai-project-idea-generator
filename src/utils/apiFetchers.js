import axios from 'axios';

// Test function to fetch public APIs
export const fetchPublicAPIs = async () => {
  try {
    console.log('🔄 Fetching public APIs...');
    
    const response = await axios.get('https://api.publicapis.org/entries');
    const apis = response.data.entries;
    
    console.log('✅ Successfully fetched', apis.length, 'APIs');
    console.log('Sample data:', apis[0]);
    
    return apis;
    
  } catch (error) {
    console.error('❌ Error fetching APIs:', error.message);
    return [];
  }
};
export const fetchGitHubProjects = async () => {
  try {
    console.log('🔄 Fetching GitHub projects...');
    
    const token = process.env.REACT_APP_GITHUB_TOKEN;
    const headers = token ? { Authorization: `token ${token}` } : {};
    
    // Search for beginner-friendly projects
    const response = await axios.get(
      'https://api.github.com/search/repositories',
      {
        headers,
        params: {
          q: 'topic:beginner-project stars:>50',
          sort: 'stars',
          order: 'desc',
          per_page: 30
        }
      }
    );
    
    console.log('✅ Found', response.data.items.length, 'GitHub projects');
    
    return response.data.items;
    
  } catch (error) {
    console.error('❌ GitHub API error:', error.message);
    return [];
  }
};



export const fetchJobPostings = async () => {

try {
    console.log('🔄 Fetching Arbeit APIs...');
    
    const response = await axios.get('https://www.arbeitnow.com/api/job-board-api');
    const jobs = response.data.data;
    
    console.log('✅ Successfully fetched', jobs.length, 'APIs');
    console.log(' Sample data:', jobs[0]);
    
    return jobs;
    
  } catch (error) {
    console.error('Job API posting error:', error.message);
    return [];
  }
  };